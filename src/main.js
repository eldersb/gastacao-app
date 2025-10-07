import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import "@/assets/styles/main.scss";

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#396b8a',
          secondary: '#62beda',
          accent: '#ace2f4',
          background: '#fcfdfc',
          warning: '#e69055',
          info: '#f5cc8d',
        }
      }
    }
  }
})
createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app')
