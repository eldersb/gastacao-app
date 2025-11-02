const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;`
      }
    }
  },
  pwa: {
    name: 'Gastação App',
    shortName: 'Gastação',
    description: 'Rede social de memes',
    themeColor: '#396b8a',
    backgroundColor: '#fcfdfc',
    display: 'standalone',
    orientation: 'portrait',
    startUrl: '/',
    
    // Configuração dos favicons
    iconPaths: {
      faviconSVG: 'favicon.svg',
      favicon32: 'img/icons/favicon-96x96.png',
      favicon16: 'img/icons/favicon-96x96.png',
      appleTouchIcon: 'img/icons/apple-touch-icon.png',
      maskIcon: 'favicon.svg',
      msTileImage: 'img/icons/android-chrome-512x512.png'
    },
    
    // Ícones do manifest
    manifestOptions: {
      icons: [
        {
          src: './img/icons/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: './img/icons/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\./,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 300
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'image-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 2592000
            }
          }
        }
      ]
    }
  }
})