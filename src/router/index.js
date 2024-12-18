import { createRouter, createWebHistory } from 'vue-router'

import client from '@/pocketbase'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
    {
      path: '/chat/:id?',
      name: 'chat',
      meta: { requiresAuth: true },
      component: () => import('../views/ChatView.vue'),
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !client?.authStore.token) {
    return {
      path: '/login',
    }
  }
})

export default router
