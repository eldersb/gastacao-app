<template>
  <v-app>
    <Header />
    <v-main>
      <v-container class="main">
        <router-view />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'DefaultLayout',
  components: { Header, Footer },
}
</script>

<style scoped lang="scss">

@import "@/assets/styles/main.scss";

.main {
    background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%)
}
</style>
