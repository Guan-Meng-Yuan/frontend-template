import { setupStore } from '@/stores'
import { setNaive } from '@/utils/naive.ts'
import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'

function bootstrap() {
  const app = createApp(App)
  setupStore(app)
  setNaive()
  app.mount('#app')
}
bootstrap()
