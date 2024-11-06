import type { ProxyOptions } from 'vite'

function wrapperEnv(envConf: Record<string, any>) {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      }
      catch (error) {
        console.error(error)
      }
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}

type ProxyItem = [string, string]

type ProxyList = ProxyItem[]
type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>
const httpsRE = /^https:\/\//

function createProxy(list: ProxyList) {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)

    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return ret
}
export {
  createProxy,
  wrapperEnv,
}
