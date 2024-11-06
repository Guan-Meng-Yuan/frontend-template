<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { useLocale } from '@/locale/useLocale'
import { useApp } from './store/app'

const { getComponentsLocale } = useLocale()
const appStore = useApp()
const themeOverrides: GlobalThemeOverrides = {
  Layout: {
    color: 'linear-gradient(#ffffff, #f5f5f5 28%)',
  },
}
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides" :locale="getComponentsLocale" :theme="appStore.theme" :date-locale="getComponentsLocale">
    <NGlobalStyle />
    <NLayout has-sider>
      <NLayoutSider />
      <NLayout>
        <NLayoutContent>
          <RouterView />
        </NLayoutContent>
      </NLayout>
    </NLayout>
  </NConfigProvider>
</template>

<style scoped>

</style>
