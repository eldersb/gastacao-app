// src/registerServiceWorker.js
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log('App está sendo servido do cache pelo service worker.')
    },
    registered() {
      console.log('Service worker registrado.')
    },
    cached() {
      console.log('Conteúdo foi armazenado em cache para uso offline.')
    },
    updatefound() {
      console.log('Novo conteúdo está sendo baixado.')
    },
    updated(registration) {
      console.log('Novo conteúdo disponível; por favor, atualize.')
      if (confirm('Nova versão disponível! Deseja atualizar?')) {
        registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
        window.location.reload()
      }
    },
    offline() {
      console.log('Sem conexão com a internet. App rodando em modo offline.')
    },
    error(error) {
      console.error('Erro durante o registro do service worker:', error)
    }
  })
}