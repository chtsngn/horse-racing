<template>
  <div class="row i-game-container" ref="gameContainer">
    <div class="col-12 text-center text-h6 text-bold q-mt-sm">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">
          Active Round: {{ racingActiveRound.name }} ({{ racingActiveRound.sequence }}m)
        </div>
        <div class="col-3 text-right">
          <q-btn color="primary" label="Next" @click="nextRound()" icon-right="arrow_forward" />
        </div>
      </div>
    </div>

    <div
      class="col-12 i-lane full-height"
      v-for="(horse, index) in racingActiveRound.horses"
      :key="horse.id"
      ref="lanes"
    >
      <div class="row items-center q-col-gutter-sm i-lane--item">
        <div class="col-auto i-lane--position-wrapper">
          <div class="text-h6 text-center i-lane--position">{{ index + 1 }}</div>
        </div>

        <div class="col i-lane--lane">
          <div
            class="i-lane--horse"
            :style="{
              left: horse.activePosition + 'px',
            }"
          >
            <Horse
              :isRunning="
                isRoundStarted && !isRoundPaused && !isRoundFinished && !horse.finishedTime
              "
              :scale="1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import Horse from './Horse.vue'

const {
  mapGetters: mapProgramGetters,
  mapState: mapProgramState,
  mapActions: mapProgramActions,
} = createNamespacedHelpers('program')

export default defineComponent({
  name: 'GameComponent',
  components: {
    Horse,
  },
  data() {
    return {
      laneWidth: 0,
    }
  },
  computed: {
    ...mapProgramState(['raceInterval']),
    ...mapProgramGetters([
      'racingActiveRound',
      'isRoundStarted',
      'isRoundPaused',
      'isRoundFinished',
    ]),
    gameContainer() {
      return this.$refs.gameContainer
    },
  },
  watch: {
    'racingActiveRound.horses': {
      deep: true,
      handler(horses) {
        horses.forEach((horse) => {
          if (!horse.finishedTime && horse.activePosition >= this.laneWidth - 100) {
            this.setHorseFinished({ id: horse.id })
          }
        })
      },
    },
  },
  mounted() {
    setTimeout(() => {
      const lanes = this.$refs.lanes
      if (lanes && lanes.length > 0) {
        const firstLane = lanes[0]
        const laneRect = firstLane.getBoundingClientRect()
        this.laneWidth = laneRect.width
      }
    }, 1000)
  },
  methods: {
    ...mapProgramActions(['setHorseFinished', 'nextRound']),
  },
})
</script>

<style scoped>
.i-lane {
  border: 1px dashed #cccccc;
  border-left: 1px solid #cccccc;
  border-right: 4px solid red;
  padding: 10px;
  height: 64px;
  position: relative;
}

.i-lane--position-wrapper {
  width: 36px;
}

.i-lane--position {
  writing-mode: sideways-lr;
  text-orientation: sideways;
}

.i-lane--item {
  height: 64px;
}

.i-lane--lane {
  position: relative;
  width: 100%;
}

.i-lane--horse {
  position: absolute;
  top: 50%;
  transition: all 0.6s ease-out;
  transform: translateY(-50%);
}
</style>
