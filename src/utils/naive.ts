import { createDiscreteApi } from 'naive-ui'

export function setupDiscreteApi() {
  const { message, dialog, modal, notification, loadingBar } = createDiscreteApi(['message', 'dialog', 'loadingBar', 'modal', 'notification'], {

  })
  window.$message = message
  window.$dialog = dialog
  window.$modal = modal
  window.$loadingBar = loadingBar
  window.$notification = notification
}
