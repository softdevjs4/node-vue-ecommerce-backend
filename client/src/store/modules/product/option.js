import store from '../../../store'
import Vue from 'vue'
// Initial state
const state = {
  options: []
}

// Getters
const getters = {
  getOptions (state) {
    return state.options
  }
}

// Actions
const actions = {
  getOptions ({ commit }) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get('/admin/product/options')
      .then(response => {
        if (response.data.success) {
          // Store to state
          commit('setOptions', response.data.options)
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
  createOption ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.post('/admin/product/options', payload)
      .then(response => {
        if (response.data.success) {
          commit('createOption', response.data.option)
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
  updateOption ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    store.dispatch('loader/activeLoader')
    Vue.axios.put('/admin/product/options/' + payload._id, payload.data)
      .then(response => {
        if (response.data.success) {
          commit('updateOption', response.data.option)
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
  deleteOption ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.delete('/admin/product/options/' + payload._id)
      .then(response => {
        if (response.data.success) {
          commit('deleteOption', response.data.option)
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
  setOptions (state, options) {
    state.options = options
  },
  createOption (state, option) {
    // Push new data to state
    state.options.push(option)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  updateOption (state, option) {
    state.options = state.options.map(opt => opt._id === option._id ? (opt = option) : opt)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  deleteOption (state, option) {
    state.options = state.options.filter(opt => opt._id !== option._id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
