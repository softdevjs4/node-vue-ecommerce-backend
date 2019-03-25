// Initial state
const state = {
  errors: {},
  isError: false
}
// Getters
const getters = {
  getErrors (state) {
    return state.errors
  },
  isError (state) {
    return state.isError
  }
}

// Actions
const actions = {
  setErrors ({commit}, errors) {
    commit('setErrors', errors)
  },
  clearErrors ({commit}) {
    commit('clearErrors')
  }
}

// Mutations
const mutations = {
  setErrors (state, errors) {
    state.errors = errors
    state.isError = true
  },
  clearErrors (state) {
    state.errors = {}
    state.isError = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
