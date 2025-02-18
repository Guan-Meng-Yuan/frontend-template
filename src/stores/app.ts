import type { BasicColorSchema } from '@vueuse/core'
import type { GlobalTheme } from 'naive-ui'
import { store } from '@/stores'
import { useDark, useStorage } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'

const appStore = defineStore('app', () => {
  const naiveTheme = ref<GlobalTheme | undefined>(undefined)
  const themeMode = useStorage('themeMode', 'auto')

  const systemIsDark = useDark({
    onChanged: (isDark: boolean, defaultHandler: ((mode: BasicColorSchema) => void), mode: BasicColorSchema) => {
      const themeMode = useStorage('themeMode', 'auto')
      if (themeMode.value === 'auto') {
        naiveTheme.value = isDark ? darkTheme : undefined
      }
      defaultHandler(mode)
    },
  })
  const getThemeOverridesProviderProps = () => {
    if (themeMode.value === 'auto') {
      if (systemIsDark.value) {
        return {
          theme: systemIsDark.value ? darkTheme : undefined,
        }
      }
    }
    return {
      theme: themeMode.value === 'light' ? undefined : darkTheme,
    }
  }
  const getNaiveTheme = () => {
    if (themeMode.value === 'auto') {
      if (systemIsDark.value) {
        naiveTheme.value = systemIsDark.value ? darkTheme : undefined
      }
    }
    naiveTheme.value = themeMode.value === 'light' ? undefined : darkTheme
    return naiveTheme.value
  }
  return { naiveTheme, systemIsDark, themeMode, getNaiveTheme, getThemeOverridesProviderProps }
}, {
  persist: true,
})
function useApp() {
  return appStore(store)
}
export { useApp }
