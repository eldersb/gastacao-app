<template>
  <v-container class="mt-10">
    <v-card class="pa-5" elevation="3">

      <v-card-title class="text-h5 text-center">
        Perfil do Usuário
      </v-card-title>

      <div class="d-flex justify-center">
        <v-avatar size="100">
          <v-img
              :src="avatarUrl"
              alt="Foto do usuário"
          />
        </v-avatar>
      </div>

      <v-card-text>
        <v-list lines="one">
          <v-list-item>
            <v-list-item-title>Nome</v-list-item-title>
            <v-list-item-subtitle>{{ user.name }}</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Email</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
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
import {getAvatarById} from "@/utils/avatars";

export default {
  name: "ProfilePage",
  data() {
    return {
      user: {
        name: "mock da Silva",
        email: "mock.silva@example.com",
        avatar: 3
      }
    };
  },
  computed: {
    avatarUrl() {
      const avatar = getAvatarById(this.user.avatar);
      return avatar ? avatar.src : null;
    }
  }
};
</script>

