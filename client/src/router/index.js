import Vue from 'vue'
import Router from 'vue-router'
import LoginUser from '@/components/auth/LoginUser'
import UserDash from '@/components/dash/UserDash'
import ProductCategoryList from '@/components/product/category/ProductCategoryList'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'loginUser',
      component: LoginUser,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'userDashboard',
      component: UserDash,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product/categories',
      name: 'productCategoryList',
      component: ProductCategoryList,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// check route meta
require('./metaCheck')(router)

export default router
