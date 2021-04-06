let webpackBaseConfig = require("../../common/webpack-config/webpack.base.conf");
let merge = require("webpack-merge");
// 传入入口文件夹路径。默认是 ./src/biz/
let baseConfig = webpackBaseConfig("./src/biz/");
let publicPath = "/";
let config = merge(baseConfig, {
    output: {
        path: `${__dirname}/../../`, // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath, // 模板、样式、脚本、图片等资源对应的server上的路径
    },
});

module.exports = config;
