const withCss = require('@zeit/next-css')

if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}
// const configs = {
//   //编译文件的输出目录
//   disDir: 'dest',
//   // 是否给每个路由生成Etag
//   // 一般部署的项目都会用nginx代理，nginx也有这个配置项，这里就可以关闭了
//   generateEtages: true,
//   // 页面内容缓存配置
//   // 用在开发时的，没有特别大的影响
//   onDemandEntries: {
//     // 内容在内存中缓存的时长(ms)
//     maxInactiveAge: 25 * 1000,
//     // 同时缓存多少个页面
//     pagesBufferLength: 2
//   },
//   // 在pages目录下那种后缀会被编译
//   pageExtensions: ['jsx', 'js'],
//   // 配置buildId
//   // 对一个项目同时进行多个节点的部署才会用到
//   generateBuildId: async () => {
//     if (process.env.YOUR_BUILD_ID) {
//       return process.env.YOUR_BUILD_ID
//     }
//
//     // 返回null使用默认的unique id
//     return null
//   },
//   // 手动修改webpack config
//   webpack(cofig, options) {
//     return config
//   }
//   // 修改webpackDevMiddleware配置
//   webpackDevMiddleware: config => {
//     return config
//   },
//   // 可以在页面上通过procsess.env.customKey获取value
//   env: {
//     customKey: 'value'
//   },
//   // 下面两个要通过 'next/config' 来读取
//   // 只有在服务端渲染才会读取的配置
//   serverRuntimeConfig: {
//     mySecret: 'secret',
//     secondSecret: process.env.SECOND_SECRET
//   },
//   // 在服务端渲染和客户端渲染都可获取的配置
//   publicRuntimeConfig: {
//     staticFolder: '/static'
//   }
// }

module.exports = withCss({})
