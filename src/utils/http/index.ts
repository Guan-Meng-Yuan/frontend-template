import { useAuth } from '@/store/auth'
import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'

const apiPrefix = import.meta.env.VITE_API_PREFIX
const Alova = createAlova({
  baseURL: apiPrefix,
  requestAdapter: adapterFetch(),
  beforeRequest(method) {
    const authStore = useAuth()
    method.config.headers.Authorization = authStore.getToken()
  },
  async responded(response, method) {
    const res = await response.json()

    if (!response.ok) {
      if (response.status === 401) {
        window.$dialog.warning({
          title: '提示',
          content: '登录身份已失效,请重新登录',
          maskClosable: false,
          positiveText: '确定',
          negativeText: '取消',
          closeOnEsc: false,
          closable: false,
          onPositiveClick: () => {
            localStorage.clear()
            window.location.href = '/login'
          },
        })
        return
      }
      window.$message.error(res.tips)
      return
    }
    if (method.meta?.returnNative) {
      return res
    }
    return res.result
  },
})
export {
  Alova,
}
