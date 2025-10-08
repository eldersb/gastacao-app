<template>
  <v-app-bar app color="primary" dark>
    <div class="d-flex align-center justify-space-between w-100 px-4">
      <v-avatar size="55">
        <v-img
            v-if="!isProfilePage"
            :src="userStore.avatarUrl"
            alt="Foto do usuário"
            cover
        />
      </v-avatar>

      <v-toolbar-title class="text-h6 text-center flex-grow-1">
        Gastação
      </v-toolbar-title>

      <div style="width:44px"></div>
    </div>
  </v-app-bar>
</template>

<script>
import {useUserStore} from '@/stores/userStore';

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
  }

};
</script>
