import { createStore } from 'vuex'
import program from './modules/program'
import actions from './actions'
import mutations from './mutations'

export default createStore({
  state: {
    horses: [],
  },
  mutations,
  actions,
  getters: {
    horsesCount(state) {
      return state.horses.length
    },
  },

  // modules
  modules: {
    program,
  },
})
