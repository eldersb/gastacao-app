<template>
  <v-container class="mt-10">
    <v-card class="pa-5" elevation="3">

      <v-card-title class="text-h5 text-center">
        Perfil do Usuário
      </v-card-title>

      <div class="d-flex justify-center">
        <v-avatar size="100">
          <v-img
              :src="userStore.avatarUrl"
              alt="Foto do usuário"
          />
        </v-avatar>
      </div>

      <v-card-text>
        <v-list lines="one">
          <v-list-item>
            <v-list-item-title>Nome</v-list-item-title>
            <v-list-item-subtitle>{{ userStore.name }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ userStore.email }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn color="error" @click="logout" variant="elevated">
          <v-icon start>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import {useUserStore} from '@/stores/userStore';
import {authService} from "@/services/authService";

export default {
  name: "ProfilePage",

  data() {
    return {
      userStore: useUserStore()
    }
  },
  methods: {
    logout() {
      authService.logout()
      this.$router.push({name: 'Login'});
    }
  }
}
</script>

