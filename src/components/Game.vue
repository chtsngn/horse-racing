<template>
  <div class="row i-game-container" ref="gameContainer">
    <div class="col-12 text-center text-h6 text-bold q-mt-sm">
      <div class="row">
        <div class="col-3"></div>
        <div class="col-6">{{ racingActiveRound.name }} ({{ racingActiveRound.sequence }}m)</div>
        <div class="col-3 text-right text-red text-bold text-h6">Finish</div>
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
          <div
            class="text-h6 text-center i-lane--position"
            :style="{
              backgroundColor: horse.color,
            }"
          >
            <div class="text-h6 text-center">{{ index + 1 }}</div>
          </div>
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
              :name="horse.name"
            />
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="resultDialog" backdrop-filter="blur(4px) grayscale(100%)">
      <q-card class="i-dialog">
        <q-card-section class="bg-positive text-white q-pa-sm i-scrollable--header">
          <div class="row justify-between items-center">
            <div class="text-h6">Results</div>
            <q-btn size="sm" @click="closeResultDialog" icon="close" flat round />
          </div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6" v-for="round in racingResults" :key="round.id">
              <q-card square flat bordered>
                <q-card-section
                  class="text-white q-pa-xs text-center i-scrollable--header-sub bg-grey"
                >
                  <div class="text-body">
                    {{ round.name }}
                  </div>
                </q-card-section>

                <q-card-section class="q-pa-none">
                  <RoundPositionTable :rows="round.horses" :columns="headers" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'
import Horse from './Horse.vue'
import RoundPositionTable from './RoundPositionTable.vue'
const {
  mapGetters: mapProgramGetters,
  mapState: mapProgramState,
  mapActions: mapProgramActions,
} = createNamespacedHelpers('program')

export default defineComponent({
  name: 'GameComponent',
  components: {
    Horse,
    RoundPositionTable,
  },
  data() {
    return {
      laneWidth: 0,
      resultDialog: false,
      headers: [
        { label: 'Position', field: 'position', align: 'center', name: 'position' },
        { label: 'Name', field: 'name', align: 'center', name: 'name' },
      ],
    }
  },
  computed: {
    ...mapProgramState(['raceInterval', 'activeRoundIndex', 'racingResults', 'raceFinished']),
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
    raceFinished() {
      this.showResultDialog()
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
    ...mapProgramActions(['setHorseFinished']),
    showResultDialog() {
      this.resultDialog = true
    },
    closeResultDialog() {
      this.resultDialog = false
    },
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
  border-radius: 4px;
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

.i-dialog {
  width: 700px;
  max-width: 80vw;
}
</style>
