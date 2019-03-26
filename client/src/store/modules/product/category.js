import store from '../../../store'
import Vue from 'vue'
// Initial state
const state = {
  categories: []
}

// Getters
const getters = {
  getCategories (state) {
    return state.categories
  }
}

// Actions
const actions = {
  getCategories ({ commit }) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get('/admin/product/categories')
      .then(response => {
        if (response.data.success) {
          // Store to state
          commit('setCategories', response.data.categories)
          // Deactive loader
          store.dispatch('loader/deactiveLoader')
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
        // Deactive loader
        store.dispatch('loader/deactiveLoader')
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  createCategory ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.post('/admin/product/categories', payload)
      .then(response => {
        if (response.data.success) {
          commit('createCategory', response.data.category)
          // Deactive loader
          store.dispatch('loader/deactiveLoader')
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
        // Deactive loader
        store.dispatch('loader/deactiveLoader')
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  updateCategory ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    store.dispatch('loader/activeLoader')
    Vue.axios.put('/admin/product/categories/' + payload._id, payload.data)
      .then(response => {
        if (response.data.success) {
          commit('updateCategory', response.data.category)
          // Deactive loader
          store.dispatch('loader/deactiveLoader')
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
        // Deactive loader
        store.dispatch('loader/deactiveLoader')
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  deleteCategory ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.delete('/admin/product/categories/' + payload._id)
      .then(response => {
        if (response.data.success) {
          commit('deleteCategory', response.data.category)
          // Deactive loader
          store.dispatch('loader/deactiveLoader')
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
        // Deactive loader
        store.dispatch('loader/deactiveLoader')
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  }
}

// Mutations
const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
  createCategory (state, category) {
    // Push new data to state
    state.categories.push(category)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  updateCategory (state, category) {
    state.categories = state.categories.map(cat => cat._id === category._id ? (cat = category) : cat)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  deleteCategory (state, category) {
    state.categories = state.categories.filter(cat => cat._id !== category._id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
