<template>
  <div class="row">
    <div class="col-12 i-lane full-height" v-for="lane in lanes" :key="lane.id">
      <div class="row items-center q-col-gutter-sm i-lane--item">
        <div class="col-auto i-lane--position-wrapper">
          <div class="text-h6 text-center i-lane--position">{{ lane.id }}</div>
        </div>

        <div class="col i-lane--lane">
          <div
            class="i-lane--horse"
            :style="{
              left: lane.horse.position + '%',
            }"
          >
            {{ lane.horse.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 text-center text-h6 text-bold q-mt-sm">Active Lap: -</div>
    <q-btn @click="randomHorsePositions" label="Change" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'

export default defineComponent({
  name: 'GameComponent',
  data() {
    return {
      lanes: [
        { id: '1', horse: { id: '1', name: 'Horse 1', color: '#000000', position: 0 } },
        { id: '2', horse: { id: '2', name: 'Horse 2', color: '#FF0000', position: 0 } },
        { id: '3', horse: { id: '3', name: 'Horse 3', color: '#00FF00', position: 0 } },
        { id: '4', horse: { id: '4', name: 'Horse 4', color: '#0000FF', position: 0 } },
        { id: '5', horse: { id: '5', name: 'Horse 5', color: '#FFFF00', position: 0 } },
        { id: '6', horse: { id: '6', name: 'Horse 6', color: '#FF00FF', position: 0 } },
        { id: '7', horse: { id: '7', name: 'Horse 7', color: '#00FFFF', position: 0 } },
        { id: '8', horse: { id: '8', name: 'Horse 8', color: '#800080', position: 0 } },
        { id: '9', horse: { id: '9', name: 'Horse 9', color: '#808000', position: 0 } },
        { id: '10', horse: { id: '10', name: 'Horse 10', color: '#8000FF' } },
      ],
    }
  },
  computed: {},
  methods: {
    randomHorsePositions() {
      this.lanes[0].horse.position += Math.random() * 5
      console.log(this.lanes[0].horse.position)

      // this.lanes = [...this.lanes]
    },
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
