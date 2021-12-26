/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");

process.env.NODE_ENV = "development";

const config = require("./webpack.base.conf");

module.exports = merge(config, {
  devServer: {
    host: "0.0.0.0",
    hot: true,
    port: 8080,
  },
  devtool: "eval-source-map", // https://webpack.docschina.org/configuration/devtool/#devtool
});
