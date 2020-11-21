const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('inline-chunk-html-plugin')
const StylelintWebpackPlugin = require('stylelint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const webpackConfig = {
  entry: {
    index: './src/app.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env'
                ]
              },
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          context: path.resolve(__dirname, '../src'),
          limit: 10000,
          name: '[path][name].[hash:20].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      minSize: 0,
      chunks: 'all',
      name: 'app'
    },

    runtimeChunk: {
      name: 'manifest'
    }
  },
  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/' // 注入 HTML 中的文件路径以此项配置开头
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../src/index.html'),
      chunks: ['manifest', 'app', 'index']
    }),
    new ESLintPlugin({
      fix: true
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css'
    }),
    new StylelintWebpackPlugin({
      context: 'src',
      configFile: path.resolve(__dirname,'../stylelint.config.js'),
      files: 'css/**/*.scss',
      failOnError: false,
      quiet: true,
      fix: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
}

let entries = []
glob.sync(path.resolve(__dirname, '../src/modules/**/*.js')).forEach(entry => {
  let dirname = path.dirname(entry)
  let exec = /.*modules(.*)/g.exec(dirname)
  dirname = exec ? exec[1] : ''

  let name = path.basename(entry, '.js')
  let key = dirname.substr(1) + '/' + name

  entries.push({
    dirname,
    entry,
    key,
    name
  })
})

entries.map(({ dirname, entry, key, name }) => {
  webpackConfig.entry[key] = path.resolve(__dirname, entry)
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, `../dist${dirname}/${name}.html`),
    inject: true,
    template: path.resolve(__dirname, `../src/modules${dirname}/${name}.html`),
    chunks: ['manifest', 'app', key]
  }))
})

webpackConfig.plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]))

module.exports = webpackConfig
