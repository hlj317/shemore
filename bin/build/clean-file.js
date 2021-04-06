let rd = require("rd");
let fs = require("fs");

let staticPath = __dirname + "/../../assets/static";
let webpackAssets = require("../../assets/webpack-assets.json");

let cleanFile = (staticPath, webpackAssets) => {
	let filenames = [];

	// 获取线上正在使用的文件
	for (let key in webpackAssets) {
		webpackAssets[key].js && filenames.push(webpackAssets[key].js);
		webpackAssets[key].css && filenames.push(webpackAssets[key].css);
	}

	// 同步遍历目录下的所有文件，然后删除废弃文件
	rd.eachFileFilterSync(staticPath, /(\.js)|(\.css)$/, (filename, stat) => {
		console.log(stat);
		let startIndex = filename.indexOf("/assets/static");
		let clipFilename = filename.slice(startIndex);

		if (filenames.indexOf(clipFilename) < 0) {
			fs.unlinkSync(filename);
		}
	});
};

cleanFile(staticPath, webpackAssets);
