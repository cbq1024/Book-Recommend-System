<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
        重置密码
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        输入您的邮箱，我们将向您发送重置密码的链接
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white dark:bg-dark-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              邮箱地址
            </label>
            <div class="mt-1">
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                autocomplete="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm dark:bg-dark-300 dark:text-white"
                :class="{ 'border-red-500': error }"
              />
              <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
            >
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              {{ loading ? '发送中...' : '发送重置链接' }}
            </button>
          </div>
        </form>

        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white dark:bg-dark-200 text-gray-500">
                或者
              </span>
            </div>
          </div>

          <div class="mt-6 flex justify-center space-x-4">
            <router-link
              :to="{ name: 'login' }"
              class="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              返回登录
            </router-link>
            <span class="text-gray-500">|</span>
            <router-link
              :to="{ name: 'register' }"
              class="text-sm font-medium text-primary-600 hover:text-primary-500"
            >
              注册新账号
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const error = ref('')
const loading = ref(false)
const successMessage = ref('')

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    // TODO: 实现发送重置密码邮件的逻辑
    // const response = await sendPasswordResetEmail(email.value)
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    successMessage.value = '重置密码链接已发送到您的邮箱'
    // 可以选择跳转到一个提示页面或者显示成功消息
    router.push({
      name: 'login',
      query: {
        message: '重置密码链接已发送到您的邮箱，请查收'
      }
    })
  } catch (err: any) {
    error.value = err.response?.data?.message || '发送重置链接失败，请稍后重试'
  } finally {
    loading.value = false
  }
}
</script> 
