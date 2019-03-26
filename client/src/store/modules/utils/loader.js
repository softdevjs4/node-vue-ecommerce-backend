// Initial state
const state = {
  isLoading: true
}
// Getters
const getters = {
  isLoading (state) {
    return state.isLoading
  }
}

// Actions
const actions = {
  activeLoader ({commit}) {
    commit('activeLoader')
  },
  deactiveLoader ({commit}) {
    commit('deactiveLoader')
  }
}

// Mutations
const mutations = {
  activeLoader (state) {
    state.isLoading = true
  },
  deactiveLoader (state) {
    state.isLoading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
