import { store } from '..'
import api from './api'

const authStore = defineStore('auth', () => {
  const getToken = () => {
    return useStorage('TOKEN', '').value
  }
  const viewModules = import.meta.glob('@/pages/**/*.{vue,tsx}')
  const pathPrefix = '/src/pages/'
  const menus = ref<Menu[]>([])
  const routes = ref<Menu[]>([])
  const userInfo = ref<User>({})
  const initializePermission = ref(false)
  const setToken = (token: string) => {
    localStorage.setItem('TOKEN', token)
  }
  const initPermission = async () => {
    userInfo.value = await api.userInfo()
    routes.value = await api.routes()
    initializePermission.value = true
  }

  const generateRoutes = () => {
    const dynamicRoutes = routes.value.map((menu) => {
      const route = {
        path: menu.path,
        name: menu.name,
        component: () => viewModules[`${pathPrefix}${menu.component}`],
        meta: {
          title: menu.title,
        },
      }
      return route
    })
    return dynamicRoutes
  }
  const logout = () => {
    userInfo.value = {}
    localStorage.removeItem('TOKEN')
  }
  return {
    getToken,
    menus,
    setToken,
    initPermission,
    userInfo,
    logout,
    initializePermission,
    generateRoutes,
  }
})
export const useAuth = () => authStore(store)
