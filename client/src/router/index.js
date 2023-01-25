import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView";

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/:view/:token',
    component: HomeView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
