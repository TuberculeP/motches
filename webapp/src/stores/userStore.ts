import { defineStore } from 'pinia'
import type { PgUser } from 'shared/types'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref<PgUser | null>(null)

  function logout() {
    user.value = null
  }

  function setUser(newUser: PgUser) {
    user.value = newUser
  }

  function getUser() {
    return user.value
  }

  return { getUser, setUser, logout, user }
})
