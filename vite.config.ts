import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createProxy, wrapperEnv } from './build/utils'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const { VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv
  return {
    base: VITE_PUBLIC_PATH,
    plugins: [vue(), UnoCSS(), AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        'pinia',
        'vue-router',
        'vue-i18n',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
    }), Components({
      resolvers: [NaiveUiResolver()],
      types: [{
        from: 'vue-router',
        names: ['RouterLink', 'RouterView'],
      }],
    }), vueDevTools()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: `${pathResolve('src')}/`,
        },
      ],
    },
    server: {
      proxy: createProxy(VITE_PROXY),
    },
  }
})
