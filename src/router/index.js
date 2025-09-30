import { createRouter, createWebHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout.vue'

import FeedPage from '@/views/FeedPage.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'
import RegisterPage from '@/views/Auth/RegisterPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import AddMeme from '@/views/AddMeme.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: FeedPage
      },
      {
        path: 'perfil',
        name: 'Profile',
        component: ProfilePage
      },
      { path: 'adicionar',
        name: 'AddMeme',
        component: AddMeme
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/cadastro',
    name: 'Register',
    component: RegisterPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
