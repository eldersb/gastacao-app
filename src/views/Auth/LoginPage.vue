<template>
  <div class="login-container">
    <SplashAnimation v-if="splashVisivel" ref="splash" />
    <v-card class="login-card" elevation="12" rounded="xl">
      <v-card-title>Login</v-card-title>

      <v-card-subtitle>
        Faça login para ver e compartilhar memes incríveis.
      </v-card-subtitle>

      <v-card-text class="pa-6">


        <v-form ref="form" v-model="valid" @submit.prevent="handleLogin">
          <v-text-field v-model="email" label="E-mail" type="email" prepend-inner-icon="mdi-email" variant="outlined"
            :rules="emailRules" class="mb-3" density="comfortable" required />

          <v-text-field v-model="password" label="Senha" :type="showPassword ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock" :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="showPassword = !showPassword" variant="outlined" :rules="passwordRules" class="mb-3"
            density="comfortable" required />
          <v-btn variant="text" color="secondary" block class="text-none mb-4" @click="$router.push({ name: 'Reset' })">
            Esqueci minha senha
          </v-btn>

          <v-alert v-if="errorMessage" type="error" variant="tonal" border="start" class="mb-4">
            {{ errorMessage }}
          </v-alert>

          <v-btn type="submit" color="primary" size="x-large" block class="mb-4 text-none" :loading="loading"
            :disabled="!valid" elevation="2">
            Entrar
          </v-btn>


          <div class="text-center mt-6">
            <p class="text-body-2 text-grey mb-3">
              Não tem uma conta?
            </p>
            <v-btn variant="outlined" color="primary" size="large" block class="text-none"
              @click="$router.push({ name: 'Register' })">
              Criar Conta
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { authService } from "@/services/authService";
import { emailRules, passwordRules } from "@/utils/rules";
import { useUserStore } from "@/stores/userStore";
import SplashAnimation from "@/components/Splash.vue";
import Splash from "@/components/Splash.vue";


export default {
  name: "LoginPage",
  components: {
    SplashAnimation,
  },
  data() {
    return {
      splashVisivel:false,
      valid: false,
      loading: false,
      email: "",
      password: "",
      showPassword: false,
      emailRules,
      passwordRules,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
  const { valid } = await this.$refs.form.validate();
  this.errorMessage = "";

  if (valid) {
    this.loading = true;

    try {
      const userStore = useUserStore();
      const user = await authService.login(this.email, this.password);
      userStore.setUser(user);

      this.splashVisivel = true;
      setTimeout(() => {
        this.splashVisivel = false;
        this.$router.push({ name: "Home" });
      }, 7000); 

    } catch (erro) {
      this.errorMessage = "Usuário ou senha inválidos. Verifique e tente novamente.";
      this.loading = false;
      console.log(erro);
    }
  }
}

  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.login-card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: white;
}

.v-card-title {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  color: #333;
}

.v-card-subtitle {
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
  color: #666;
  margin-bottom: 24px;
}
</style>
