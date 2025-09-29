<template>
  <v-card max-width="400" class="pa-5" elevation="6">
    <v-card-title class="text-h5">Login</v-card-title>
    <v-card-text>
      <p>Tela de login de teste</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$router.push('/cadastro')">Ir para Cadastro</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'LoginPage'
}
</script>
