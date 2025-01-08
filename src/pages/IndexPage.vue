<template>
  <q-page>
    <div class="row q-col-gutter-sm q-pt-md">
      <!-- Horses List-->
      <div class="col-3">
        <HorsesList />
      </div>

      <!-- Game -->
      <div class="col-6">
        <Game />
      </div>

      <!-- Results -->
      <div class="col-3">
        <ProgramResults />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import HorsesList from '../components/HorsesList.vue'
import Game from '../components/Game.vue'
import ProgramResults from '../components/ProgramResults.vue'

export default defineComponent({
  name: 'IndexPage',
  components: {
    HorsesList,
    Game,
    ProgramResults,
  },
})
</script>
