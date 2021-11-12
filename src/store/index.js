import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: localStorage.Authenticator=='false',
  },
  mutations: {
    toggleAuthenticated(state){
      localStorage.Authenticator = !state.isAuthenticated
      state.isAuthenticated = !state.isAuthenticated
    },
  },
  actions: {
  },
  modules: {
  }
})
