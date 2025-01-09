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
        <q-btn
          :icon="isRoundStarted && !isRoundPaused ? 'fas fa-pause' : 'fas fa-play'"
          flat
          dense
          :label="!isRoundStarted ? 'Start' : isRoundPaused ? 'Resume' : 'Pause'"
          @click="
            isRoundStarted && !isRoundPaused
              ? pauseRound()
              : isRoundPaused
                ? resumeRound()
                : startRound()
          "
        />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'

const { mapActions: mapProgramActions, mapGetters: mapProgramGetters } =
  createNamespacedHelpers('program')

export default defineComponent({
  name: 'NavbarComponent',
  computed: {
    ...mapProgramGetters(['isRoundFinished', 'isRoundStarted', 'isRoundPaused']),
  },
  methods: {
    ...mapProgramActions(['createRacingProgram', 'startRound', 'pauseRound', 'resumeRound']),
  },
})
</script>

<style scoped></style>
