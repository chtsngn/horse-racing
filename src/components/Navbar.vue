<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> Horse Racing </q-toolbar-title>

      <div class="row q-gutter-md">
        <q-btn icon="fas fa-wand-magic-sparkles" flat dense label="Generate Program" @click="createRacingProgram()" />
        <q-btn v-if="!isRoundStarted" icon="fas fa-play" flat dense label="Start/Pause" @click="startRound()" />
        <q-btn v-else-if="isRoundPaused" icon="fas fa-play" flat dense label="Resume" @click="resumeRound()" />
        <q-btn v-else icon="fas fa-pause" flat dense label="Pause" @click="pauseRound()" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapProgramActions, mapGetters: mapProgramGetters } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'NavbarComponent',
  computed: {
    ...mapProgramGetters(['isRaceFinished', 'isRoundStarted', 'isRoundPaused']),
  },
  methods: {
    ...mapProgramActions(['createRacingProgram', 'startRound', 'pauseRound', 'resumeRound']),
  },
})
</script>

<style scoped></style>
