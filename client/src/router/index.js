import {createRouter, createWebHistory} from 'vue-router'
import HomeView from "@/views/HomeView";
import MainView from "@/views/MainView.vue";

const routes = [
    {
        path: '/',
        component: HomeView,
    },
    {
        path: '/:view/:token',
        component: MainView
    },
    {
        path: '/signup/:telegramId/:botId',
        component: HomeView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
