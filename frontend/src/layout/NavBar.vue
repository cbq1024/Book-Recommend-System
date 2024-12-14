<template>
    <nav class="bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-14">
                <!-- Logo -->
                <NavLogo />

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-4">
                    <NavLink v-for="link in navigationLinks" :key="link.path" v-bind="link" />
                </div>

                <!-- Right Section -->
                <div class="flex items-center space-x-3">
                    <!-- Theme Toggle -->
                    <button @click="toggleDarkMode" class="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-all duration-300 w-8 h-8 flex items-center justify-center hover:rotate-180">
                        <i :class="isDarkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-lg"></i>
                    </button>

                    <!-- Notifications -->
                    <NavNotification :count="notificationCount" />

                    <!-- User Menu -->
                    <UserDropdown :user="userInfo" :menu-items="menuItems" @logout="handleLogout" />
                </div>

                <!-- Mobile Menu Button -->
                <button @click="toggleMobileMenu" class="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">
                    <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-lg"></i>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation Menu -->
        <TransitionRoot appear :show="isMobileMenuOpen">
            <div class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-dark">
                    <NavLink v-for="link in navigationLinks" :key="link.path" v-bind="link" class="block" @click="isMobileMenuOpen = false" />
                </div>
            </div>
        </TransitionRoot>
    </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import type { NavigationLink, MenuItem, UserInfo } from './types/navbar'
import NavLogo from './components/NavLogo.vue'
import NavLink from './components/NavLink.vue'
import NavNotification from './components/NavNotification.vue'
import UserDropdown from './components/UserDropdown.vue'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const isDarkMode = ref(false)
const notificationCount = ref(3)

// User Info
const userInfo: UserInfo = {
    username: 'Felix',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    email: 'user@example.com',
    role: 'admin'
}

// Navigation Links
const navigationLinks: NavigationLink[] = [
    { path: '/', icon: 'fas fa-home', text: '首页' },
    { path: '/books', icon: 'fas fa-book', text: '图书库' },
    { path: '/recommend', icon: 'fas fa-star', text: '推荐' },
    { path: '/categories', icon: 'fas fa-th-large', text: '分类' }
]

// User Menu Items
const menuItems: MenuItem[] = [
    { path: '/profile', icon: 'fas fa-user', text: '个人中心' },
    { path: '/favorites', icon: 'fas fa-heart', text: '我的收藏' }
]

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
}

const handleLogout = async () => {
    // Implement logout logic here
    await router.push('/login')
}

onMounted(() => {
    const theme = localStorage.getItem('theme')
    isDarkMode.value = theme === 'dark'
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
    }
})
</script>

<style>
</style>
