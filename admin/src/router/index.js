import { createRouter, createWebHistory } from 'vue-router'
import Admin from '@/api/admin/Auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/LoginView'),
    meta: { requiresAuth: false, authPage: true }
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/ForgetPassView.vue'),
    meta: { requiresAuth: false, authPage: true }
  },
  {
    path: '/forget/code',
    name: 'forgetcode',
    component: () => import('@/views/ForgetPassCodeView.vue'),
    meta: { requiresAuth: false, authPage: true }
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('@/views/RegView.vue'),
    meta: { requiresAuth: false, authPage: true }
  },
  {
    path: '/block:after(.*)',
    name: 'block',
    component: () => import('@/views/BlockView'),
    meta: { requiresAuth: true, authPage: false }
  },
  {
    path: '/users:after(.*)',
    name: 'users',
    component: () => import('@/views/UsersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/test:after(.*)',
    name: 'test',
    component: () => import('@/views/TestView'),
    meta: { requiresAuth: true, authPage: false }
  },
  {
    path: '/results:after(.*)',
    name: 'results',
    component: () => import('@/views/ResultsView'),
    meta: { requiresAuth: true }
  },
  {
    path: '/distribution:after(.*)',
    name: 'mailing',
    component: () => import('@/views/MailingView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (!Admin.checkAuth() && to.meta.requiresAuth) {
    return {
      path: '/',
      query: {redirect: to.fullPath}
    }
  }
  if (Admin.checkAuth() && to.meta.authPage) {
    return {
      path: "/block"
    }
  }
})

export default router
