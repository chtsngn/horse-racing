import { cloneDeep } from 'lodash'
import { generateRandomCondition, generateRandomStringId, getUniqueColors } from 'src/utils'
import { createStore } from 'vuex'

export default createStore({
  modules: {
    program: {
      namespaced: true,
      state: {
        racingProgram: [],
        racingResults: [],
        activeRoundIndex: 0,
        roundStarted: false,
        roundPaused: false,
        raceFinished: false,
        raceInterval: null,
        raceIntervalDuration: 500,
      },
      mutations: {
        setRacingProgram(state, payload) {
          state.racingProgram = payload
        },
        setRacingResults(state, payload) {
          state.racingResults = payload
        },
        setRoundStarted(state, payload) {
          state.roundStarted = payload
        },
        setRoundPaused(state, payload) {
          state.roundPaused = payload
        },
        setRaceFinished(state, payload) {
          state.raceFinished = payload
        },
        setRacingResultsHorses(state, payload) {
          state.racingResults[state.activeRoundIndex].horses = payload
        },
        setActiveRoundIndex(state, payload) {
          state.activeRoundIndex = payload
        },
      },
      actions: {
        async createRacingProgram({ commit, dispatch }, roundCount = 6) {
          const newProgram = []

          for (let i = 0; i < roundCount; i++) {
            const randomHorses = await dispatch('getRandomUniqueHorseByCount', 10, { root: true })
            // it solves the problem of mutating the original horses array
            const horsesDeepCopy = randomHorses.map((horse) => ({
              ...horse,
              activePosition: 0,
            }))

            newProgram.push({
              id: generateRandomStringId(),
              name: `Lap - ${i + 1}`,
              sequence: 1200 + i * 200,
              horses: horsesDeepCopy,
            })
          }

          commit('setRacingProgram', newProgram)
          commit('setRacingResults', cloneDeep(newProgram))
        },
        startRound({ commit, state, getters }) {
          commit('setRoundStarted', true)

          // run horses with their condition
          const horsesCount = getters.racingActiveRound.horses.length

          state.raceInterval = setInterval(() => {
            for (let i = 0; i < horsesCount; i++) {
              const horse = getters.racingActiveRound.horses[i]
              const randomBoost = Math.random() * 30
              // percentage of the lane
              horse.activePosition += horse.condition / 5 + randomBoost
            }

            const newSortedHorses = [...getters.racingActiveRound.horses].sort(
              (a, b) => b.activePosition - a.activePosition,
            )

            commit('setRacingResultsHorses', newSortedHorses)

            if (
              getters.racingActiveRound.horses.some(
                (horse) => horse.activePosition >= getters.racingActiveRound.sequence,
              )
            ) {
              commit('setRaceFinished', true)
              clearInterval(state.raceInterval)
            }
          }, state.raceIntervalDuration)
        },
        pauseRound({ commit, state }) {
          commit('setRoundPaused', true)
          clearInterval(state.raceInterval)
        },
        resumeRound({ commit, dispatch }) {
          commit('setRoundPaused', false)
          dispatch('startRound')
        },
        finishRound({ commit, state }) {
          commit('setRoundStarted', false)
          commit('setRaceFinished', true)
          clearInterval(state.raceInterval)
        },
        getHorseById({ state }, id) {
          return state.horses.find((horse) => horse.id === id)
        },
      },
      getters: {
        racingProgramCount(state) {
          return state.racingProgram.length
        },
        racingActiveRound(state) {
          return state.racingProgram[state.activeRoundIndex]
        },
        racingResultsActiveRound(state) {
          return state.racingResults[state.activeRoundIndex]
        },
        isRaceFinished(state) {
          return state.raceFinished
        },
        isRoundStarted(state) {
          return state.roundStarted
        },
        isRoundPaused(state) {
          return state.roundPaused
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
    getRandomUniqueHorseByCount({ state }, horseCount = 10) {
      const randomHorses = new Set()

      while (randomHorses.size < horseCount) {
        const randomIndex = Math.floor(Math.random() * state.horses.length)
        const horse = state.horses[randomIndex]
        randomHorses.add(horse)
      }

      return Array.from(randomHorses)
    },
  },
  getters: {
    horsesCount(state) {
      return state.horses.length
    },
  },
})
