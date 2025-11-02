<template>
  <v-container class="d-flex justify-center pt-2">
    <v-card class="pa-0 profile-card rounded-xl" elevation="5">
      
      <div class="profile-header-bg"></div> 

      <div class="text-center profile-content">
        
        <v-avatar size="100" class="profile-avatar mb-3">
          <v-img
              :src="userAvatar"
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
            
            <div class="mb-6 d-flex align-center justify-space-between">
                <p class="text-subtitle-1 font-weight-bold text--darken-2 mb-0">
                    <v-icon start color="#1c5a81">mdi-theme-light-dark</v-icon>
                    Modo Noturno
                </p>
                <v-switch
                  :model-value="isDarkTheme"
                  @update:model-value="toggleTheme"
                  color="#1c5a81"
                  hide-details
                  inset
                  density="compact"
                ></v-switch>
            </div>
            </div>
        
        <v-card-actions class="pa-4 pt-0">
          <v-btn 
            color="error" 
            @click="dialog = true" 
            variant="elevated" 
            block 
            size="large"
            :loading="loading"
          > 
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
        
        <v-card-text class="text-center py-4">
          <v-img 
            :src="sadLaeleImage" 
            alt="Personagem triste" 
            max-height="120" 
            max-width="120"
            class="mx-auto"
          ></v-img>
        </v-card-text>
        <v-card-text>
          Tem certeza que deseja sair da sua conta?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" color="primary" @click="dialog = false" :disabled="loading">Cancelar</v-btn>
          <v-btn variant="tonal" color="error" @click="confirmLogout" :loading="loading">Sair</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import {useUserStore} from '@/stores/userStore';
import {authService} from "@/services/authService";
import sadLaeleImage from '@/assets/Laele-sad.png'; 
import { useTheme } from 'vuetify'; 
import {getAvatarById} from '@/utils/avatars';

export default {
  name: "ProfilePage",
  
  setup() {
    const theme = useTheme();
    return {
      theme,
    };
  },

  data() {
    return {
      userStore: useUserStore(),
      dialog: false, 
      loading: false, 
      sadLaeleImage: sadLaeleImage, 
    }
  },
  
  computed: {
    isDarkTheme() {
      return this.theme.global.current.value.dark;
    },
    userAvatar() {
      if (this.userStore.avatarUrl) {
        return this.userStore.avatarUrl;
      }
      return getAvatarById(7);
    }
  },

  methods: {
    toggleTheme() {
      this.theme.global.name.value = this.isDarkTheme ? 'light' : 'dark';
    },

    async confirmLogout() {
      if (this.loading) return;
      this.loading = true;

      try {
        await authService.logout();
        this.dialog = false; 
        this.$router.push({name: 'Login'});
      } catch (error) {
        console.error('Erro ao sair da conta:', error);
      } finally {
        this.loading = false; 
      }
    }
  }
}
</script>

<style scoped>

.profile-card {
    max-width: 400px;
    width: 100%;
    margin-bottom: 20px; 
    max-height: 450px;
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