let glob = require("glob");
let path = require("path");
let argv = require("minimist")(process.argv.slice(2));
let prefix = "./src/biz/";

/**
 * 解析 entry 路径
 * */
let getEntry = (globPath, pathDir) => {
	let files = glob.sync(globPath);
	let entries = {};
	let entry;
	let dirname;
	let pathname;
	for (let i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		pathname = dirname.replace(new RegExp(`^${pathDir}`), "");
		entries[pathname] = `./${entry}`;
	}
	return entries;
};

let filter = argv.f;

module.exports = (dirPrefix = prefix) => {
	let entries = getEntry(`${dirPrefix}**/index.js`, dirPrefix);
	if (filter) {
		for (let item in entries) {
			if (entries.hasOwnProperty(item) && item.indexOf(filter) === -1) {
				delete entries[item];
			}
		}
	}
	return entries;
};
