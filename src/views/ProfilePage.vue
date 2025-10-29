<template>
  <v-container class="justify-center pt-2">
    <v-card class="pa-0 profile-card" elevation="5">
      
      <div class="profile-header-bg"></div> 

      <div class="text-center profile-content">
        
        <v-avatar size="100" class="profile-avatar mb-3">
          <v-img
              :src="userStore.avatarUrl"
              alt="Foto do usuário"
              cover
          />
        </v-avatar>
        
        <h4 class="text-h5 font-weight-bold mb-6">{{ userStore.name || 'Usuário' }}</h4>
        
        <v-divider class="mb-4"></v-divider>

        <div class="mb-6 text-left px-4">
            <div class="mb-3">
                <p class="text-subtitle-1 font-weight-bold text--darken-2">
                    <v-icon start color="#1c5a81">mdi-email</v-icon>
                    Email
                </p>
                <p class="text-body-1 ml-6">{{ userStore.email }}</p>
            </div>
        </div>
        
        <v-card-actions class="pa-4 pt-0">
          <v-btn color="error" @click="dialog = true" variant="elevated" block size="large"> 
            <v-icon start>mdi-logout</v-icon>
            Sair da Conta
          </v-btn>
        </v-card-actions>
      </div>
      
    </v-card>

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
          <v-btn variant="text" color="primary" @click="dialog = false">Cancelar</v-btn>
          <v-btn variant="tonal" color="error" @click="confirmLogout">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import {useUserStore} from '@/stores/userStore';
import {authService} from "@/services/authService";

export default {
  name: "ProfilePage",

  data() {
    return {
      userStore: useUserStore(),
      dialog: false, // NOVO: Variável para controlar o modal
      loading: false, // Opcional: Para controlar o estado de loading no botão Sair
    }
  },
  methods: {
    // MUDANÇA: Novo método para executar o logout e fechar o modal
    async confirmLogout() {
      if (this.loading) return;
      this.loading = true; // Ativa o loading

      try {
        await authService.logout();
        this.dialog = false; // Fecha o modal
        this.$router.push({name: 'Login'});
      } catch (error) {
        console.error('Erro ao sair da conta:', error);
      } finally {
        this.loading = false; // Desativa o loading
      }
    }
  }
}
</script>

<style scoped>

.justify-center {
    min-height: calc(100vh - 128px); 
}

.profile-card {
    max-width: 400px;
    width: 100%;
    margin-bottom: 20px; 
}


.profile-header-bg {
    height: 100px;
    background-color: #1c5a81;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    box-shadow: inset 0 -5px 10px rgba(0, 0, 0, 0.1); 
}

.profile-content {
    padding: 16px 0; 
    margin-top: -65px;
}

.profile-avatar {
    border: 5px solid white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>