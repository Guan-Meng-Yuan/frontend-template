/// <reference types="vite/client" />
import type { DialogApi } from 'naive-ui'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

declare global {
  interface Window {
    $message: MessageApiInjection
    $dialog: DialogApi
    $modal: ModalApi
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
  }

}
