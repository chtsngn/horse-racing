<template>
  <div class="row">
    <div class="col-12">
      <q-card square>
        <q-card-section class="bg-primary text-white q-pa-sm">
          <div class="text-h6">Program</div>
        </q-card-section>

        <q-card-section class="q-pa-none" v-for="round in racingProgram" :key="round.id">
          <q-card square flat>
            <q-card-section class="bg-grey text-white q-pa-xs text-center">
              <div class="text-body">
                {{ round.name }}
              </div>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <RoundPositionTable :rows="round.horses" :columns="headers" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RoundPositionTable from './RoundPositionTable.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapProgramState } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'ProgramComponent',
  components: {
    RoundPositionTable,
  },
  data() {
    return {
      headers: [
        { label: 'Position', field: 'position', align: 'center', name: 'position' },
        { label: 'Name', field: 'name', align: 'center', name: 'name' },
      ],
    }
  },
  computed: {
    ...mapProgramState(['racingProgram']),
  },
})
</script>

<style scoped></style>
