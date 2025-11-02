<template>
  <div v-if="deferredPrompt" class="d-flex align-center justify-space-between w-100">
    <p class="text-subtitle-1 font-weight-bold text--darken-2 mb-0">
      <v-icon start color="#1c5a81">mdi-download</v-icon>
      Instalar App
    </p>
    <v-btn
      @click="installPWA"
      color="#1c5a81"
      variant="tonal"
      size="small"
    >
      Instalar
    </v-btn>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const deferredPrompt = ref(null)

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
  })
  
  window.addEventListener('appinstalled', () => {
    deferredPrompt.value = null
  })
})

const installPWA = async () => {
  if (!deferredPrompt.value) return
  
  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  
  if (outcome === 'accepted') {
    console.log('App instalado com sucesso!')
  }
  
  deferredPrompt.value = null
}
</script>