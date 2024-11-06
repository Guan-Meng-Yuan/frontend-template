import type { DialogApi, LoadingBarApi, MessageApi, ModalApi, NotificationApi } from 'naive-ui'

declare global{
  interface Window {
    $message: MessageApi
    $dialog: DialogApi
    $modal: ModalApi
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
  }
  interface LoginParam {
    username?: string
    password?: string
    rememberMe?: boolean
  }
}
