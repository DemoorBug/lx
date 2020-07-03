const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      // .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('base', resolve('src/base'))
      .set('components', resolve('src/components'))
      .set('pages', resolve('src/pages'))
      // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },
  devServer: {
    proxy: {
      '/ai': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/ai': '/'
        }
      }
    }
  }
}
