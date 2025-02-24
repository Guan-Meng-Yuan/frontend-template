import { useApp } from '@/stores/app.ts'
import { createDiscreteApi } from 'naive-ui'

export function setNaive() {
  const appStore = useApp()
  const { message, dialog, modal, notification, loadingBar } = createDiscreteApi(['message', 'dialog', 'modal', 'notification', 'loadingBar'], {
    configProviderProps: { theme: appStore.naiveTheme },
    messageProviderProps: { themeOverrides: appStore.naiveTheme },
    loadingBarProviderProps: { themeOverrides: appStore.naiveTheme },
    notificationProviderProps: { themeOverrides: appStore.naiveTheme },
  })
  window.$message = message
  window.$dialog = dialog
  window.$modal = modal
  window.$notification = notification
  window.$loadingBar = loadingBar
}
