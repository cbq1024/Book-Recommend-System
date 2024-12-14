import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: localStorage.getItem('theme') === 'dark'
  }),

  actions: {
    toggleDarkMode() {
      this.isDark = !this.isDark
      // 更新 HTML 根元素的 class
      if (this.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      // 保存到 localStorage
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    initTheme() {
      // 从 localStorage 或系统偏好初始化主题
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

      this.isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

      if (this.isDark) {
        document.documentElement.classList.add('dark')
      }
    }
  }
}) 