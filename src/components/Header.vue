<template>
  <v-app-bar app color="#1c5a81">
    <div class="d-flex align-center w-100 px-4">
      
      <div class="d-flex align-center">
        <v-avatar size="45" @click="goToProfile">
          <v-img v-if="!isProfilePage" :src="userStore.avatarUrl" alt="Foto do usuário" cover />
        </v-avatar>
      </div>

      <v-toolbar-title class="d-flex align-center justify-center ">
        <img 
          src="@/assets/logogasta.png" 
          alt="Logo" 
          style="height:90px; padding-top: 14px; cursor: pointer;" 
          @click="goToHome" 
        />
      </v-toolbar-title>
      
      <div class="d-flex align-center justify-end">
        <v-btn icon variant="text" color="white" @click="dialog = true">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>

      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="text-h6 d-flex align-center">
            <v-icon color="red" class="me-2">mdi-exit-run</v-icon>
            Vai se sair?
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
import { useUserStore } from '@/stores/userStore';
import { authService } from "@/services/authService";

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
      return this.$route.name === 'Profile';
    }
  },

  methods: {
    goToHome() {
      if (this.$route.name !== 'Home') {
        this.$router.push({ name: 'Home' });
      }
    },
    
    goToProfile() {
      if (!this.isProfilePage) {
        this.$router.push({ name: 'Profile' });
      }
    },

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