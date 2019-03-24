import router from '../../router'
import Vue from 'vue'
// initial state
const state = {
  user: {},
  isLoggedIn: false,
  errors: {},
  isError: false
}

// getters
const getters = {
  isError (state) {
    return state.isError
  },
  getErrors (state) {
    return state.errors
  }
}

// actions
const actions = {
  login ({commit}, payload) {
    Vue.axios.post('/admin/login', payload)
      .then(response => {
        if (response.data.success) {
          commit('loginUser', response.data.user)
          // set token to local storage
          localStorage.setItem('jwt', response.data.token)
          router.push({name: 'userDashboard'})
        }
      })
      .catch(err => {
        commit('setErrors', err.response.data)
      })
  },
  logout ({commit}) {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt')
      commit('clearCurrentUser')
      router.push({name: 'loginUser'})
    }
  }
}

// mutations
const mutations = {
  setErrors (state, errors) {
    state.errors = errors
    state.isError = true
  },
  loginUser (state, user) {
    state.user = user
    state.isLoggedIn = true
  },
  clearCurrentUser (state) {
    state.user = null
    state.isLoggedIn = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
