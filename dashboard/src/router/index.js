import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogInView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
