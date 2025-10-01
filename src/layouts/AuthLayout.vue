<template>
  <v-app>
    <v-main class="auth-main">
      <v-container  class="auth-container">
        <div class="brand-section">
          <img class="logo" src="@/assets/logo.png">
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

<style scoped lang="scss">
@import "@/assets/styles/main.scss";

.auth-main {
  background: linear-gradient(135deg, $color-primary 0%, $color-secondary 100%);
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

.logo{
  max-width: 250px;
  max-height: 250px;
}
</style>