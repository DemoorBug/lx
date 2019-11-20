const moduleConfig = require('./webpack.base.js')
// const merge = require('webpack-merge')
const path = require('path')

const config = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  ...moduleConfig
}
module.exports = config
