import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory('/login'),
  routes: [
    { path: '/login', name: 'Login', component: () => import('@/pages/login/index.vue'), meta: {
      title: '登录',
    } },
    { path: '/', name: 'Index', component: () => import('@/pages/index/index.vue'), meta: {
      title: '首页',
    } },
  ],
})
const appTitle = import.meta.env.VITE_APP_TITLE
router.beforeEach((to) => {
  window.$loadingBar.start()
  document.title = to.meta.title ? `${to.meta.title}` : appTitle
})
router.afterEach(() => {
  window.$loadingBar.finish()
})
export function setupRouter(app: App<Element>) {
  app.use(router)
}
