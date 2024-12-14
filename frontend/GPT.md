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

这是当前样式

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#171718',
                    100: '#1c1c1d',
                    200: '#212122',
                    300: '#2a2a2b',
                    400: '#323233',
                },
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                secondary: {
                    DEFAULT: '#10B981',
                },
            },
            backgroundImage: {
                'dark-gradient': 'linear-gradient(to bottom, #171718, #1c1c1d)',
            },
            boxShadow: {
                'dark-nav': '0 2px 4px rgba(0,0,0,0.2)',
                'dark-card': '0 4px 6px -1px rgba(0,0,0,0.2)',
            },
            scale: {
                '102': '1.02',
            },
            animation: {
                'scroll': 'scroll 20s linear infinite',
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-in': 'slide-in 0.3s ease-out',
                'tag-pop': 'tag-pop 0.3s ease-out',
            },
            keyframes: {
                scroll: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' }
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slide-in': {
                    '0%': { transform: 'translateX(-20px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'tag-pop': {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '50%': { transform: 'scale(1.02)' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            spacing: {
                'card': '1.25rem',
                'section': '2rem',
            },
            borderRadius: {
                'card': '0.75rem',
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('tailwind-scrollbar'),
    ],
}
```

接下来为其创建 完善图书页面相关组件 NotFoundView.vue，并使用 TailwindCSS 进行样式设计，请提供代码。
