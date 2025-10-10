<template>
  <v-dialog v-model="internalDialog" max-width="400">
    <v-card>
      <v-card-title class="text-center" :class="success ? 'text-green' : 'text-red'">
        <v-icon :color="success ? 'green' : 'red'" class="mr-2">
          {{ success ? 'mdi-check-circle' : 'mdi-alert-circle' }}
        </v-icon>
        {{ success ? 'Sucesso' : 'Erro' }}
      </v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="close">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogMessage",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    },
    success: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    }
  }
};
</script>