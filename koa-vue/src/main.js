import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import fastclick from 'fastclick'

import 'element-ui/lib/theme-chalk/index.css'
import 'assets/js/remUnit.js'
import 'assets/less/index.less'

fastclick.attach(document.body)
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
