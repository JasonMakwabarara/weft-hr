<template>
  <div class="min-h-screen flex items-center justify-center px-6" style="background: var(--bg);">
    <form class="w-full max-w-sm space-y-4" data-testid="weft-login" @submit.prevent="submit">
      <div>
        <h1 class="text-2xl font-semibold" style="color: var(--text-primary);">Weft HR</h1>
        <p class="text-sm mt-1" style="color: var(--text-secondary);">Sign in with your SpiderNetOS account.</p>
      </div>
      <label class="block text-sm space-y-1" style="color: var(--text-secondary);">
        Email
        <input v-model="email" type="email" required autocomplete="username" class="w-full px-3 py-2 rounded border" :style="field" data-testid="weft-login-email" />
      </label>
      <label class="block text-sm space-y-1" style="color: var(--text-secondary);">
        Password
        <input v-model="password" type="password" required autocomplete="current-password" class="w-full px-3 py-2 rounded border" :style="field" data-testid="weft-login-password" />
      </label>
      <p v-if="error" class="text-sm" style="color: var(--danger);" data-testid="weft-login-error">{{ error }}</p>
      <button class="sn-btn-primary w-full" type="submit" :disabled="pending" data-testid="weft-login-submit">
        {{ pending ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const pending = ref(false)
const field = { background: 'var(--surface-low)', color: 'var(--text-primary)', borderColor: 'var(--border)' }

async function submit() {
  error.value = ''
  pending.value = true
  const result = await auth.login(email.value, password.value)
  pending.value = false
  if (!result.success) {
    error.value = result.error || 'Could not sign in.'
    return
  }
  const target = typeof route.query.return_to === 'string' ? route.query.return_to : '/weft/people'
  router.push(target.startsWith('/weft') ? target : '/weft/people')
}
</script>
