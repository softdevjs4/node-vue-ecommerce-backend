import router from '../../router'
// initial state
const state = {
  user: {},
  isLoggedIn: false
}

// getters
const getters = {}

// actions
const actions = {
  login({commit}, payload){
    if(payload.email == 'ahadcr0@gmail.com'){
      commit('setLoginUser', {name:'Mir HB Rahman', email: 'ahadcr0@gmail.com'})
      console.log('Login successfull')
      router.push('/')
    }else{
      console.log('Login fail')
    }
  }
}

// mutations
const mutations = {
  setLoginUser(state, user){
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
