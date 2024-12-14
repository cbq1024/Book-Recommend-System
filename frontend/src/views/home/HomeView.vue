<template>
    <div class="min-h-screen bg-gray-50 dark:bg-dark-100">
        <!-- 顶部欢迎区域 -->
        <section class="relative bg-gradient-to-r from-primary-400 to-primary-600 dark:from-dark-200 dark:to-dark-300">
            <div class="container mx-auto px-6 py-20">
                <div class="flex flex-col items-center text-center">
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 opacity-0 animate-title">  <!-- 添加 opacity-0 和 animate-title -->
                        智能图书推荐系统
                    </h1>
                    <p class="text-xl text-blue-50 mb-8 opacity-0 animate-subtitle">  <!-- 添加 opacity-0 和 animate-subtitle -->
                        发现你的专属阅读世界
                    </p>
                    <!-- 搜索框 -->
                    <div class="w-full max-w-2xl relative animate-fade-in-up">
                        <input
                            type="text"
                            placeholder="搜索书籍、作者或类别..."
                            class="w-full px-6 py-4 rounded-full bg-white/95 dark:bg-dark-400 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-lg transition-all duration-300 hover:shadow-xl"
                        />
                        <button class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white p-2.5 rounded-full hover:bg-primary-600 transition-all duration-300 hover:scale-105">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    <!-- 快速开始按钮 -->
                    <div class="mt-12 animate-bounce-slow">
                        <button
                            @click="startExplore"
                            class="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-500 rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                            <span class="relative flex items-center">
                开始探索
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- 装饰性波浪效果 -->
            <div class="absolute bottom-0 left-0 right-0 overflow-hidden">
                <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g class="parallax">
                        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                        <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </section>

        <!-- 快速访问功能区 -->
        <section class="py-6" ref="featuresSection">
            <div class="container mx-auto px-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- 个性化推荐 -->
                    <div class="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center mb-4">
                            <div class="p-3 bg-primary-100 dark:bg-dark-400 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 class="ml-4 text-lg font-semibold text-gray-800 dark:text-white">个性化推荐</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            基于您的阅读历史和偏好，为您推荐最适合的图书
                        </p>
                        <router-link
                            to="/recommend"
                            class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline group"
                        >
                            开始探索
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </router-link>
                    </div>

                    <!-- 分类浏览 -->
                    <div class="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center mb-4">
                            <div class="p-3 bg-primary-100 dark:bg-dark-400 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 class="ml-4 text-lg font-semibold text-gray-800 dark:text-white">分类浏览</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            按照不同类别浏览图书，轻松找到感兴趣的领域
                        </p>
                        <router-link
                            to="/categories"
                            class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline group"
                        >
                            查看分类
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </router-link>
                    </div>

                    <!-- 我的收藏 -->
                    <div class="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div class="flex items-center mb-4">
                            <div class="p-3 bg-primary-100 dark:bg-dark-400 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 class="ml-4 text-lg font-semibold text-gray-800 dark:text-white">我的收藏</h3>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                            查看您收藏的图书，随时回顾您感兴趣的内容
                        </p>
                        <router-link
                            to="/favorites"
                            class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline group"
                        >
                            查看收藏
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const featuresSection = ref<HTMLElement | null>(null)

const startExplore = () => {
    featuresSection.value?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}
</script>

<style scoped>
/* 波浪动画 */
.waves {
    position: relative;
    width: 100%;
    height: 15vh;
    margin-bottom: -7px;
    min-height: 100px;
    max-height: 150px;
}

.parallax > use {
    animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
}
.parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}
.parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}
.parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}
.parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}

@keyframes move-forever {
    0% {
        transform: translate3d(-90px,0,0);
    }
    100% {
        transform: translate3d(85px,0,0);
    }
}

/* 自定义动画 */
.animate-fade-in {
    animation: fadeIn 1s ease-out;
}

.animate-slide-up {
    animation: slideUp 0.8s ease-out;
}

.animate-fade-in-up {
    animation: fadeInUp 1s ease-out;
}

.animate-bounce-slow {
    animation: bounceSlow 2s infinite;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes bounceSlow {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}
.animate-title {
    animation: titleAnimation 1s ease-out forwards;
    animation-delay: 0.2s;
}

.animate-subtitle {
    animation: subtitleAnimation 1s ease-out forwards;
    animation-delay: 0.8s;
}

@keyframes titleAnimation {
    0% {
        opacity: 0;
        transform: translateY(-20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes subtitleAnimation {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
/* 响应式调整 */
@media (max-width: 768px) {
    .waves {
        height: 40px;
        min-height: 40px;
    }
}
</style>
