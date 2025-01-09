<template>
  <div class="row">
    <div class="col-12 i-lane full-height" v-for="(horse, index) in racingActiveRound.horses" :key="horse.id">
      <div class="row items-center q-col-gutter-sm i-lane--item">
        <div class="col-auto i-lane--position-wrapper">
          <div class="text-h6 text-center i-lane--position">{{ index + 1 }}</div>
        </div>

        <div class="col i-lane--lane">
          <div class="i-lane--horse" :style="{
            left: horse.activePosition + 'px',
          }">
            {{ horse.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 text-center text-h6 text-bold q-mt-sm">
      Active Round: {{ racingActiveRound.name }} ({{ racingActiveRound.sequence }}m)
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'

const { mapGetters: mapProgramGetters } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'GameComponent',
  data() {
    return {}
  },
  computed: {
    ...mapProgramGetters(['racingActiveRound']),
  },
  methods: {
    startRace() {
      // Race logic goes here
    },
  },
})
</script>

<style scoped>
.i-lane {
  border: 1px solid #cccccc;
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
}
</style>
