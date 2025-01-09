<template>
  <q-table
    square
    dense
    hide-bottom
    flat
    :rows-per-page-options="[0]"
    separator="cell"
    v-bind="$props"
  >
    <template v-slot:body-cell-position="props">
      <q-td :props="props">
        {{ props.rowIndex + 1 }}
      </q-td>
    </template>

    <!-- Other slots -->
    <slot />
  </q-table>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoundPositionTableComponent',
})
</script>

<style scoped></style>
