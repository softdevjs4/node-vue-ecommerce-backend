import router from '../../../router'
import store from '../../../store'
import Vue from 'vue'

// Initial state
const state = {
  products: [],
  attributes: [],
  images: []
}

// Getters
const getters = {
  getProducts (state) {
    return state.products
  },
  getAttributes (state) {
    return state.attributes
  },
  getImages (state) {
    return state.images
  }
}
// Actions
const actions = {
  getProducts ({commit}) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get('/admin/product/products')
      .then(res => {
        // Set product to state
        commit('setProducts', res.data.products)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  getAttributes ({commit}, productId) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get(`/admin/product/products/${productId}/attributes`)
      .then(res => {
        // Set attribute to state
        commit('setAttributes', res.data.attributes)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  getImages ({commit}, productId) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get(`/admin/product/products/${productId}/images`)
      .then(res => {
        // Set images to state
        commit('setImages', res.data.images)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  createProduct ({commit}, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Generate form data
    const fd = new FormData()
    fd.append('sku', payload.sku)
    fd.append('category', payload.category)
    fd.append('subCategory', payload.subCategory)
    fd.append('model', payload.model)
    fd.append('name', payload.name)
    fd.append('sortDesc', payload.sortDesc)
    fd.append('longDesc', payload.longDesc)
    fd.append('weight', payload.weight)
    fd.append('price', payload.price)
    fd.append('stock', payload.stock)
    fd.append('inStock', payload.inStock)
    fd.append('isFeature', payload.isFeature)
    fd.append('status', payload.status)
    fd.append('thumb', payload.thumb)

    // Manufacturer
    if (payload.hasManufacturer) {
      fd.append('hasManufacturer', payload.hasManufacturer)
      fd.append('manufacturerId', payload.manufacturer._id)
      fd.append('manufacturerName', payload.manufacturer.name)
      fd.append('manufacturerImage', payload.manufacturer.image ? payload.manufacturer.image.url : '')
    }
    // Flash sale
    if (payload.isFlashSale) {
      fd.append('isFlashSale', payload.isFlashSale)
      fd.append('flashPrice', payload.flashPrice)
      fd.append('flashStart', payload.flashStartDate)
      fd.append('flashEnd', payload.flashEndDate)
      fd.append('flashStatus', payload.flashStatus)
    }

    // Special sale
    if (payload.isFlashSale) {
      fd.append('isSpecialSale', payload.isSpecialSale)
      fd.append('specialPrice', payload.specialPrice)
      fd.append('specialExpire', payload.specialExpireDate)
      fd.append('specialStatus', payload.specialStatus)
    }
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
        router.push({name: 'productList'})
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  addProductAttribute ({commit}, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    Vue.axios.post(`/admin/product/products/${payload.productId}/attributes`, payload)
      .then(res => {
        // Set attributes to state
        commit('setAttributes', res.data.attributes)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  deleteAttribute ({commit}, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    Vue.axios.delete(`/admin/product/products/${payload.productId}/attributes/${payload.attId}`)
      .then(res => {
        // Delete attributes from state
        commit('deleteAttributes', res.data.attributes)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  addProductImage ({commit}, payload) {
    // Make form data
    const fd = new FormData()
    fd.append('image', payload.image)
    // Active preloader
    store.dispatch('loader/activeLoader')
    Vue.axios.post(`/admin/product/products/${payload.productId}/images`, fd)
      .then(res => {
        // Set attributes to state
        commit('setImages', res.data.images)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
      })
      .catch(err => {
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Handle all errors by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  deleteImage ({commit}, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    Vue.axios.delete(`/admin/product/products/${payload.productId}/images`)
      .then(res => {
        // Delete images from state
        commit('deleteImages', res.data.images)
        // Deactive preloader
        store.dispatch('loader/deactiveLoader')
        // Clear all error data
        store.dispatch('error/clearErrors')
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
  setProducts (state, products) {
    // set all received product to state
    state.products = products
  },
  setAttributes (state, attributes) {
    // set all received product attributes to state
    state.attributes = attributes
  },
  setImages (state, images) {
    // set all received product images to state
    state.images = images
  },
  createProduct (state, product) {
    // Push new product to product state
    state.products.push(product)
  },
  addProductAttribute (state, attributes) {
    state.attributes = attributes
  },
  deleteAttributes (state, attributes) {
    state.attributes = attributes
  },
  deleteImages (state, images) {
    state.images = images
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
