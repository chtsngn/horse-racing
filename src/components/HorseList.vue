<template>
  <div class="row">
    <div class="col-12">
      <q-card square>
        <q-card-section class="bg-warning text-white q-pa-sm">
          <div class="text-h6">Horse List (1-{{ horsesCount }})</div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-table
            hide-bottom
            flat
            :rows="horses"
            :columns="headers"
            row-key="id"
            :rows-per-page-options="[0]"
          >
            <!-- <template v-slot:body-cell-name="props">
              <q-td :props="props">
                <div>
                  <q-badge color="purple" :label="props.value" />
                </div>
              </q-td>
            </template> -->
            <!-- <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="name" :props="props">
                  <div>{{ props.row.name }}</div>
                </q-td>
                <q-td key="condition" :props="props">
                  <div>{{ props.row.condition }}</div>
                </q-td>
                <q-td key="color" :props="props">
                  <div>{{ props.row.color }}</div>
                </q-td>
              </q-tr>
            </template> -->
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'

export default defineComponent({
  name: 'HorseListComponent',
  data() {
    return {
      headers: [
        {
          label: 'Name',
          field: 'name',
          sortable: true,
        },
        {
          label: 'Condition',
          field: 'condition',
          sortable: true,
        },
        {
          label: 'Color',
          field: 'color',
          sortable: true,
        },
      ],
    }
  },
  computed: {
    ...mapState(['horses']),
    ...mapGetters(['horsesCount']),
  },
})
</script>
