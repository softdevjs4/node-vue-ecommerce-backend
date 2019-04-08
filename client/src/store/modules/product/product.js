import router from '../../../router'
import store from '../../../store'
import Vue from 'vue'

// Initial state
const state = {
  products: []
}

// Getters
const getters = {
  getProducts (state) {
    return state.products
  }
}
// Actions
const actions = {
  createProduct ({commit}, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Generate form data
    const fd = new FormData()
    fd.append('sku', payload.sku)
    fd.append('category', payload.category)
    fd.append('subCategory', payload.subCategory)
    fd.append('manufacturer', payload.manufacturer)
    fd.append('model', payload.model)
    fd.append('name', payload.name)
    fd.append('sortDesc', payload.sortDesc)
    fd.append('longDesc', payload.longDesc)
    fd.append('flashSale', payload.flashSale)
    fd.append('specialSale', payload.specialSale)
    fd.append('weight', payload.weight)
    fd.append('price', payload.price)
    fd.append('stock', payload.stock)
    fd.append('inStock', payload.inStock)
    fd.append('isFeature', payload.isFeature)
    fd.append('status', payload.status)
    fd.append('thumb', payload.thumb)

    // Make server request
    Vue.axios.post('/admin/product/products', fd)
      .then(res => {
        // Set new created product to state
        commit('createProduct', res.data.product)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
        // Redirect to dashboard
        router.push({name: 'userDashboard'})
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  }
}
// Mutations
const mutations = {
  createProduct (state, product) {
    // Push new product to product state
    state.products.push(product)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
