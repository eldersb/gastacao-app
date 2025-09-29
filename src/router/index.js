import { createRouter, createWebHistory } from 'vue-router'


import LayoutBase from '@/views/LayoutBase.vue' 
import LoginPage from '@/views/Auth/LoginPage.vue'
import RegisterPage from '@/views/Auth/RegisterPage.vue'
import ProfilePage from '@/views/ProfilePage.vue' 
import AddMeme from '@/views/AddMeme.vue' 

const routes = [
  { path: '/', name: 'Home', component: LayoutBase },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/cadastro', name: 'Register', component: RegisterPage },
  { path: '/perfil', name: 'Profile', component: () => import('@/views/ProfilePage.vue')  },
  {path : '/adicionar', name: 'AddMeme', component: () => import('@/views/AddMeme.vue')   }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
