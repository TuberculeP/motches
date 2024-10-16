import axios from 'axios'
import type { PgUser } from 'shared/types'

export type APIResponse<T> = {
  data: T
  status: number
}

const instance = axios.create({
  baseURL: import.meta.env.VITE_EXPRESS_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

const apiClient = {
  get: async function <T>(url: string) {
    const response = await instance.get<T>(url)
    return response.data
  },
  post: async function <T>(url: string, data?: any) {
    const response = await instance.post<T>(url, data || {})
    return response.data
  },
  put: async function <T>(url: string, data: any) {
    const response = await instance.put<T>(url, data)
    return response.data
  },
  delete: async function <T>(url: string) {
    const response = await instance.delete<T>(url)
    return response.data
  },
  isConnected: async function (): Promise<PgUser | false> {
    try {
      const response = await instance.get<{ user?: PgUser; message?: string }>('/auth/check')
      if (response.status === 200 && response.data.user) {
        return response.data.user
      }
    } catch (e) {
      console.log(e)
    }
    return false
  },
  login: async function () {
    // redirect to the login page
    window.location.href = `${import.meta.env.VITE_EXPRESS_URL}/auth/google`
  }
}

export { apiClient }
