import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#396b8a',   // Azul escuro
          secondary: '#62beda', // Verde água
          accent: '#ace2f4',    // Azul claro
          background: '#fcfdfc',// Branco quase puro
          warning: '#e69055',   // Laranja areia
          info: '#f5cc8d',      // Bege claro
        }
      }
    }
  }
})
createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
