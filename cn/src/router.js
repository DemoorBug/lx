import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/subpage/:id',
      name: 'subpage',
      component: () => import(/* webpackChunkName: "subpage" */ './views/subpage.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/touch',
      name: 'touch',
      component: () => import(/* webpackChunkName: "subpage" */ './views/touch.vue')
    }
  ]
})
