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
          @click="logout"
        >
          <v-icon>mdi-logout</v-icon>
        </v-btn>
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
      userStore: useUserStore()
    };
  },
  computed: {
    isProfilePage() {
      return this.$route.name === 'Profile'
    }
  },
  methods: {
    logout() {
      authService.logout();
      this.$router.push({ name: 'Login' });
    }
  }

};
</script>
