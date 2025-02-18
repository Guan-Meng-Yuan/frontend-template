<script setup lang="ts">
import { useApp } from '@/stores/app.ts'

const appStore = useApp()
</script>

<template>
  <NConfigProvider :theme="appStore.getNaiveTheme()">
    <NGlobalStyle />
    <HelloWorld />
  </NConfigProvider>
</template>

<style scoped>
</style>
