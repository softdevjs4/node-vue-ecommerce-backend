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
  isError(state){
    return state.isError
  },
  getErrors(state){
    return state.errors
  }
}

// actions
const actions = {
  login({commit}, payload){
    Vue.axios.post('/login', payload)
      .then(response=>{
        if(response.data.success){
          commit('loginUser', response.data.user)
          // set token to local storage
          localStorage.setItem('jwt', response.data.token)
          router.push('/')
        }
      })
      .catch(err=>{
        commit('setErrors', err.response.data)
      })
  }
}

// mutations
const mutations = {
  setErrors(state, errors){
    state.errors = errors
    state.isError = true
  },
  loginUser(state, user){
    state.user = user
    state.isLoggedIn = true
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
