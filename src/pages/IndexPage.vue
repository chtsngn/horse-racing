<template>
  <q-page>
    <div class="row q-col-gutter-sm q-pt-md">
      <!-- Horses List-->
      <div class="col-3">
        <HorseList />
      </div>

      <template v-if="racingProgramCount">
        <!-- Game -->
        <div class="col-6">
          <Game />
        </div>

        <!-- Results -->
        <div class="col-3">
          <ProgramResults />
        </div>
      </template>
      <template v-else>
        <div class="col-9 text-center q-pa-xl text-italic">
          <p>No racing programs available. Please create one.</p>
        </div>
      </template>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { createNamespacedHelpers } from 'vuex'

import HorseList from '../components/HorseList.vue'
import Game from '../components/Game.vue'
import ProgramResults from '../components/ProgramResults.vue'

const { mapGetters: mapProgramGetters } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'IndexPage',
  components: {
    HorseList,
    Game,
    ProgramResults,
  },
  computed: {
    ...mapProgramGetters(['racingProgramCount']),
  },
})
</script>
