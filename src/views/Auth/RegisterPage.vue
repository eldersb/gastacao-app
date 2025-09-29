<template>
  <v-card max-width="400" class="pa-5" elevation="6">
    <v-card-title class="text-h5">Cadastro</v-card-title>
    <v-card-text>
      <p>Tela de cadastro de teste</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="$router.push('/login')">Ir para Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RegisterPage'
}
</script>
