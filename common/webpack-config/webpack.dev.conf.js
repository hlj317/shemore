let webpack = require("webpack");
let VConsolePlugin = require("vconsole-webpack-plugin");
const PORT = 8001;
let devConfig = () => {
    let config = {
        // eval-source-map is faster for development
        mode: "development",
        devtool: "#inline-source-map",
        output: {
            filename: "[name].js",
            chunkFilename: "[id].js",
        },
        module: {
            rules: [
                {
                    test: /\.css/,
                    use: [
                        "vue-style-loader",
                        "css-loader",
                        {
                            loader: "postcss-loader",
                        }, {
                            loader: "px2rem-loader"
                        }
                    ],
                },
                {
                    test: /\.less$/, // style-loader 在sourceMap的情况下处理字体路径有问题,所以用vue-style来代替
                    use: [
                        "vue-style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            },
                        }, {
                            loader: "postcss-loader",
                        }, {
                            loader: "less-loader",
                            options: {
                                sourceMap: true,
                            },
                        }
                    ],
                },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        postcss: [
                            require("autoprefixer")({
                                browsers: ["android >= 4.0", "ios_saf >= 7.0"],
                                remove: false,
                            }),
                        ],
                    },
                },
            ],
        },
        plugins: [
            // http://vuejs.github.io/vue-loader/workflow/production.html
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: "\"development\"",
                },
            }),
            new VConsolePlugin({
                enable: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        ],
        devServer: {
            contentBase: "./", // 相对于publicPath
            host: "0.0.0.0",
            port: PORT,
            inline: true,
            hot: true,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            disableHostCheck: true,
        },
    };

    return config;
};

module.exports = devConfig;
