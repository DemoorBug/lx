import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import 'assets/js/remUnit.js'
import 'assets/less/index.less'
import 'swiper/dist/css/swiper.css'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  preLoad: 1, // 到哪里开始加载，1是完全显示？
  error: require('assets/img/loading.gif'),
  loading: require('assets/img/loading.gif'),
  attempt: 1 // 尝试加载几次
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  // render: h => {
  //   return h(App)
  // }
}).$mount('#app')
