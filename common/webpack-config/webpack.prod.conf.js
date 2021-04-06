let webpack = require("webpack");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let AssetsPlugin = require("assets-webpack-plugin");
let OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
// whether to generate source map for production files.
// disabling this can speed up the build.
const PERCENTAGE = 100;
let prodConfig = (webpackAssetsPath) => {
    let config = {
        mode: "production",
        devtool: false,
        bail: true,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            "css-loader",
                            "postcss-loader"
                        ],
                    }),
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            "css-loader",
                            "postcss-loader",
                            "less-loader"
                        ],
                    }),
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        loaders: {
                            css: ExtractTextPlugin.extract({
                                use: [
                                    "css-loader",
                                    "postcss-loader",
                                ],
                            }),
                            less: ExtractTextPlugin.extract({
                                use: [
                                    "css-loader",
                                    "postcss-loader",
                                    "less-loader",
                                ],
                            }),
                        },
                    },
                },
            ],
        },
        plugins: [
            // http://vuejs.github.io/vue-loader/workflow/production.html
            new webpack.HashedModuleIdsPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: "\"production\"",
                },
            }),
            new webpack.ProgressPlugin(((percentage, msg) => {
                let _perInt = parseInt(percentage * PERCENTAGE);
                if (_perInt % 10 === 0) {
                    console.log(`当前进度: ${parseInt(percentage * PERCENTAGE)}%`, msg);
                }
            })),
            new AssetsPlugin({
                path: webpackAssetsPath,
                prettyPrint: true,
                update: true,
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: {
                    safe: true,
                },
            }),
        ],
    };
    return config;
};

module.exports = prodConfig;
