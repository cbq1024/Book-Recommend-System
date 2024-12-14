<!-- NavLink.vue -->
<template>
    <router-link
        :to="path"
        class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 px-2 py-1 text-sm font-medium transition-all duration-200 hover:scale-105"
        active-class="text-blue-600 dark:text-blue-400"
    >
        <i :class="icon" class="text-sm w-4"></i>
        <span>{{ text }}</span>
    </router-link>
</template>

<script lang="ts" setup>
defineProps<{
    path: string
    icon: string
    text: string
}>()
</script>
