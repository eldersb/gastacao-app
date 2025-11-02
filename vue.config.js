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
    icons: [
      {
        src: './img/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: './img/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      },
      {
        src: './img/icons/android-chrome-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: './img/icons/android-chrome-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
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
              maxAgeSeconds: 2592000 // 30 dias
            }
          }
        }
      ]
    }
  }
})