<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui'
import { useLocale } from '@/locale/useLocale'
import { useApp } from './store/app'

const { getComponentsLocale } = useLocale()
const appStore = useApp()
const themeOverrides: GlobalThemeOverrides = {
  Layout: {
    color: 'rgb(250, 250, 252)',
    footerColor: '#ffffff',
  },
}
const route = useRoute()
</script>

<template>
  <NConfigProvider :theme-overrides="themeOverrides" :locale="getComponentsLocale" :theme="appStore.theme" :date-locale="getComponentsLocale">
    <NGlobalStyle />
    <Layout v-if="route.name !== 'Login'">
      <RouterView />
    </Layout>
    <RouterView v-else />
  </NConfigProvider>
</template>

<style scoped>

</style>
