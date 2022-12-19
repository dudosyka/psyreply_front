import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/api/admin/Auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView'),
    meta: { requiresAuth: false }
  },
  {
    path: '/block',
    name: 'block',
    component: () => import('@/views/BlockView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/TestView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/company',
    name: 'company',
    component: () => import('@/views/CompanyView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/results',
    name: 'results',
    component: () => import('@/views/ResultsView'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (!Admin.checkAuth() && to.meta.requiresAuth) {
    return {
      path: '/',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
