<template>
    <footer class="min-h-[300px] border-t transition-all duration-300 dark:border-dark-lighter border-gray-200 bg-white dark:bg-dark">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <!-- 关于我们 -->
                <div class="group">
                    <h3 class="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-800 dark:text-gray-200
            transition-transform duration-300 group-hover:translate-x-2 flex items-center">
                        <i class="fas fa-book-open mr-2 text-primary-500"></i>
                        关于我们
                    </h3>
                    <p class="text-base text-gray-600 dark:text-gray-300 transition-all duration-300
            group-hover:text-primary-600 dark:group-hover:text-primary-400 pl-1">
                        优质图书推荐系统致力于为读者提供精选好书推荐，让每个人都能找到适合自己的阅读内容。
                    </p>
                </div>

                <!-- 快速链接 -->
                <div class="group">
                    <h3 class="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                        <i class="fas fa-link mr-2 text-primary-500"></i>
                        快速链接
                    </h3>
                    <ul class="space-y-3">
                        <li class="transform transition-all duration-300 hover:translate-x-2">
                            <router-link
                                to="/"
                                class="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400
                  transition-colors duration-300 flex items-center"
                            >
                                <i class="fas fa-home mr-2 opacity-0 transition-all duration-300 group-hover:opacity-100"></i>
                                首页
                            </router-link>
                        </li>
                        <li class="transform transition-all duration-300 hover:translate-x-2">
                            <router-link
                                to="/favorites"
                                class="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400
                  transition-colors duration-300 flex items-center"
                            >
                                <i class="fas fa-heart mr-2 opacity-0 transition-all duration-300 group-hover:opacity-100"></i>
                                收藏夹
                            </router-link>
                        </li>
                        <li class="transform transition-all duration-300 hover:translate-x-2">
                            <router-link
                                to="/profile"
                                class="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400
                  transition-colors duration-300 flex items-center"
                            >
                                <i class="fas fa-user mr-2 opacity-0 transition-all duration-300 group-hover:opacity-100"></i>
                                个人中心
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- 联系方式 -->
                <div class="group">
                    <h3 class="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                        <i class="fas fa-address-book mr-2 text-primary-500"></i>
                        联系方式
                    </h3>
                    <ul class="space-y-3">
                        <li class="text-base text-gray-600 dark:text-gray-300 transform transition-all duration-300 hover:translate-x-2">
              <span class="flex items-center hover:text-primary-600 dark:hover:text-primary-400">
                <i class="fas fa-envelope mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                support@bookrec.com
              </span>
                        </li>
                        <li class="text-base text-gray-600 dark:text-gray-300 transform transition-all duration-300 hover:translate-x-2">
              <span class="flex items-center hover:text-primary-600 dark:hover:text-primary-400">
                <i class="fas fa-phone mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                400-123-4567
              </span>
                        </li>
                        <li class="text-base text-gray-600 dark:text-gray-300 transform transition-all duration-300 hover:translate-x-2">
              <span class="flex items-center hover:text-primary-600 dark:hover:text-primary-400">
                <i class="fas fa-map-marker-alt mr-2 transition-transform duration-300 group-hover:rotate-12"></i>
                北京市海淀区
              </span>
                        </li>
                    </ul>
                </div>

                <!-- 社交媒体 -->
                <div class="group">
                    <h3 class="text-sm font-semibold tracking-wider uppercase mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                        <i class="fas fa-share-alt mr-2 text-primary-500"></i>
                        关注我们
                    </h3>
                    <div class="flex space-x-6 pl-1">
                        <a
                            href="#"
                            class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400
                transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
                        >
                            <i class="fab fa-weixin text-2xl"></i>
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                微信公众号
              </span>
                        </a>
                        <a
                            href="#"
                            class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400
                transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
                        >
                            <i class="fab fa-weibo text-2xl"></i>
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                官方微博
              </span>
                        </a>
                        <a
                            href="#"
                            class="text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400
                transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 relative group"
                        >
                            <i class="fab fa-github text-2xl"></i>
                            <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                GitHub
              </span>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 版权信息 -->
            <div class="mt-8 pt-8 border-t dark:border-dark-lighter border-gray-200">
                <p class="text-base text-gray-500 dark:text-gray-400 text-center transform transition-all duration-300 hover:scale-105 flex items-center justify-center">
                    <i class="fas fa-copyright mr-2"></i>
                    {{ currentYear }} 优质图书推荐系统. 保留所有权利.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.group:hover i {
    opacity: 1;
}
</style>
