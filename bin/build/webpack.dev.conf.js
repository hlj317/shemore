/* eslint-disable max-len */
let baseConfig = require("./webpack.base.conf");
let merge = require("webpack-merge");
let devStaticHost = require("../../config/config").devStaticHost;
let webpackDevConfig = require("../../common/webpack-config/webpack.dev.conf");

let devConfig = webpackDevConfig();

let config = merge(baseConfig, devConfig, {
	output: {
		publicPath: `${devStaticHost}/`,
	},
});

module.exports = config;
