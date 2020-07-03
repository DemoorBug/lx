const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  publicPath: './',
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      // .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('base', resolve('src/base'))
      .set('compoents', resolve('src/compoents'))
      .set('pages', resolve('src/pages'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  }
}
