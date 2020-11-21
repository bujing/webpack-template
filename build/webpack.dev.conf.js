process.env.NODE_ENV = 'development'

const { merge } = require('webpack-merge')
const path = require('path')
const config = require('./webpack.base.conf')

module.exports = merge(config, {
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    host: '0.0.0.0',
    hot: true,
    port: 2020
  },
  devtool: 'eval-source-map' // https://webpack.docschina.org/configuration/devtool/#devtool
})
