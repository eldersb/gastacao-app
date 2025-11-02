<template>
  <v-bottom-navigation 
    grow 
    app 
    height="64" 
    style="background-color: #1c5a81"
    active-color="white"
    inactive-color="white"
  >
    <v-btn 
      icon 
      :to="{ name: 'Home' }" 
      exact
      :disabled="$route.name === 'Home'"
    >
      <v-icon color="white">mdi-home</v-icon>
    </v-btn>
    
    <v-btn 
      icon 
      :to="{ name: 'AddMeme' }"
      :disabled="$route.name === 'AddMeme'"
    >
      <v-icon color="white">mdi-plus-circle</v-icon>
    </v-btn>
    
    <v-btn 
      icon 
      :to="{ name: 'Profile' }"
      :disabled="$route.name === 'Profile'"
    >
      <v-icon color="white">mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>