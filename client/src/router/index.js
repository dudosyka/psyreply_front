import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView";
import BirdGameView from "@/views/BirdGameView";
import ClickGameView from "@/views/ClickGameView";

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/:view/:token',
    component: HomeView,
  },
  {
    path: "/game/check/view",
    component: BirdGameView,
  },
  {
    path: "/second/game/check/view",
    component: ClickGameView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
