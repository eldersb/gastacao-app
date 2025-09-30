<template>
  <v-app>
    <v-main class="auth-main">
      <v-container  class="auth-container">
        <div class="brand-section">
          <!-- mudar para nossa logo -->
          <v-icon size="80" color="white" class="mb-4">$vuetify</v-icon>

          <h1 class="text-h4 text-white font-weight-bold mb-2">
            Gastação
          </h1>

        </div>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style scoped>
.auth-main {
/* TODO:  lembrar de mudar para cores que vai jogar no trello */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.brand-section {
  text-align: center;
  margin-bottom: 10px;
  flex-shrink: 0;
}
</style>