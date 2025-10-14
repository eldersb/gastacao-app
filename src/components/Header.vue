<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center justify-space-between w-100 px-4">
      <div class="d-flex align-center">
      <v-avatar size="55">
        <v-img
            v-if="!isProfilePage"
            :src="userStore.avatarUrl"
            alt="Foto do usuário"
            cover
        />
      </v-avatar>

      <v-toolbar-title class="text-h6 ms-3">
        GastaçãoApp
      </v-toolbar-title>
    </div>

      <v-btn
          icon
          variant="text"
          color="white"
          @click="dialog = true"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="text-h6">
              Confirmar Logout
            </v-card-title>

            <v-card-text>
              Tem certeza que deseja sair da sua conta?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" color="primary" @click="dialog = false" :disabled="loading">Cancelar</v-btn>
              <v-btn variant="tonal" color="red" @click="logout">Sair</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </div>
  </v-app-bar>
</template>

<script>
import {useUserStore} from '@/stores/userStore';
import {authService} from "@/services/authService";

export default {
  name: "AppHeader",
  data() {
    return {
      userStore: useUserStore(),
      dialog: false,
      loading: false,

    };
  },
  computed: {
    isProfilePage() {
      return this.$route.name === 'Profile'
    }
  },
  methods: {
     async logout() {
      if (this.loading) return;
      this.loading = true;

      try {
        await authService.logout();
        this.dialog = false;
        await this.$nextTick();
        this.$router.push({ name: 'Login' });
      } catch (err) {
        console.error('Erro no logout', err);
        
      } finally {
        this.loading = false;
      }
    }
  }

};
</script>
