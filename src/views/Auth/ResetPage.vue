<template>
    <div class="register-container">
        <v-card class="register-card" elevation="12" rounded="xl">
            <v-card-title>Trocar Senha</v-card-title>

            <v-card-text class="pa-6">
                <v-form ref="form" v-model="valid" @submit.prevent="handleResetPassword">

                    <v-text-field v-model="email" label="E-mail" type="email" prepend-inner-icon="mdi-email"
                        variant="outlined" :rules="emailRules" class="mb-3" density="comfortable" required />

                    <v-btn type="submit" color="primary" size="x-large" block class="mb-4 text-none" :loading="loading"
                        :disabled="!valid" elevation="2">
                        Mudar Senha
                    </v-btn>

                    <div class="text-center mt-6">
                        <p class="text-body-2 text-grey mb-3">Já tem uma conta?</p>
                        <v-btn variant="outlined" color="primary" size="large" block class="text-none"
                            @click="$router.push('/login')">
                            Lembrei da Senha Pivete
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
import { avatars } from "@/utils/avatars";
import router from "@/router";

export default {
    name: 'ResetPage',
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
        async handleResetPassword() {
            this.message = "";
            const { valid } = await this.$refs.form.validate();
            if (!valid) return;

            this.loading = true;
            try {
                await authService.resetPassword(this.email);
                this.message = "E-mail de redefinição enviado! Verifique sua caixa de entrada.";
                this.alertType = "success";
                router.push({ name: "Login" });
            } catch (erro) {
                console.error(erro);
                if (erro.code === "auth/user-not-found") {
                    this.message = "Usuário não encontrado. Verifique o e-mail informado.";
                } else if (erro.code === "auth/invalid-email") {
                    this.message = "Formato de e-mail inválido.";
                } else {
                    this.message = "Ocorreu um erro ao enviar o e-mail. Tente novamente.";
                }
                this.alertType = "error";
            } finally {
                this.loading = false;
                router.push({ name: "Login" });
            }
        },
    },
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