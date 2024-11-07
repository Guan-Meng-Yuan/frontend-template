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
  interface Base {
    id?: string
    createTime?: Date
    updateTime?: Date
  }
  interface User extends Base {
    username?: string
    password?: string

  }

  interface Menu extends Base {
    title?: string
    path?: string
    parentId?: string
    component?: string
    name?: string
    hide?: boolean
    icon?: string
    children?: Menu[]
  }
}
