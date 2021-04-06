/* eslint-disable no-console,max-len */
let webpackProdConfig = require("../../common/webpack-config/webpack.prod.conf");
let baseConfig = require("./webpack.base.conf");
let merge = require("webpack-merge");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let projectConfig = require("../../config/config");
let ManifestPlugin = require("webpack-manifest-plugin");
const manifest = require("../../manifest.json");
// whether to generate source map for production files.
// disabling this can speed up the build.
let hashLen = 8;
let prodConfig = webpackProdConfig(`${__dirname}/../../assets`); // 入参为 webapck-assets.json 文件的存放路径

let config = merge(baseConfig, prodConfig, {
    output: {
        filename: `${projectConfig.assetsPrefix}/static/[name]-[chunkhash:${hashLen}].js`,
        chunkFilename: `${projectConfig.assetsPrefix}/static/[id]-[chunkhash:${hashLen}].js`,
    },
    plugins: [
        new ExtractTextPlugin({
            filename: `${projectConfig.assetsPrefix}/static/[name]-[hash:${hashLen}].css`,
            allChunks: true,
        }),
        new ManifestPlugin({
            fileName: "manifest.json",
            seed: manifest,
            publicPath: "/",
        }),
    ],

});

module.exports = config;
