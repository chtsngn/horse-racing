<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title> Horse Racing </q-toolbar-title>

      <div class="row q-gutter-md">
        <q-btn icon="fas fa-wand-magic-sparkles" flat dense label="Generate Program" />
        <q-btn icon="fas fa-play" flat dense label="Start/Pause" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarComponent',
})
</script>

<style scoped></style>
