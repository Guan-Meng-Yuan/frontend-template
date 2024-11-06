import { store } from '..'

const authStore = defineStore('auth', () => {
  const getToken = () => {
    return useStorage('TOKEN', '').value
  }
  const setToken = (token: string) => {
    localStorage.setItem('TOKEN', token)
  }
  return {
    getToken,
    setToken,
  }
})
export const useAuth = () => authStore(store)
