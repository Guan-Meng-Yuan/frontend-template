import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), AutoImport({
    imports: [
      'vue',
      'pinia',
      '@vueuse/core',
      'vue-router',
    ],
  }), Components({
    types: [{
      from: 'vue-router',
      names: ['RouterLink', 'RouterView'],
    }],
    resolvers: [NaiveUiResolver()],
  }), UnoCSS()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 @ 指向 src 目录
    },
  },
})
