<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> Horse Racing </q-toolbar-title>

      <div class="row q-gutter-md">
        <q-btn
          icon="fas fa-wand-magic-sparkles"
          flat
          dense
          label="Generate Program"
          @click="createRacingProgram()"
        />
        <q-btn icon="fas fa-play" flat dense label="Start/Pause" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapProgramActions } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'NavbarComponent',
  methods: {
    ...mapProgramActions(['createRacingProgram']),
  },
})
</script>

<style scoped></style>
