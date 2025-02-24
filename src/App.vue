<script setup lang="ts">
import { useApp } from '@/stores/app.ts'

const appStore = useApp()
</script>

<template>
  <NConfigProvider :theme="appStore.naiveTheme">
    <NGlobalStyle />
    <Layout />
  </NConfigProvider>
</template>

<style scoped>
</style>
