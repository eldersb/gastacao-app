<template>
  <v-bottom-navigation
    grow
    app
    height="64"
    style="background-color: #1c5a81"
    active-color="white"
    inactive-color="white"
    active-class="no-router-active">


    <v-btn icon :to="{ name: 'Home' }">
      <v-icon color="white">mdi-home</v-icon>
    </v-btn>

    <v-btn icon :to="{ name: 'AddMeme' }">
      <v-icon color="white">mdi-plus-circle</v-icon>
    </v-btn>

    <v-btn icon :to="{ name: 'Profile' }">
      <v-icon color="white">mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
