<template>
  <div class="register-container">
    <v-card class="register-card" elevation="12" rounded="xl">
      <v-card-title class="jus">Registro</v-card-title>

      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">
          <v-text-field
              v-model="username"
              label="Nome Completo"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              :rules="nameRules"
              class="mb-3"
              density="comfortable"
              required
          />

          <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              prepend-inner-icon="mdi-email"
              variant="outlined"
              :rules="emailRules"
              class="mb-3"
              density="comfortable"
              required
          />

          <v-text-field
              v-model="password"
              label="Senha"
              :type="showPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              :rules="passwordRules"
              class="mb-3"
              density="comfortable"
              required
          />

          <v-text-field
              v-model="confirmPassword"
              label="Confirmar Senha"
              :type="showConfirmPassword ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-check"
              :append-inner-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
              variant="outlined"
              :rules="confirmPasswordRules"
              class="mb-3"
              density="comfortable"
              required
          />

          <v-btn
              type="submit"
              color="primary"
              size="x-large"
              block
              class="mb-4 text-none"
              :loading="loading"
              :disabled="!valid"
              elevation="2"
          >
            Cadastrar
          </v-btn>

          <div class="text-center mt-6">
            <p class="text-body-2 text-grey mb-3">Já tem uma conta?</p>
            <v-btn
                variant="outlined"
                color="primary"
                size="large"
                block
                class="text-none"
                @click="$router.push('/login')"
            >
              Fazer Login
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { authService } from "@/services/authService";
import { emailRules, passwordRules, confirmPasswordRules, nameRules } from "@/utils/rules";

export default {
  name: 'RegisterPage',
  data() {
    return {
      valid: false,
      loading: false,
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      nameRules,
      emailRules,
      passwordRules,
    }
  },
  computed: {
    confirmPasswordRules() {
      return confirmPasswordRules(this.password);
    }
  },
  methods: {
    async handleRegister() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.loading = true

        try {
          await authService.register(
              this.email,
              this.password,
              this.username
          );
          this.$router.push({ name: "Login" });
        }catch (erro){
          this.loading = false
          console.log(erro)
        }
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
}

.register-card {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: white;
  margin-bottom: 24px;
}

.v-card-title {
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
  color: #333;
}
</style>