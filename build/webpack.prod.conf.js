const baseConf = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge')

const path = require('path')
const resolve = p => path.resolve(__dirname, p)

module.exports = merge(baseConf, {
  entry: './src/index.tsx',
  output: {
    filename: "[name].[contenthash].js",
    path: resolve('../dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new copyWebpackPlugin({
      patterns:
        [{
          from: resolve('../public'),//打包的静态资源目录地址
          to: resolve('../dist') //打包到dist下面的public
        }]
    }),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html')
    })
  ]
})

