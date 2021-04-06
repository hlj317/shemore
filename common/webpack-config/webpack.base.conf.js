let webpack = require("webpack");
let path = require("path");
let LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
let getEntry = require("./get-entry");
// let autoprefixer = require('autoprefixer');
let Analytics = require("./analytics-dependency.js");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length,
});

let baseConfigFunc = (entryPrefix, blackListAry) => {
    let publicPath = "/";
    let entries = getEntry(entryPrefix);
    // 过滤service
    let argv;
    let filter;
    try {
        argv = JSON.parse(process.env.npm_config_argv).original;
        argv.forEach((item, index) => {
            console.log(index);
            if (item.indexOf("--") === 0) {
                filter = item.replace("--", "");
            }
        });
    } catch (ex) {
        argv = process.argv;
    }

    if (filter) {
        let regStr = toString.call(filter) === "[object Array]" ? filter.join("|") : filter;
        let regExp = new RegExp(regStr);
        for (let item in entries) {
            if (entries.hasOwnProperty(item) && !regExp.test(item)) {
                delete entries[item];
            }
        }
    }

    if (process.env.NODE_ENV === "production") {
        let blackList = [
            "^manifest.json$",
            "^package.json$",
            "^bin",
        ];
        if (blackListAry && blackListAry.length) {
            blackList = blackList.concat(blackListAry);
        }
        const options = {
            alias: {
                src: "src",
            },
            suffixs: ["js", "less", "vue", "css"],
            blackList,
            makeStandardEnteies (sEntries) {
                let formatEntries = {};
                for (let i = sEntries.length; i--;) {
                    formatEntries[sEntries[i].replace(/^src\/biz\/|\/index\.js$/g, "")] = `./${sEntries[i]}`;
                }
                return formatEntries;
            },
            afterGetRelyHook (allEntriesPath, relyTree) {
                for (let i in allEntriesPath) {
                    relyTree[
                        allEntriesPath[i]
                            .replace(/^src\/biz/, "app/views")
                            .replace(/\/index.js$/, ".html")] = {
                        arents: [allEntriesPath[i]],
                        children: []
                    };
                }
                return relyTree;
            },
        };
        let icremEntries = new Analytics(entries, options).entries;
        // 如果没有任何文件需要打包，默认全量打包
        if (Object.keys(icremEntries).length > 0) {
            entries = icremEntries;
        }
        console.log("The etries are:\n", entries);
    }

    console.log(`监听的页面(监听的页面越少,性能越好)有:\n${Object.keys(entries).join("\n")}`);

    return {
        entry: entries,
        output: {
            path: `${__dirname}/../../`, // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
            publicPath, // 模板、样式、脚本、图片等资源对应的server上的路径
        },
        externals: {
            // require("vue") is external and available
            vue: "Vue",
        },
        resolve: {
            modules: [
                path.resolve("./"),
                "node_modules",
            ],
            // 支持ES2015 import
            mainFields: ["jsnext:main", "main"],
            extensions: [".js", ".vue"],
        },
        module: {
            rules: [ // 加载器，关于各个加载器的参数配置，可自行搜索之。
                // {
                //     test: /\.html$/,
                //     loader: "html-loader",
                // },
                {
                    test: /\.js$/,
                    loader: "happypack/loader?id=babel",
                },
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                    use: [{
                        loader: "url-loader?limit=8192&name=assets/static/[hash:8].[name].[ext]"
                    }]
                }
            ],
        },
        plugins: [
            // new webpack.LoaderOptionsPlugin({
            //     options: {
            //         postcss: [
            //             autoprefixer({
            //                 browsers: ['android >= 4.0', 'ios_saf >= 7.0'],
            //                 remove: false,
            //             }),
            //         ],
            //     },
            // }),
            new LodashModuleReplacementPlugin({
                collections: true,
            }),
            new HappyPack({
                id: "babel",
                loaders: [
                    {
                        loader: "babel-loader",
                        threadPool: happyThreadPool,
                        query: {
                            babelrc: false,
                            presets: [
                                [
                                    "env",
                                    {
                                        modules: false,
                                    },
                                ],
                                "stage-3",
                            ],
                            plugins: [
                                "lodash",
                                [
                                    "transform-runtime", {
                                        helpers: false,
                                        polyfill: false,
                                        regenerator: true,
                                        moduleName: "babel-runtime",
                                    },
                                ],
                                "transform-object-assign",
                            ],
                        },
                    },
                ],
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
        ],
    };
};

module.exports = baseConfigFunc;
