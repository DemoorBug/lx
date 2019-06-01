import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    name: 'Login',
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ './views/login')
  },
  {
    name: 'home',
    path: '/',
    component: () => import(/* webpackChunkName: "home" */ './views/home/')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
