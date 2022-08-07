// eslint-disable-next-line no-undef
// const path = require("path");
// eslint-disable-next-line no-undef
module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
    },
    output: {
        filename: "[name].js",
        // eslint-disable-next-line no-undef
        path: path.resolve(__dirname, "dist"),
        clean: false,
    },
    optimization: {
        runtimeChunk: "single",
    },
};