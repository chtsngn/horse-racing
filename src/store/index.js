import { generateRandomCondition, generateRandomStringId, getUniqueColors } from 'src/utils'
import { createStore } from 'vuex'

export default createStore({
  modules: {
    program: {
      namespaced: true,
      state: {
        racingProgram: [],
      },
      mutations: {
        setRacingProgram(state, payload) {
          state.racingProgram = payload
        },
      },
      actions: {
        createRacingProgram({ commit }, roundCount = 6) {
          const newProgram = []

          for (let i = 0; i < roundCount; i++) {
            newProgram.push({
              id: generateRandomStringId(),
              roundNumber: i + 1,
              horses: [],
            })
          }

          commit('setRacingProgram', newProgram)
        },
      },
      getters: {
        racingProgramCount(state) {
          return state.racingProgram.length
        },
      },
    },
  },

  state: {
    horses: [],
  },
  mutations: {
    setHorses(state, payload) {
      state.horses = payload
    },
  },
  actions: {
    createHorses({ commit }, horseCount = 20) {
      const newHorses = []
      const colors = getUniqueColors(horseCount)

      for (let i = 0; i < horseCount; i++) {
        newHorses.push({
          id: generateRandomStringId(),
          name: `Horse ${i + 1}`,
          color: colors[i],
          condition: generateRandomCondition(),
        })
      }

      commit('setHorses', newHorses)
    },
  },
  getters: {
    horsesCount(state) {
      return state.horses.length
    },
  },
})
