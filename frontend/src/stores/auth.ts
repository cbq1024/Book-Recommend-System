import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
  }),
  
  actions: {
    async login(credentials) {
      // 实现登录逻辑
    },
    
    async logout() {
      // 实现登出逻辑
    },
    
    async checkAuth() {
      // 检查认证状态
    },
  },
}) 