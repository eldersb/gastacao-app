<template>

 <v-bottom-navigation grow
      app
      height="64"
      class="bg-primary"
      active-color="white"
      inactive-color="white"
    >
      <v-btn
        icon
        :to="{ name: 'home' }"
      >
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn
        icon
        :to="{ name: 'add' }"
      >
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn
        icon
        :to="{ name: 'profile' }"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>

</template>