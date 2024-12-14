<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<style>
/* 添加过渡效果 */
html.dark {
  color-scheme: dark;
}

body {
  transition: background-color 0.3s ease;
}

.dark body {
  background-color: var(--dark-bg);
}
</style>
