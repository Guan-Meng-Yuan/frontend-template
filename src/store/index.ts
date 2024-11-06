import type { App } from 'vue'

const store = createPinia()
function setupStore(app: App<Element>) {
  app.use(store)
}
export {
  setupStore,
  store,
}
