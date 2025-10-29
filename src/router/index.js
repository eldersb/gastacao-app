import {createRouter, createWebHistory} from 'vue-router'
import {authService} from '@/services/authService'

import DefaultLayout from '@/layouts/DefaultLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

import FeedPage from '@/views/FeedPage.vue'
import LoginPage from '@/views/Auth/LoginPage.vue'
import RegisterPage from '@/views/Auth/RegisterPage.vue'
import ProfilePage from '@/views/ProfilePage.vue'
import AddMeme from '@/views/AddMeme.vue'
import ResetPage from '@/views/Auth/ResetPage.vue'

const routes = [
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {path: '', name: 'Home', component: FeedPage},
            {path: 'perfil', name: 'Profile', component: ProfilePage},
            {path: 'adicionar', name: 'AddMeme', component: AddMeme},
        ]
    },
    {
        path: '/',
        component: AuthLayout,
        children: [
            {path: 'login', name: 'Login', component: LoginPage},
            {path: 'cadastro', name: 'Register', component: RegisterPage},
            {path: 'reset', name: 'Reset', component: ResetPage},
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    try {
        const user = await authService.getCurrentUser();

        const publicPages = ['Login', 'Register', 'Reset'];

        if (!publicPages.includes(to.name) && !user) return next({name: 'Login'});
        if (publicPages.includes(to.name) && user) return next({name: 'Home'});
        if (publicPages.includes(to.name) && user) return next({name: 'Reset'});


        return next();
    } catch (error) {
        console.error("Erro de autenticação:", error);

        return next({name: 'Login'});
    }
});


export default router
