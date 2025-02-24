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
      if (themeMode.value === 'auto') {
        naiveTheme.value = isDark ? darkTheme : undefined
      }
      if (themeMode.value === 'light') {
        naiveTheme.value = undefined
      }
      if (themeMode.value === 'dark') {
        naiveTheme.value = darkTheme
      }
      defaultHandler(mode)
    },
  })
  const switchTheme = (mode: string) => {
    switch (mode) {
      case 'auto':
        naiveTheme.value = systemIsDark.value ? darkTheme : undefined
        break
      case 'light':
        naiveTheme.value = undefined
        break
      case 'dark':
        naiveTheme.value = darkTheme
        break
    }
    themeMode.value = mode
    localStorage.setItem('themeMode', mode)
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
  return { naiveTheme, systemIsDark, getNaiveTheme, switchTheme, themeMode }
})
function useApp() {
  return appStore(store)
}
export { useApp }
