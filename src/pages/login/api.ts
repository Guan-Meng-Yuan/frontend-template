import { Alova } from '@/utils/http'

export default {

  login: (loginParam: LoginParam) => Alova.Post<string | undefined>('/auth/login', loginParam),

}
