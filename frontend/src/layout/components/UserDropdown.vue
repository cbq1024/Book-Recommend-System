<template>
    <div class="relative">
        <button @click="toggleMenu" class="flex items-center space-x-2 focus:outline-none group">
            <img :src="user.avatar" :alt="user.username" class="h-7 w-7 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-500 transition-colors duration-200">
            <span class="hidden sm:flex sm:items-center sm:space-x-2">
                <span class="text-sm text-gray-800 dark:text-gray-200 font-medium">{{ user.username }}</span>
                <Tag :color="user.role === 'admin' ? 'red' : 'green'">
                    {{ user.role === 'admin' ? '管理员' : '读者' }}
                </Tag>
            </span>
            <i class="fas fa-chevron-down text-gray-500 dark:text-gray-400 text-xs transition-transform duration-200" :class="{ 'rotate-180': isOpen }"></i>
        </button>

        <TransitionRoot appear :show="isOpen">
            <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-dark ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 dark:divide-gray-700">
                <div class="px-4 py-3 bg-gray-50 dark:bg-dark">
                    <div class="flex items-center space-x-2">
                    </div>
                    <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ user.email }}</p>
                </div>
                <div class="py-1">
                    <UserMenuItem 
                        v-for="item in menuItems" 
                        :key="item.path" 
                        v-bind="item" 
                        @click="closeMenu"
                    />
                </div>
                <div class="py-1">
                    <a href="#" @click.prevent="onLogout" class="group flex items-center px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <i class="fas fa-sign-out-alt mr-3"></i>
                        退出登录
                    </a>
                </div>
            </div>
        </TransitionRoot>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { TransitionRoot } from '@headlessui/vue'
import type { MenuItem, UserInfo } from '../types/navbar'
import UserMenuItem from './UserMenuItem.vue'
import Tag from './Tag.vue'

const props = defineProps<{
    user: UserInfo
    menuItems: MenuItem[]
}>()

const emit = defineEmits<{
    (e: 'logout'): void
}>()

const router = useRouter()
const isOpen = ref(false)

// 关闭菜单
const closeMenu = () => {
    isOpen.value = false
}

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

const onLogout = () => {
    closeMenu()
    emit('logout')
}

// 监听路由变化
const unwatch = router.afterEach(() => {
    closeMenu()
})

// 点击外部关闭菜单
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
        closeMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    unwatch() // 清理路由监听
})
</script> 
