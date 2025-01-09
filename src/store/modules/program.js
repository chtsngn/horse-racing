import { cloneDeep, partition } from 'lodash'
import { generateRandomStringId } from 'src/utils'

export default {
  namespaced: true,
  state: {
    racingProgram: [],
    racingResults: [],
    activeRoundIndex: 0,
    raceInterval: null,
    raceIntervalDuration: 100,
  },
  mutations: {
    setRacingProgram(state, payload) {
      state.racingProgram = payload
    },
    setRacingResults(state, payload) {
      state.racingResults = payload
    },
    setRacingResultsHorses(state, payload) {
      state.racingResults[state.activeRoundIndex].horses = payload
    },
    setActiveRoundIndex(state, payload) {
      state.activeRoundIndex = payload
    },
    setRaceInterval(state, payload) {
      state.raceInterval = payload
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
          finishedTime: null,
        }))

        newProgram.push({
          id: generateRandomStringId(),
          name: `Lap - ${i + 1}`,
          sequence: 1200 + i * 200,
          horses: horsesDeepCopy,
          roundStarted: false,
          roundPaused: false,
          raceFinished: false,
        })
      }

      commit('setActiveRoundIndex', 0)
      commit('setRacingProgram', newProgram)
      commit('setRacingResults', cloneDeep(newProgram))
    },
    startRound({ dispatch, state, getters, commit }) {
      dispatch('setRoundStarted', true)
      dispatch('setRoundPaused', false)
      dispatch('setRaceFinished', false)

      // run horses with their condition
      const horsesCount = getters.racingActiveRound.horses.length

      const interval = setInterval(() => {
        for (let i = 0; i < horsesCount; i++) {
          const horse = getters.racingActiveRound.horses[i]
          const randomBoost = Math.random() * 10

          if (!horse.finishedTime) {
            horse.activePosition += horse.condition / 100 + randomBoost
          }
        }

        const clonedHorses = cloneDeep(getters.racingActiveRound.horses)

        const [finishedHorses, unfinishedHorses] = partition(
          clonedHorses,
          (horse) => horse.finishedTime,
        )

        // sort finished horses by finished time
        finishedHorses.sort((a, b) => a.finishedTime - b.finishedTime)

        // sort unfinished horses by active position
        unfinishedHorses.sort((a, b) => b.activePosition - a.activePosition)

        commit('setRacingResultsHorses', [...finishedHorses, ...unfinishedHorses])

        if (unfinishedHorses.length === 0) {
          dispatch('finishRound')
        }
      }, state.raceIntervalDuration)

      commit('setRaceInterval', interval)
    },
    pauseRound({ dispatch, state, commit }) {
      clearInterval(state.raceInterval)
      commit('setRaceInterval', null)
      dispatch('setRoundPaused', true)
    },
    resumeRound({ dispatch }) {
      dispatch('startRound')
    },
    finishRound({ dispatch, state, commit }) {
      clearInterval(state.raceInterval)
      commit('setRaceInterval', null)
      dispatch('setRoundPaused', false)
      dispatch('setRoundStarted', false)
      dispatch('setRaceFinished', true)

      dispatch('nextRound')
    },
    getHorseById({ state }, id) {
      return state.horses.find((horse) => horse.id === id)
    },
    setRoundStarted({ getters }, payload) {
      getters.racingActiveRound.roundStarted = payload
    },
    setRoundPaused({ getters }, payload) {
      getters.racingActiveRound.roundPaused = payload
    },
    setRaceFinished({ getters }, payload) {
      getters.racingActiveRound.raceFinished = payload
    },
    setHorseFinished({ getters }, { id }) {
      const finishedTime = Date.now()

      const horse = getters.racingResultsActiveRound.horses.find((horse) => horse.id === id)
      horse.finishedTime = finishedTime

      const horseForRacing = getters.racingActiveRound.horses.find((horse) => horse.id === id)
      horseForRacing.finishedTime = finishedTime
    },
    nextRound({ state, commit, dispatch }) {
      if (state.activeRoundIndex < state.racingProgram.length - 1) {
        commit('setActiveRoundIndex', state.activeRoundIndex + 1)

        dispatch('setRaceFinished', false)
        dispatch('setRoundStarted', false)
        dispatch('setRoundPaused', false)
      }
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
    isRoundFinished(_, getters) {
      return getters.racingActiveRound?.raceFinished
    },
    isRoundStarted(_, getters) {
      return getters.racingActiveRound?.roundStarted
    },
    isRoundPaused(_, getters) {
      return getters.racingActiveRound?.roundPaused
    },
  },
}
