import store from '../../../store'
import Vue from 'vue'
// Initial state
const state = {
  categories: [],
  isLoggedIn: false
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
    Vue.axios.get('/admin/product/categories')
      .then(response => {
        if (response.data.success) {
          // Clear error
          store.dispatch('error/clearErrors')
          // Store to state
          commit('setCategories', response.data.categories)
        }
      })
      .catch(err => {
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  createCategory ({ commit }, payload) {
    Vue.axios.post('/admin/product/categories', payload)
      .then(response => {
        if (response.data.success) {
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  updateCategory ({ commit }, payload) {
    Vue.axios.put('/admin/product/categories/' + payload._id, payload.data)
      .then(response => {
        if (response.data.success) {
          commit('updateCategory', response.data.category)
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
        // Handle all error by error state
        store.dispatch('error/setErrors', err.response.data)
      })
  },
  deleteCategory ({ commit }, payload) {
    Vue.axios.delete('/admin/product/categories/' + payload._id)
      .then(response => {
        if (response.data.success) {
          commit('deleteCategory', response.data.category)
          // Clear error
          store.dispatch('error/clearErrors')
        }
      })
      .catch(err => {
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
