import store from '../../../store'
import Vue from 'vue'
// Initial state
const state = {
  subCategories: []
}

// Getters
const getters = {
  getSubCategories (state) {
    return state.subCategories
  }
}

// Actions
const actions = {
  getSubCategories ({ commit }) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get('/admin/product/sub-categories')
      .then(response => {
        if (response.data.success) {
          // Store to state
          commit('setSubCategories', response.data.subCategories)
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
  createSubCategory ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.post('/admin/product/sub-categories', payload)
      .then(response => {
        if (response.data.success) {
          commit('createSubCategory', response.data.subCategory)
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
  updateSubCategory ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    store.dispatch('loader/activeLoader')
    Vue.axios.put('/admin/product/sub-categories/' + payload._id, payload.data)
      .then(response => {
        if (response.data.success) {
          commit('updateSubCategory', response.data.subCategory)
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
  deleteSubCategory ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.delete('/admin/product/sub-categories/' + payload._id)
      .then(response => {
        if (response.data.success) {
          commit('deleteSubCategory', response.data.subCategory)
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
  setSubCategories (state, subCategories) {
    state.subCategories = subCategories
  },
  createSubCategory (state, subCategory) {
    // Push new data to state
    state.subCategories.push(subCategory)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  updateSubCategory (state, subCategory) {
    state.subCategories = state.subCategories.map(scat => scat._id === subCategory._id ? (scat = subCategory) : scat)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  deleteSubCategory (state, subCategory) {
    state.subCategories = state.subCategories.filter(scat => scat._id !== subCategory._id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
