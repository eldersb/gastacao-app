export const nameRules = [
    v => !!v || "Nome é obrigatório",
    v => v.length >= 3 || "Nome deve ter pelo menos 3 caracteres",
];

export const emailRules = [
    v => !!v || "E-mail é obrigatório",
    v => /.+@.+\..+/.test(v) || "E-mail deve ser válido",
];

export const passwordRules = [
    v => !!v || "Senha é obrigatória",
    v => v.length >= 6 || "Senha deve ter pelo menos 6 caracteres",
];

export const confirmPasswordRules = (password) => [
    v => !!v || "Confirme sua senha",
    v => v === password || "As senhas não conferem",
];
