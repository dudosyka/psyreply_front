// Composables
import { createRouter, createWebHistory } from 'vue-router'
import {nextTick} from "vue";

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        meta: { needAuth: true }
      },
      {
        path: '/auth',
        name: 'Authorization',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Auth.vue'),
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.needAuth && !localStorage.getItem('token')) {
//     //window.location.href = "https://psyreply.com";
//   }
//   return next()
// })

const DEFAULT_TITLE = 'Reply | Chat'

router.afterEach((to,from) => {
  nextTick(() => {
    document.title = `${to.meta.title || DEFAULT_TITLE}`;
  })
})


export default router
