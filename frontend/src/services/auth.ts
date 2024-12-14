import axios from 'axios'

export const login = async (credentials: {
  username: string
  password: string
  rememberMe: boolean
}) => {
  const response = await axios.post('/api/auth/login', credentials)
  return response.data
}

export const socialLogin = async (platform: string, code: string) => {
  const response = await axios.post(`/api/auth/${platform}/callback`, { code })
  return response.data
}

export const sendPasswordResetEmail = async (email: string) => {
  const response = await axios.post('/api/auth/forgot-password', { email })
  return response.data
}

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await axios.post('/api/auth/reset-password', {
    token,
    newPassword
  })
  return response.data
}

export const register = async (userData: {
  username: string
  email: string
  password: string
}) => {
  const response = await axios.post('/api/auth/register', userData)
  return response.data
} 