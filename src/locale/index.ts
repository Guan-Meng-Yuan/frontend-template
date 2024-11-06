import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

const localeConfigKey = import.meta.env.VITE_APP_LOCALE_KEY
const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE
const langModules: any = import.meta.glob('./lang/*/index.ts', { eager: true })
const langCode: Array<string> = []
const langModuleMap = new Map<string, object>()
function generateLangModuleMap() {
  const fullPaths = Object.keys(langModules)
  fullPaths.forEach((fullPath) => {
    const k = fullPath.replace('./lang', '')
    const startIndex = 1
    const lastIndex = k.lastIndexOf('/')
    const code = k.substring(startIndex, lastIndex)
    langCode.push(code)
    langModuleMap.set(code, langModules[fullPath])
  })
}
const importMessages = computed(() => {
  generateLangModuleMap()
  const message: Record<string, any> = {}
  langModuleMap.forEach((value: any, key) => {
    message[key] = value.default
  })
  return message
})
const i18n = createI18n({
  legacy: false,
  locale: useLocalStorage(localeConfigKey, usePreferredLanguages().value[0]).value,
  fallbackLocale: defaultLocale,
  messages: importMessages.value,
  globalInjection: true,
})
export function setupI18n(app: App<Element>) {
  app.use(i18n)
}
export {
  i18n,
}
