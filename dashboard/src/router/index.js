import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogInView from '../views/LogInView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LogInView,
    meta: { share_endpoint: false, authorization_required: false }
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { share_endpoint: false, authorization_required: true }
  },
  {
    path: '/share/:token',
    name: 'share_endpoint',
    component: LogInView,
    meta: { share_endpoint: true, authorization_required: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.authorization_required && !localStorage.getItem('token')) {
    return {
      path: '/'
    }
  }
  if (to.meta.share_endpoint) {
    localStorage.setItem('token', to.params.token);
    localStorage.setItem('parted', true);
    return {
      path: '/home'
    }
  }
})

export default router
