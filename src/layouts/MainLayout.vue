<template>
  <q-layout view="lHh Lpr lFf">
    <Navbar />

    <q-page-container class="q-px-sm">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import Navbar from '../components/Navbar.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Navbar,
  },

  data() {
    return {}
  },

  methods: {},
})
</script>
