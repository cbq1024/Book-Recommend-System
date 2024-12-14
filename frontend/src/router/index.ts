import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'
import MainLayout from '@/layout/MainLayout.vue'
import AuthLayout from '@/layout/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        // 图书相关路由
        {
          path: 'books',
          name: 'books',
          component: () => import('@/views/books/BooksView.vue'),
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: () => import('@/views/recommend/RecommendView.vue'),
        },
        // 用户相关路由
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/profile/ProfileView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: () => import('@/views/favorites/FavoritesView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ]
    },
    // 认证相关路由 - 使用独立布局
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/LoginView.vue'),
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/auth/RegisterView.vue'),
          meta: {
            requiresGuest: true,
          },
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('@/views/auth/ForgotPasswordView.vue'),
          meta: {
            requiresGuest: true,
          },
        },
      ]
    },
    // 错误页面
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/error/NotFoundView.vue'),
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  // 需要认证的页面
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ 
      name: 'login', 
      query: { redirect: to.fullPath },
      replace: true 
    })
    return
  }
  
  // 已登录用户不能访问的页面（如登录、注册）
  if (to.meta.requiresGuest && isAuthenticated) {
    next({ 
      name: 'home',
      replace: true 
    })
    return
  }
  
  next()
})

export default router
