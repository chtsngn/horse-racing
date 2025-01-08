<template>
  <div class="row">
    <div class="col-12">
      <q-card square>
        <q-card-section class="bg-positive text-white q-pa-sm">
          <div class="text-h6">Results</div>
        </q-card-section>

        <q-card-section class="q-pa-none" v-for="round in rounds" :key="round.id">
          <q-card square flat>
            <q-card-section class="bg-grey text-white q-pa-xs text-center">
              <div class="text-body">
                {{ round.name }}
              </div>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <q-table square dense hide-bottom flat :rows="data" :columns="headers" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ResultsComponent',
  data() {
    return {
      data: [
        { position: 1, name: 'Horse 1' },
        { position: 2, name: 'Horse 2' },
      ],
      headers: [
        { label: 'Position', field: 'position', sortable: true },
        { label: 'Name', field: 'name', sortable: true },
      ],
      rounds: [
        { id: '1', name: '1st Lap', sequence: 1200 },
        { id: '2', name: '2nd Lap', sequence: 1400 },
        { id: '3', name: '3rd Lap', sequence: 1600 },
        { id: '4', name: '4th Lap', sequence: 1800 },
        { id: '5', name: '5th Lap', sequence: 2000 },
        { id: '6', name: '6th Lap', sequence: 2200 },
      ],
    }
  },
})
</script>

<style scoped></style>
