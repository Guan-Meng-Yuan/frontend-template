import type { BasicColorSchema } from '@vueuse/core'
import { darkTheme, lightTheme } from 'naive-ui'
import { store } from '..'

const appStore = defineStore('app', () => {
  const theme = ref(lightTheme)
  const collapsed = ref(false)
  useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    initialValue: 'light',
    valueLight: 'light',
    onChanged: (dark: boolean, defaultHandler: ((mode: BasicColorSchema) => void)) => {
      defaultHandler(dark ? 'dark' : 'light')
      theme.value = dark ? darkTheme : lightTheme
    },
  })
  return {
    theme,
    collapsed,

  }
})
export const useApp = () => appStore(store)
