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
