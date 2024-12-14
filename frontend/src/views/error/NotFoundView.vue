<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-dark-100 dark:to-dark-300 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 text-center">
      <!-- 404数字动画 -->
      <div class="relative">
        <h1 class="text-9xl font-bold text-gray-200/50 dark:text-dark-400 animate-bounce">
          404
        </h1>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="text-6xl text-primary-600 dark:text-primary-500 animate-pulse">
            😅
          </span>
        </div>
      </div>
      
      <!-- 错误信息 -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          抱歉，页面未找到
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          您访问的页面可能已被移除、名称已更改或暂时无法使用
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
        <router-link 
          to="/" 
          class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 transition-colors duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          返回首页
        </router-link>
        
        <router-link 
          to="/books" 
          class="px-6 py-3 border border-gray-300 dark:border-dark-300 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-200 transition-colors duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
          </svg>
          浏览图书
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  document.title = '404 - 页面未找到'
})
</script> 