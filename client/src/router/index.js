import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView";
import MainView from "@/views/MainView.vue";
import {Auth} from "@/api/Authorization/Auth";

const routes = [
    {
        path: '/',
        component: HomeView,
        meta: {requireAuth: false}
    },
    {
        path: '/:view/:token',
        component: MainView,
        meta: {requireAuth: false}
    },
    {
        path: '/signup/:telegramId/:botId',
        name: 'signup',
        component: HomeView,
        meta: {requireAuth: false}
    },
    {
        path: '/login/:telegramId/:botId',
        name: 'login',
        component: HomeView,
        meta: {requireAuth: false}
    },
    {
        path: '/profile/:telegramId/:botId',
        name: 'profile',
        component: HomeView,
        meta: {requireAuth: true}
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const auth = new Auth()
router.beforeEach( (to, from) => {
    if (!auth.checkAuth && to.meta.requireAuth)
        return {name: 'signup'}
})

export default router
