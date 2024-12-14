<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        登录您的账号
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        或者
        <router-link
          :to="{ name: 'register' }"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          注册新账号
        </router-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-dark-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <!-- 登录表单 -->
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              用户名/邮箱
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="formData.username"
                name="email"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-300 dark:text-white"
                :class="{ 'border-red-500': errors.username }"
              />
              <p v-if="errors.username" class="mt-2 text-sm text-red-600">{{ errors.username }}</p>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              密码
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="formData.password"
                name="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-300 dark:text-white"
                :class="{ 'border-red-500': errors.password }"
              />
              <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="formData.rememberMe"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                记住我
              </label>
            </div>

            <div class="text-sm">
              <router-link
                :to="{ name: 'forgot-password' }"
                class="font-medium text-primary-600 hover:text-primary-500"
              >
                忘记密码？
              </router-link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <span v-if="loading" class="mr-2">
                <!-- 加载动画 -->
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </div>
        </form>

        <!-- 分割线 -->
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-dark-200 text-gray-500">
                其他登录方式
              </span>
            </div>
          </div>

          <!-- 第三方登录按钮 -->
          <div class="mt-6 grid grid-cols-2 gap-3">
            <button
              @click="handleSocialLogin('wechat')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-300 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400"
            >
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <!-- WeChat icon -->
                <path d="M8.691 2C4.768 2 1.583 4.664 1.583 7.972c0 1.86 1.021 3.557 2.64 4.74L3.39 14.87c-.101.296.016.618.29.796.274.179.629.179.903 0l3.269-1.858c1.005.28 2.087.434 3.215.434 4.79 0 8.679-2.995 8.679-6.694C19.746 4.664 16.561 2 12.638 2H8.691zm13.726 10.321c0-1.438-.79-2.756-2.073-3.704l.672-2.013c.102-.305-.024-.64-.31-.821-.285-.182-.654-.171-.927.027l-2.426 1.747c-.789-.217-1.632-.335-2.507-.335-3.768 0-6.825 2.259-6.825 5.044 0 2.786 3.057 5.044 6.825 5.044 3.768 0 6.825-2.258 6.825-5.044l-.001.001z"/>
              </svg>
              <span class="ml-2">微信登录</span>
            </button>

            <button
              @click="handleSocialLogin('github')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-300 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <!-- GitHub icon -->
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/>
              </svg>
              <span class="ml-2">GitHub</span>
            </button>

            <button
              @click="handleSocialLogin('gitee')"
              class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-dark-300 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-400"
            >
              <svg class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                <!-- Gitee icon -->
                <path d="M11.984 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0h-.016zm6.09 5.333c.328 0 .593.266.593.593v1.482a.594.594 0 0 1-.593.593H9.777c-.982 0-1.778.796-1.778 1.778v5.63c0 .327.266.593.593.593h8.889a.594.594 0 0 1 .593.593v1.481a.594.594 0 0 1-.593.593h-8.89a.594.594 0 0 0-.592.593v1.482c0 .327.266.593.593.593h8.889a.594.594 0 0 1 .593.593v1.481a.594.594 0 0 1-.593.593H8.592A3.594 3.594 0 0 1 5 18.667V7.778a3.594 3.594 0 0 1 3.592-3.593h8.889z"/>
              </svg>
              <span class="ml-2">Gitee</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)

const formData = reactive({
  username: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  // 重置错误
  errors.username = ''
  errors.password = ''

  // 表单验证
  if (!formData.username) {
    errors.username = '请输入用户名或邮箱'
    return
  }
  if (!formData.password) {
    errors.password = '请输入密码'
    return
  }

  try {
    loading.value = true
    // TODO: 实现登录逻辑
    // const response = await login(formData)
    
    // 模拟登录成功
    localStorage.setItem('token', 'dummy-token')
    
    // 获取重定向地址或默认跳转到首页
    const redirect = router.currentRoute.value.query.redirect as string || '/'
    router.push(redirect)
  } catch (error: any) {
    // 处理登录错误
    if (error.response?.data?.message) {
      errors.username = error.response.data.message
    } else {
      errors.username = '登录失败，请稍后重试'
    }
  } finally {
    loading.value = false
  }
}

const handleSocialLogin = (platform: 'wechat' | 'github' | 'gitee') => {
  // TODO: 实现第三方登录逻辑
  console.log(`Initiating ${platform} login...`)
}
</script> 