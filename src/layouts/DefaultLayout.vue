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

<style lang="scss">

.main {
    background:  $color-primary;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>
