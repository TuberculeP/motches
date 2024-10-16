import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import { apiClient } from '@/services/api'
import { useUserStore } from '@/stores/userStore'

const checkAndProvideAuth = async (to, from, next) => {
  const { setUser } = useUserStore()
  try {
    const user = await apiClient.isConnected()
    if (user) {
      setUser(user)
      next()
    } else {
      next('/login')
    }
  } catch (e) {
    console.log(e)
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: checkAndProvideAuth
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      beforeEnter: checkAndProvideAuth
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
