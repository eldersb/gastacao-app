<template>
  <v-app>

    <Header />

    <v-main>
      <v-container>
        <h1 class="text-center mt-5">Layout base</h1>
      </v-container>
    </v-main>

    <Footer />

  </v-app>
</template>


<script>

import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
.v-application {
  min-height: 100vh;
}

</style>
