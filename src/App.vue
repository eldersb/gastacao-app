<template>
  <v-app>

    <Header v-if="showLayout" />

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>


    <Footer v-if="showLayout" />
  </v-app>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: { Header, Footer },
  setup() {
    const route = useRoute()

 
    const showLayout = computed(() => {
      return route.name !== 'Login' && route.name !== 'Register'
    })

    return { showLayout }
  }
}
</script>

<style>
.v-application {
  min-height: 100vh;
}
</style>
