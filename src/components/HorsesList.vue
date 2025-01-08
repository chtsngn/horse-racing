<template>
  <div class="row">
    <div class="col-12">
      <q-card square>
        <q-card-section class="bg-warning text-white q-pa-sm">
          <div class="text-h6">Horse List (1-20)</div>
        </q-card-section>

        <q-card-section class="q-pa-none">
          <q-table hide-bottom flat :rows="horses" :columns="headers" row-key="name" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HorsesListComponent',
  data() {
    return {
      horses: [
        { name: 'Edna', condition: 90, color: 'Golden' },
        { name: 'Bella', condition: 80, color: 'Brown' },
        { name: 'Lily', condition: 50, color: 'White' },
        //... more horses
      ],
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
})
</script>
