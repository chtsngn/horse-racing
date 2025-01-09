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
            <template v-slot:body-cell-color="props">
              <q-td :props="props">
                <div class="row q-col-gutter-xs">
                  <div class="col-auto">
                    <q-badge
                      :style="{ backgroundColor: props.value, width: '12px', height: '12px' }"
                    />
                  </div>
                  <div class="col">{{ props.value }}</div>
                </div>
              </q-td>
            </template>
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
          name: 'name',
          align: 'center',
          sortable: true,
        },
        {
          label: 'Condition',
          name: 'condition',
          field: 'condition',
          align: 'center',
          sortable: true,
        },
        {
          label: 'Color',
          field: 'color',
          name: 'color',
          align: 'center',
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
