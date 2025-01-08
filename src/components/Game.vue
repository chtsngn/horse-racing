<template>
  <div class="row">
    <div class="col-12">
      <div class="text-h6">GameComponent</div>
    </div>

    <div class="col-12 i-lane" v-for="lane in lanes" :key="lane.id">
      <div class="row">
        <div class="col-auto">
          <div class="text-h6 text-center i-lane-id">{{ lane.id }}</div>
        </div>
      </div>
    </div>
    <div class="col-12 text-center text-h6 text-bold q-mt-sm">Active Lap</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameComponent',
  data() {
    return {
      lanes: [
        { id: '1', horse: { id: '1', name: 'Horse 1', color: '#000000' } },
        { id: '2', horse: { id: '2', name: 'Horse 2', color: '#FF0000' } },
        { id: '3', horse: { id: '3', name: 'Horse 3', color: '#00FF00' } },
        { id: '4', horse: { id: '4', name: 'Horse 4', color: '#0000FF' } },
        { id: '5', horse: { id: '5', name: 'Horse 5', color: '#FFFF00' } },
        { id: '6', horse: { id: '6', name: 'Horse 6', color: '#FF00FF' } },
        { id: '7', horse: { id: '7', name: 'Horse 7', color: '#00FFFF' } },
        { id: '8', horse: { id: '8', name: 'Horse 8', color: '#800080' } },
        { id: '9', horse: { id: '9', name: 'Horse 9', color: '#808000' } },
        { id: '10', horse: { id: '10', name: 'Horse 10', color: '#8000FF' } },
      ],
    }
  },
})
</script>

<style scoped lang="scss">
.i-lane {
  border: 1px solid #cccccc;
  border-right: 4px solid red;
  padding: 10px;
  height: 64px;
  position: relative;

  .i-line-id {
    text-orientation: sideways;
  }

  :last-child::after {
    content: 'Finish';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: green;
  }
}
</style>
