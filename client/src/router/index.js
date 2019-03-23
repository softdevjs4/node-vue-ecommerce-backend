import Vue from 'vue'
import Router from 'vue-router'
import LoginUser from '@/components/auth/LoginUser'
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
      name: 'LoginUser',
      component: LoginUser,
      meta: {
        guest: true
      }
    }
  ]
})

// check route meta
require('./metaCheck')(router)

export default router
