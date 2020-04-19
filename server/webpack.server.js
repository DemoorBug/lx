const path = require('path')
const nodeExternals = require('webpack-node-externals') //没有引入之前1MB，引入是4.4kb
const moduleConfig = require('./webpack.base.js')
module.exports = {
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],
  entry: './src/server/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  ...moduleConfig
}
