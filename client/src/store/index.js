import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/utils/error'
import loader from './modules/utils/loader'
import auth from './modules/auth/auth'
import productCategory from './modules/product/category'
import productSubCategory from './modules/product/subCategory'
import productOptionGroup from './modules/product/optionGroup'
import productOption from './modules/product/option'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    loader,
    auth,
    productCategory,
    productSubCategory,
    productOptionGroup,
    productOption
  }
})
