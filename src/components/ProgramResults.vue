<template>
  <div class="row">
    <div class="col-6">
      <Program />
    </div>
    <div class="col-6">
      <Results />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Program from './Program.vue'
import Results from './Results.vue'

export default defineComponent({
  name: 'ProgramResultsComponent',
  components: {
    Program,
    Results,
  },
})
</script>

<style scoped></style>
