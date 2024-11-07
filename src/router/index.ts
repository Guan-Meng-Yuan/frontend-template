import type { App } from 'vue'
import type { Router, RouteRecordRaw } from 'vue-router'
import { useAuth } from '@/store/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', name: 'Login', component: () => import('@/pages/login/index.vue'), meta: {
      title: '登录',
    } },
    { path: '/', name: 'Index', component: () => import('@/pages/index/index.vue'), meta: {
      title: '首页',
    } },
    { path: '/404', name: '404', component: () => import('@/pages/404/index.vue'), meta: {
      title: '404',
    } },

  ],
})
const appTitle = import.meta.env.VITE_APP_TITLE
function createRouterGuards(router: Router) {
  const authStore = useAuth()
  router.beforeEach(async (to, from, next) => {
    window.$loadingBar.start()
    if (from.path === '/login' && to.name === 'errorPage') {
      next('/')
      return
    }
    const token = authStore.getToken()
    if (['/login'].includes(to.path)) {
      if (token) {
        next('/')
        return
      }
      next()
      return
    }
    if (!token) {
      if (to.meta.ignoreAuth) {
        next()
      }
      const redirectData: { path: string, replace: boolean, query?: Record<string, string> } = {
        path: '/login',
        replace: true,
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        }
        next(redirectData)
        return
      }
    }

    if (authStore.initializePermission) {
      next()
      return
    }
    await authStore.initPermission()
    const routes = authStore.generateRoutes()
    routes.forEach((route) => {
      router.addRoute(route as RouteRecordRaw)
    })
    const redirectPath = (from.query.redirect || to.path) as string
    const redirect = decodeURIComponent(redirectPath)
    const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }

    next(nextData)
  })

  router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title}` : appTitle
    window.$loadingBar.finish()
  })
  router.onError(() => {
    router.replace('/404')
  })
}
export function setupRouter(app: App<Element>) {
  app.use(router)
  createRouterGuards(router)
}
