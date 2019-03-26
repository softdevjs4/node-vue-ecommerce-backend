import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/error'
import loader from './modules/loader'
import auth from './modules/auth'
import user from './modules/user'
import productCategory from './modules/product/category'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    loader,
    auth,
    user,
    productCategory
  }
})
