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
    path: '/block:after(.*)',
    name: 'block',
    component: () => import('@/views/BlockView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test:after(.*)',
    name: 'test',
    component: () => import('@/views/TestView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/company:after(.*)',
    name: 'company',
    component: () => import('@/views/CompanyView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/results:after(.*)',
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
