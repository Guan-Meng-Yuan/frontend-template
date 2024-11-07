import { Alova } from '@/utils/http'

export default {
  userInfo: () => Alova.Get<User>('/auth/info'),
  logout: () => Alova.Delete('/auth/logout'),
  routes: () => Alova.Get<Menu[]>('/auth/routes'),
}
