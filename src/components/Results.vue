<template>
  <div class="row">
    <div class="col-12">
      <q-card square>
        <q-card-section class="bg-positive text-white q-pa-sm">
          <div class="text-h6">Results</div>
        </q-card-section>

        <q-card-section class="q-pa-none" v-for="round in racingResults" :key="round.id">
          <q-card square flat>
            <q-card-section class="bg-grey text-white q-pa-xs text-center">
              <div class="text-body">
                {{ round.name }}
              </div>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <q-table
                square
                dense
                hide-bottom
                flat
                :rows="round.horses"
                :columns="headers"
                :rows-per-page-options="[0]"
              >
                <template v-slot:body-cell-position="props">
                  <q-td :props="props">
                    <!-- index + 1 -->
                    {{ props.rowIndex + 1 }}
                  </q-td>
                </template>
              </q-table>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapProgramState } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'ResultsComponent',
  data() {
    return {
      headers: [{ label: 'Position' }, { label: 'Name', field: 'name', sortable: true }],
    }
  },
  computed: {
    ...mapProgramState(['racingResults']),
  },
})
</script>

<style scoped></style>
