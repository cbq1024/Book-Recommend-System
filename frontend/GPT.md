我正在创建一个 优质图书推荐系统的前端页面这是我使用到的依赖

```shell
"dependencies": {
"@fortawesome/fontawesome-free": "^6.7.1",
"@headlessui/vue": "^1.7.23",
"pinia": "^2.2.6",
"vue": "^3.5.13",
"vue-amazing-ui": "^1.10.4",
"vue-router": "^4.4.5"
},
"devDependencies": {
"@ant-design/icons-vue": "^7.0.1",
"@tailwindcss/aspect-ratio": "^0.4.2",
"@tailwindcss/forms": "^0.5.9",
"@tailwindcss/typography": "^0.5.15",
"@tsconfig/node22": "^22.0.0",
"@types/node": "^22.9.3",
"@vitejs/plugin-vue": "^5.2.1",
"@vitejs/plugin-vue-jsx": "^4.1.1",
"@vue/tsconfig": "^0.7.0",
"autoprefixer": "^10.4.20",
"npm-run-all2": "^7.0.1",
"postcss": "^8.4.49",
"tailwindcss": "^3.4.16",
"typescript": "~5.6.3",
"vite": "^6.0.1",
"vite-plugin-vue-devtools": "^7.6.5",
"vue-tsc": "^2.1.10"
},
"packageManager": "pnpm@9.14.4+sha512.c8180b3fbe4e4bca02c94234717896b5529740a6cbadf19fa78254270403ea2f27d4e1d46a08a0f56c89b63dc8ebfd3ee53326da720273794e6200fcf0d184ab"
```

这是当前路由结构

```shell
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/home/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // 图书相关路由
    {
      path: '/books',
      name: 'books',
      component: () => import('@/views/books/BooksView.vue'),
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('@/views/recommend/RecommendView.vue'),
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/categories/CategoriesView.vue'),
    },
    // 用户相关路由
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: {
        requiresAuth: true, // 需要登录才能访问
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/favorites/FavoritesView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    // 认证相关路由
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        requiresGuest: true, // 已登录用户不能访问
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        requiresGuest: true,
      },
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
  const isAuthenticated = localStorage.getItem('token') // 这里根据你的实际认证方式修改
  
  // 需要认证的页面
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }
  
  // 已登录用户不能访问的页面（如登录、注册）
  if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' })
    return
  }
  
  next()
})

export default router

```

接下来为其创建 完善图书页面相关组件 BooksView.vue，并使用 TailwindCSS 进行样式设计，请提供代码。
