<template>
  <div class="register-container">
    <v-card class="register-card" elevation="12" rounded="xl">
      <v-card-title>Registro</v-card-title>

      <v-card-text class="pa-6">
        <v-form ref="form" v-model="valid" @submit.prevent="handleRegister">

          <p class="text-body-1 mb-3">Escolha um avatar</p>
          <v-row>
            <v-col
                v-for="(avatar, index) in avatars"
                :key="index"
                cols="4"
                class="d-flex justify-center mb-6"
            >
              <div
                  class="cursor-pointer"
                  :class="{ 'selected-avatar': selectedAvatarIndex === index }"
                  @click="selectedAvatarIndex = index"
              >
                <v-avatar size="64">
                  <v-img :src="avatar"/>
                </v-avatar>
              </div>
            </v-col>
          </v-row>

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
              :error-messages="emailError ? emailError : []"
              class="mb-3"
              density="comfortable"
              required
              @input="emailError = ''"
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
import {authService} from "@/services/authService";
import {emailRules, passwordRules, confirmPasswordRules, nameRules} from "@/utils/rules";
import {avatars} from "@/utils/avatars";

export default {
  name: 'RegisterPage',
  data() {
    return {
      valid: false,
      loading: false,
      username: '',
      email: '',
      emailError: '',
      password: '',
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      nameRules,
      emailRules,
      passwordRules,
      selectedAvatarIndex: null,
      avatars: avatars
    }
  },
  computed: {
    confirmPasswordRules() {
      return confirmPasswordRules(this.password);
    }
  },
  methods: {
    async handleRegister() {
      const {valid} = await this.$refs.form.validate();

      if (!valid) return;

      if (this.selectedAvatarIndex === null) {
        alert("Selecione um avatar");
        return;
      }

      this.loading = true;

      try {
        const selectedAvatar = this.avatars[this.selectedAvatarIndex].id;
        await authService.register(
            this.email,
            this.password,
            this.username,
            selectedAvatar
        );
        this.$router.push({name: "Login"});
      } catch (erro) {
        console.error(erro);
        this.loading = false;

        if (erro.message?.includes("auth/email-already-in-use")){
          this.emailError = "Este e-mail já está em uso";
        } else {
          this.emailError = '';
        }

      }
    }
  }
};
</script>

<style scoped>
.selected-avatar {
  outline: 4px solid #1976d2;
  outline-offset: 2px;
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(25, 118, 210, 0.5);
}


.cursor-pointer {
  cursor: pointer;
}
</style>