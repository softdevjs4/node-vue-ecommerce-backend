import store from '../../../store'
import Vue from 'vue'
// Initial state
const state = {
  optionGroups: []
}

// Getters
const getters = {
  getOptionGroups (state) {
    return state.optionGroups
  }
}

// Actions
const actions = {
  getOptionGroups ({ commit }) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get('/admin/product/option-groups')
      .then(response => {
        if (response.data.success) {
          // Store to state
          commit('setOptionGroups', response.data.optionGroups)
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
  createOptionGroup ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.post('/admin/product/option-groups', payload)
      .then(response => {
        if (response.data.success) {
          commit('createOptionGroup', response.data.optionGroup)
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
  updateOptionGroup ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    store.dispatch('loader/activeLoader')
    Vue.axios.put('/admin/product/option-groups/' + payload._id, payload.data)
      .then(response => {
        if (response.data.success) {
          commit('updateOptionGroup', response.data.optionGroup)
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
  deleteOptionGroup ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.delete('/admin/product/option-groups/' + payload._id)
      .then(response => {
        if (response.data.success) {
          commit('deleteOptionGroup', response.data.optionGroup)
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
  setOptionGroups (state, optionGroups) {
    state.optionGroups = optionGroups
  },
  createOptionGroup (state, optionGroup) {
    // Push new data to state
    state.optionGroups.push(optionGroup)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  updateOptionGroup (state, optionGroup) {
    state.optionGroups = state.optionGroups.map(og => og._id === optionGroup._id ? (og = optionGroup) : og)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  deleteOptionGroup (state, optionGroup) {
    state.optionGroups = state.optionGroups.filter(og => og._id !== optionGroup._id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
