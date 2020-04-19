import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/home'
// import Category from './views/category'
// import Cart from './views/cart'
// import Personal from './views/personal'
// import Product from './views/product'
// import Search from './views/search'

Vue.use(Router)

const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import(/* webpackChunkName: "home" */ './views/home'),
    children: [
      {
        name: 'home-product',
        path: 'product/:id',
        component: () => import(/* webpackChunkName: "home-product" */ './views/product')
      }
    ]
  },
  {
    name: 'category',
    path: '/category',
    component: () => import(/* webpackChunkName: "category" */ './views/category')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import(/* webpackChunkName: "cart" */ './views/cart')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import(/* webpackChunkName: "personal" */ './views/personal')
  },
  // {
  //   name: 'Product',
  //   path: '/Product',
  //   component: () => import(/* webpackChunkName: "Product" */ './views/Product')
  // },
  {
    name: 'search',
    path: '/search',
    component: () => import(/* webpackChunkName: "search" */ './views/search')
  },
  {
    path: '*',
    redirect: '/home'
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
