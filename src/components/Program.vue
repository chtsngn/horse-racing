<template>
  <div class="row">
    <div class="col-12">
      <q-card square class="i-scrollable">
        <q-card-section class="bg-primary text-white q-pa-sm i-scrollable--header">
          <div class="text-h6">Program</div>
        </q-card-section>

        <q-card-section
          class="q-pa-none"
          v-for="(round, index) in racingProgram"
          :key="round.id"
          ref="rounds"
        >
          <q-card square flat :class="{ 'i-pulse': index === activeRoundIndex }">
            <q-card-section
              class="text-white q-pa-xs text-center i-scrollable--header-sub"
              :class="[index === activeRoundIndex ? 'bg-positive' : 'bg-grey']"
            >
              <div class="text-body">
                {{ round.name }}
              </div>
            </q-card-section>

            <q-card-section class="q-pa-none">
              <RoundPositionTable :rows="round.horses" :columns="headers" />
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import RoundPositionTable from './RoundPositionTable.vue'
import { createNamespacedHelpers } from 'vuex'

const { mapState: mapProgramState } = createNamespacedHelpers('program')

export default defineComponent({
  name: 'ProgramComponent',
  components: {
    RoundPositionTable,
  },
  data() {
    return {
      headers: [
        { label: 'Position', field: 'position', align: 'center', name: 'position' },
        { label: 'Name', field: 'name', align: 'center', name: 'name' },
      ],
    }
  },
  computed: {
    ...mapProgramState(['racingProgram', 'activeRoundIndex']),
  },
  watch: {
    activeRoundIndex() {
      this.$refs.rounds[this.activeRoundIndex]?.$el?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    },
  },
})
</script>

<style scoped></style>
