import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

import client from '@/pocketbase'

export const useUserStore = defineStore('user', () => {
  // State variable
  // Using the useLocalStorage composable provided by VueUse in order to persist state during page reloads
  const userData = ref(useLocalStorage('userData', ''))

  // Actions
  function refresh() {
    client.collection('users').authRefresh()
    if (client.authStore.isValid) {
      userData.value = client.authStore.record
    }
  }

  return { userData, refresh }
})
