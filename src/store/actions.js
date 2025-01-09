import { generateRandomCondition, generateRandomStringId, getUniqueColors } from 'src/utils'

export default {
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
}
