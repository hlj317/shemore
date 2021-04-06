const config = require("../../config/config");
const productionAsset = config.productionAsset;
const devStaticHost = config.devStaticHost;
const manifest = require("../../manifest.json");

let url = function (scope, option) {
	const publicAsset = manifest[option.params[0]];
	let path = null;
	if (productionAsset) {
		path = publicAsset;
	} else {
		path = `${devStaticHost}/${option.params[0]}`;
	}

	console.log(path);
	return path;
};

let libsPath = function (scope, option) {
	let path = option.params[0];
	return `/assets/libs/${path}`;
};

let urlMd5 = function (scope, option) {
	const filter = /-([\w]+)\.js/;
	let urlPath = url(scope, option);
	let hashAry = filter.exec(urlPath);
	let hash = hashAry[1];
	return hash;
};

let urlWithoutMd5 = function (scope, option) {
	const filter = /-([\w]+)\.js/;
	let urlPath = url(scope, option);
	urlPath = urlPath.replace(filter, ".js");
	return urlPath;
};

exports.url = url;

exports.urlMd5 = urlMd5;

exports.urlWithoutMd5 = urlWithoutMd5;

exports.libsPath = libsPath;
