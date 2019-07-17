const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/',
        watchContentBase: true,
        hot: true,
        host: '0.0.0.0',
        disableHostCheck: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ] 
})
