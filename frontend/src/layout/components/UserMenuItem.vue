<!-- UserMenuItem.vue -->
<template>
    <router-link
        :to="path"
        class="group flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
        <i :class="[icon, 'mr-3 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200']"></i>
        {{ text }}
    </router-link>
</template>

<script lang="ts" setup>
defineProps<{
    path: string
    icon: string
    text: string
}>()
</script>
