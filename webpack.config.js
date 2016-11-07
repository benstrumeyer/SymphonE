const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");

var paths = {};

paths.client = path.resolve("./src/client/");
paths.scripts = path.join(paths.client, "scripts");
paths.styles = path.join(paths.client, "styles");

paths.output = path.join(__dirname, "./build/client/");

var entries = {
    vendor: path.join(paths.scripts, "Vendor.ts"),
    angular: glob.sync(path.join(paths.scripts, "angular/**/*.ts")),
    styles: path.join(paths.styles, "main.scss")
};

module.exports = {
    context: __dirname,
    entry: entries,
    output: {
        path: paths.output,
        library: "[name]",
        filename: "js/[name]-bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["ts-loader"]
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader", "import-glob-loader"]
            },
            {
                test: /\.(html)$/,
                loaders: ["html-loader"]
            },
            {
                test: /\.json$/,
                loaders: ["json-loader"]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)/,
                loader: "file-loader?name=fonts/[name].[ext]"
            }
        ]
    },
    ts: {
        configFilePath: paths.client + "/tsconfig.json"
    },
    resolve: {
        extensions: ["", ".js", ".ts"]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        
        new CopyPlugin([
            {from: paths.client + "/index.html"}
        ])
    ]
};