<template>
    <button class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 relative w-8 h-8 flex items-center justify-center group">
        <i class="fas fa-bell text-lg group-hover:scale-110 transition-transform duration-200"></i>
        <span v-if="count > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
            {{ count }}
        </span>
    </button>
</template>

<script lang="ts" setup>
defineProps<{
    count: number
}>()
</script> 