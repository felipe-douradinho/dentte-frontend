import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export interface UserData {
  address: string,
  address_complement: string,
  address_neighborhood: string,
  address_number: string,
  address_zipcode: string,
  city_id: number,
  cpf: string,
  created_at: string,
  cro: string,
  email: string,
  email_verified_at: string,
  gender: string,
  id: number,
  mobile: string,
  name: string,
  phone: string,
  updated_at: string,
}

export const useUserSession = defineStore('userSession', () => {
  // token will be synced with local storage
  // @see https://vueuse.org/core/usestorage/
  const token = useStorage('token', '')

  const user = ref<Partial<UserData>>()
  const isLoading = ref(false)

  const isLoggedIn = computed(() => token.value !== undefined && token.value !== '')

  function setUser(newUser: Partial<UserData>) {
    user.value = newUser
  }

  function setToken(newToken: string | undefined) {
    token.value = newToken
  }

  function setIsLoading(newLoading: boolean) {
    isLoading.value = newLoading
  }

  async function logoutUser() {
    token.value = undefined
    user.value = undefined
  }


  function getCookie(name: string): string | undefined {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift()
    }
  }

  return {
    user,
    token,
    isLoggedIn,
    isLoading,
    logoutUser,
    setUser,
    setToken,
    setIsLoading,
    getCookie,
  } as const
})

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot))
}
