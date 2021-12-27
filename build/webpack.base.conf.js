/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const loaderUtils = require("loader-utils");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const StylelintWebpackPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

function getScssLoaders(isModule) {
  return [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: isModule && {
          // localIdentName: '[name]__[local]--[hash:base64:5]',
          // 模块样式名称格式化，参考自 Create React App
          getLocalIdent: (context, localIdentName, localName, options) => {
            const hash = loaderUtils.getHashDigest(
              context.resourcePath + "." + localName,
              "md5",
              "base64",
              5
            );
            return loaderUtils
              .interpolateName(
                context,
                "[name]__" + localName + "--" + hash,
                options
              )
              .replace(".module_", "_");
          },
        },
        sourceMap: isDev,
      },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
        sourceMap: isDev,
      },
    },
    {
      loader: "sass-loader",
      options: {
        implementation: require("sass"),
        sourceMap: isDev,
      },
    },
  ];
}

const config = {
  entry: {
    index: "./src/app.ts",
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: getScssLoaders(false),
      },
      {
        test: /\.module\.scss$/,
        use: getScssLoaders(true),
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024, // 100kb
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      chunks: "all",
      name: "app",
    },

    runtimeChunk: {
      name: "manifest",
    },
  },
  output: {
    filename: isDev ? "[name].js" : "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/", // 注入 HTML 中的文件路径以此项配置开头
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      chunks: ["manifest", "app", "index"],
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "css/[name].[contenthash].css",
    }),
    new StylelintWebpackPlugin({
      fix: true,
    }),
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
    new WebpackManifestPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
};

const entries = [];
glob
  .sync(path.resolve(__dirname, "../src/modules/**/*.ts"))
  .forEach((entry) => {
    let dirname = path.dirname(entry);
    const exec = /.*modules(.*)/g.exec(dirname);
    dirname = exec ? exec[1] : "";

    const name = path.basename(entry, ".ts");
    const key = dirname.substr(1) + "/" + name;

    entries.push({
      dirname,
      entry,
      key,
      name,
    });
  });

entries.map(({ dirname, entry, key, name }) => {
  config.entry[key] = path.resolve(__dirname, entry);
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `../dist${dirname}/${name}.html`),
      inject: true,
      template: path.resolve(
        __dirname,
        `../src/modules${dirname}/${name}.html`
      ),
      chunks: ["manifest", "app", key],
    })
  );
});

config.plugins.push(new WebpackManifestPlugin());

module.exports = config;
