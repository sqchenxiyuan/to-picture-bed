const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        "app": "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/public/",
        filename: "[name].[chunkhash:6].[contenthash:6].js",
        chunkFilename: "[name].[chunkhash:6].[contenthash:6].chunk.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory=true",
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                loader: "babel-loader?cacheDirectory=true",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            name: "index",
            filename: "index.html",
            template: "./index.template.html",
            inject: true,
            title: "To Picture Bed"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[chunkhash:6].[contenthash:6].css",
            chunkFilename: "css/[id].[chunkhash:6].[contenthash:6].css"
        })
    ]
}