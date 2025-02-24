import type { App } from 'vue'
import { createRouter } from 'vue-router'

const router = createRouter({
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }
    return to.hash ? { behavior: 'smooth', el: to.hash } : { left: 0, top: 0 }
  },
})
function setupRouter(app: Element<App>) {
  app.use(router)
}
export {
  setupRouter,
}
