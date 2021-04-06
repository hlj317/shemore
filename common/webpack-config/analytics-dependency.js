let fs = require("fs");
let path = require("path").posix; // 强制使用POSIX文件路径格式
let { execSync } = require("child_process");
// 过滤类的默认配置，不同平台路径分段分配符不同
let defaultOptions = {
    impReg: /import\s.*?['|"](.*?)['|"]|require\(['|"](.*?)['|"]\)/g, // 匹配引入文件的正则表达式
    blackList: [], // 黑名单，在黑名单内的文件会全量打包
    suffixs: ["js", "less"],
    alias: {},
    makeStandardEnteies (entries) {
        return entries;
    },
    afterGetRelyHook (allEntriesPath, relyTree) {
        return relyTree;
    },
};
let hadCycle = [];

/**
 * 判断依赖类别，node_moudles依赖返回0， 绝对路径返回2， 相对路径返回1
 * @method isLegal
 * @param  {[String]}  relyPath [需要分析的依赖文件的路径]
 * @param  {[Object]}  aliasRegExp [文件路径的别称的正则]
 * @param  {[Object]}  alias [文件路径的别称，请和webpack配置的相同，不然会打包出错]
 * @return {Number}      [文件的类别]
 */
let getRelyType = (relyPath, aliasRegExp = false, alias = {}) => {
    if (aliasRegExp) {
        relyPath = relyPath.replace(aliasRegExp, (e) => alias[e]);
    }
    let regResult = 0;
    if (relyPath.match(/^\.+/)) {
        regResult = 1;
    } else if (aliasRegExp && relyPath.match(aliasRegExp)) {
        regResult = 2;
    }
    return regResult;
};

/**
* [打包入口过滤类构造函数]
* @method analytics
* @param  {[Object]}  options [description]
* @return {[Class]}          [description]
*/
class Analytics {
    constructor(allEntries, options = {}) {
        if (!allEntries) {
            throw new Error("Entries is necessary! Please provide a entries when new Class!");
        }
        this.options = Object.assign(defaultOptions, options);
        this.allEntries = allEntries; // 所有的入口文件对象
        this.allEntriesPaths = undefined; // 入口文件对象的value: 文件路径
        this.relyTree = undefined; // 默认undefined来判断有没有构造过依赖树
        this.diffFile = undefined;
        this.entries = allEntries;
        this.alias = this.options.alias;
        this.aliasRegExp = Object.keys(this.alias).length ? new RegExp(`^${Object.keys(this.alias).join("|^")}`) : false;
        this.suffixs = this.options.suffixs;
        this.init();
    }

    // 避免不带后缀或者package.json方式引入的文件无法识别, 可识别的后缀为js,less
    completingPath (filePath, defaultSuffix = false) {
        let suffixs = this.suffixs.filter((item) => !defaultSuffix || defaultSuffix !== item);

        if (filePath.match(/\..*$/) && fs.existsSync(filePath)) {
            return filePath;
        }

        if (defaultSuffix && fs.existsSync(`${filePath}.${defaultSuffix}`)) {
            return `${filePath}.${defaultSuffix}`;
        }
        for (let i = 0; i < suffixs.length; i++) {
            if (fs.existsSync(`${filePath}.${suffixs[i]}`)) {
                return `${filePath}.${suffixs[i]}`;
            }
        }
        if (fs.existsSync(`${filePath}/package.json`)) {
            let data = fs.readFileSync(`${filePath}/package.json`, {
                encoding: "utf8",
            });
            if (data && fs.existsSync(`${filePath}/${JSON.parse(data).main}`)) {
                return path.normalize(`${filePath}/${JSON.parse(data).main}`);
            }
            return path.normalize(`${filePath}/index.js`);
        }
        return path.normalize(`${filePath}/index.js`);
    }

    // 获取所有需要分析的入口文件的路径
    getAllEntries (allEntries = {}) {
        let allEntriesPaths = [];
        for (let key in allEntries) {
            allEntriesPaths.push(path.normalize(allEntries[key]));
        }
        this.allEntriesPaths = allEntriesPaths;
        return this;
    }

    // 分析单个文件
    analyticsSingleFile (filePath, parentPath = false) {
        let relyTree = this.relyTree;
        let impReg = this.options.impReg;
        // 防止反复分析某个依赖
        if (relyTree[filePath]) {
            if (relyTree[filePath].parents) {
                parentPath && relyTree[filePath].parents.push(parentPath);
            } else {
                relyTree[filePath].parents = [parentPath];
            }
            return undefined;
        }
        // 构建一个节点
        relyTree[filePath] = {
            parents: parentPath ? [parentPath] : false,
            children: [],
        };
        // 分析文件
        // console.log(filePath, parentPath);
        let data = fs.readFileSync(filePath, {
            encoding: "utf8",
        });
        // 删除注释，防止引用的文件在注释内
        data = data.replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, "");
        let suffix = filePath.replace(/.+\./, ""); // 获取该文件后缀
        let results = null;
        while ((results = impReg.exec(data)) !== null) {
            // 防止less文件用~方式引入
            let relyPath = results.slice(1).find((item) => item)
                .replace(/^~/, "");
            // 处理路径
            let relyType = getRelyType(relyPath, this.aliasRegExp, this.alias);
            if (relyType) {
                // 格式化路径，补充后缀，默认使用父文件的后缀
                let childPath = this.completingPath(path.normalize(relyType === 2 ? relyPath : path.join(filePath, `../${relyPath}`)), suffix);
                relyTree[filePath].children.push(childPath);
            }
        }
        relyTree[filePath].children.forEach((childPath) => this.analyticsSingleFile(childPath, filePath));
        return relyTree;
    }

    // 生成依赖树
    getRelyTree () {
        this.allEntriesPaths || this.getAllEntries(this.allEntries);
        this.relyTree = {};
        this.allEntriesPaths.forEach((filePath) => {
            this.analyticsSingleFile(filePath);
        });
        this.options.afterGetRelyHook && this.options.afterGetRelyHook(this.allEntriesPaths, this.relyTree);
        return this;
    }

    // 获取修改过的文件的路径
    getDiffFile () {
        if (fs.existsSync(".git")) {
            this.diffFile = execSync("git add -N . && git diff origin/main --name-only", {
                encoding: "utf8",
            }).split("\n")
                .filter((item) => item)
                .map((filePath) => path.normalize(filePath));
            return this;
        }
        let printFunc = "if($3){print $3}else{print $2}";
        this.diffFile = execSync(`svn st -u -r HEAD | awk \'{${printFunc}}\'`, { // eslint-disable-line
            encoding: "utf8",
        }).split("\n")
            .filter((item) => item && item !== "revision:")
            .map((filePath) => path.normalize(filePath.replace(/\r/g, "")));
        return this;
    }

    // 向上遍历父节点获取对应的index.js
    findParents (parents = []) {
        let topParnetsCache = []; // 没有父节点的文件缓存
        for (let i = parents.length; i--;) {
            let childPath = parents[i] ? path.normalize(parents[i]) : false; // 当前分析的文件
            if (childPath && hadCycle.indexOf(childPath) < 0 && this.relyTree[childPath]) {
                hadCycle.push(childPath);
                // 防止false并排除不在依赖树的文件，如：打包后的静态页面
                let localParents = this.relyTree[childPath].parents;
                if (localParents) {
                    Array.prototype.push.apply(topParnetsCache, this.findParents(localParents));
                } else {
                    topParnetsCache.push(childPath);
                }
            }
        }
        return topParnetsCache;
    }

    makeEntries (standard = true) {
        this.diffFile || this.getDiffFile();
        let blackList = this.options.blackList.length ? new RegExp(this.options.blackList.join("|")) : "//";
        for (let i in this.diffFile) {
            if (this.diffFile[i].match(blackList)) {
                return this;
            }
        }
        this.relyTree || this.getRelyTree();
        let entries = this.findParents(this.diffFile);
        hadCycle = [];
        this.entries = standard ? this.options.makeStandardEnteies(entries) : entries;
        return this;
    }

    init () {
        this.getAllEntries(this.allEntries)
            .getRelyTree()
            .getDiffFile()
            .makeEntries();
        console.log('Your diff files are: \n', this.diffFile); // eslint-disable-line
    }
}

module.exports = Analytics;
