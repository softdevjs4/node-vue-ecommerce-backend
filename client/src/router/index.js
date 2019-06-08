import Vue from 'vue'
import Router from 'vue-router'
import LoginUser from '@/components/auth/LoginUser'
import UserDash from '@/components/dash/UserDash'
import ProductCategoryList from '@/components/product/section/ProductCategoryList'
import ManufacturerList from '@/components/product/manufacturer/ManufacturerList'
import ProductSubCategoryList from '@/components/product/section/ProductSubCategoryList'
import ProductOptionGroup from '@/components/product/option/ProductOptionGroupList'
import ProductOption from '@/components/product/option/ProductOptionList'
import ProductCreate from '@/components/product/product/ProductCreate'
import ProductList from '@/components/product/product/ProductList'
import ProductAttribute from '@/components/product/product/ProductAttribute'
import ProductImage from '@/components/product/product/ProductImage'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LoginUser',
      component: LoginUser,
      meta: {
        guest: true
      }
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
    },
    {
      path: '/product/manufacturers',
      name: 'manufacturerList',
      component: ManufacturerList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products/create',
      name: 'productCreate',
      component: ProductCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'productList',
      component: ProductList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products/attributes/:productId',
      name: 'productAttribute',
      component: ProductAttribute,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products/images/:productId',
      name: 'productImage',
      component: ProductImage,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// check route meta
require('./metaCheck')(router)

export default router
