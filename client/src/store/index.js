import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/error'
import auth from './modules/auth'
import user from './modules/user'
import productCategory from './modules/product/category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    auth,
    user,
    productCategory
  }
})
