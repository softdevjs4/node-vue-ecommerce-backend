import store from '../../../store'
import Vue from 'vue'
// Initial state
const state = {
  manufacturers: []
}

// Getters
const getters = {
  getManufacturers (state) {
    return state.manufacturers
  }
}

// Actions
const actions = {
  getManufacturers ({ commit }) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.get('/admin/product/manufacturers')
      .then(response => {
        if (response.data.success) {
          // Store to state
          commit('setmanufacturers', response.data.manufacturers)
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
  createManufacturer ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make form data
    const fd = new FormData()
    fd.append('name', payload.name)
    fd.append('url', payload.url)
    fd.append('image', payload.image)
    // Make server request
    Vue.axios.post('/admin/product/manufacturers', fd)
      .then(response => {
        if (response.data.success) {
          commit('createManufacturer', response.data.manufacturer)
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
  updateManufacturer ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make form data
    const fd = new FormData()
    fd.append('name', payload.data.name)
    fd.append('url', payload.data.url)
    fd.append('image', payload.data.image)
    // Make server request
    store.dispatch('loader/activeLoader')
    Vue.axios.put('/admin/product/manufacturers/' + payload._id, fd)
      .then(response => {
        if (response.data.success) {
          commit('updateManufacturer', response.data.manufacturer)
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
  deleteManufacturer ({ commit }, payload) {
    // Active preloader
    store.dispatch('loader/activeLoader')
    // Make server request
    Vue.axios.delete('/admin/product/manufacturers/' + payload._id)
      .then(response => {
        if (response.data.success) {
          commit('deleteManufacturer', response.data.manufacturer)
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
  setmanufacturers (state, manufacturers) {
    state.manufacturers = manufacturers
  },
  createManufacturer (state, manufacturer) {
    // Push new data to state
    state.manufacturers.push(manufacturer)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  updateManufacturer (state, manufacturer) {
    state.manufacturers = state.manufacturers.map(cat => cat._id === manufacturer._id ? (cat = manufacturer) : cat)
    // Clear error
    store.dispatch('error/clearErrors')
  },
  deleteManufacturer (state, manufacturer) {
    state.manufacturers = state.manufacturers.filter(cat => cat._id !== manufacturer._id)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
