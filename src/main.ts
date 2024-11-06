import { setupI18n } from '@/locale'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'
import { setupDiscreteApi } from '@/utils/naive'
import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'

function bootStrap() {
  const app = createApp(App)
  setupStore(app)
  setupI18n(app)
  setupDiscreteApi()
  setupRouter(app)
  app.mount('#app')
}

bootStrap()
