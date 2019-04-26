import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'

import 'assets/js/remUnit.js'
import 'assets/less/index.less'

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
  // render: h => {
  //   return h(App)
  // }
}).$mount('#app')
