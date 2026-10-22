<template>
  <WeftShell v-if="auth.isAuthenticated && !route.meta.guest" />
  <RouterView v-else />
</template>

<script setup>
import { useRoute } from 'vue-router'
import WeftShell from './shells/WeftShell.vue'
import { useAuthStore } from './stores/auth.js'

const route = useRoute()
const auth = useAuthStore()
</script>
