// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import jwtDecode from 'vue-jwt-decode'
import setAuthToken from './utils/setAuthToken'

Vue.use(require('vue-moment'))

Vue.config.productionTip = false

// Setup axios to be available globally through Vue
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Check for token
if (localStorage.getItem('jwt')) {
  // Getting token form local storage
  const bearerToken = localStorage.getItem('jwt')
  // Set auth token to header auth
  setAuthToken(bearerToken)
  const tokenArray = bearerToken.split(' ')
  const token = tokenArray[1]
  // Decoded token
  const decoded = jwtDecode.decode(token)
  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch('auth/logout')
    // Redirect to login
    router.push({name: 'loginUser'})
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
