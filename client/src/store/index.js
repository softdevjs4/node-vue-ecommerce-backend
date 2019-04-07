import Vue from 'vue'
import Vuex from 'vuex'
import error from './modules/utils/error'
import loader from './modules/utils/loader'
import auth from './modules/auth/auth'
import productCategory from './modules/product/category'
import manufacturer from './modules/manufacturer/manufacturer'
import productSubCategory from './modules/product/subCategory'
import productOptionGroup from './modules/product/optionGroup'
import productOption from './modules/product/option'
import product from './modules/product/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    error,
    loader,
    auth,
    manufacturer,
    productCategory,
    productSubCategory,
    productOptionGroup,
    productOption,
    product
  }
})
