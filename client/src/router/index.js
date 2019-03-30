import Vue from 'vue'
import Router from 'vue-router'
import LoginUser from '@/components/auth/LoginUser'
import UserDash from '@/components/dash/UserDash'
import ProductCategoryList from '@/components/product/section/ProductCategoryList'
import ProductSubCategoryList from '@/components/product/section/ProductSubCategoryList'
import ProductOptionGroup from '@/components/product/option/ProductOptionGroupList'
import ProductOption from '@/components/product/option/ProductOptionList'
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
    },
    {
      path: '/product/sub-categories',
      name: 'productSubCategoryList',
      component: ProductSubCategoryList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product/option-groups',
      name: 'productOptionGroupList',
      component: ProductOptionGroup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/product/options',
      name: 'productOptionList',
      component: ProductOption,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// check route meta
require('./metaCheck')(router)

export default router
