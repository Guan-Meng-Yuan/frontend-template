<script lang="ts" setup>
import { useApp } from '@/stores/app.ts'
import { useStorage } from '@vueuse/core'

const settingPaneShow = ref(false)

function showSettingPane() {
  settingPaneShow.value = true
}
const themeMode = useStorage('themeMode', 'auto')
const appStore = useApp()
</script>

<template>
  <NLayout position="absolute" has-sider>
    <NLayoutSider collapse-mode="width" show-trigger="bar" :native-scrollbar="false">
      侧边栏
    </NLayoutSider>
    <NLayout :native-scrollbar="false">
      <NLayoutHeader :native-scrollbar="false" h-64px position="absolute">
        <div w="full" flex="~ justify-between items-center">
          <div w="50%">
            <NButton quaternary>
              <template #icon>
                <div class="i-tabler:reload h-48px w-48px" />
              </template>
            </NButton>
          </div>
          <div>
            <NButton circle quaternary @click="showSettingPane">
              <template #icon>
                <div class="i-uil:setting" />
              </template>
            </NButton>
          </div>
        </div>
      </NLayoutHeader>
      <NLayoutContent :native-scrollbar="false" style="top: 64px;bottom: 64px" position="absolute">
        <div />
      </NLayoutContent>
      <NLayoutFooter :native-scrollbar="false" position="absolute" style="bottom: 0;height: 64px">
        底部
      </NLayoutFooter>
    </NLayout>
  </NLayout>
  <NDrawer v-model:show="settingPaneShow" width="400" placement="right">
    <NDrawerContent title="偏好设定" closable>
      <div flex="~ justify-around">
        <div flex="~ col  items-center">
          <NButton :type="appStore.themeMode === 'light' ? 'primary' : 'default'" ghost h-60px w-115px @click="appStore.switchTheme('light')">
            <template #icon>
              <NIcon size="30">
                <div i-line-md:sun-rising-loop />
              </NIcon>
            </template>
          </NButton>
          <text mt-2>
            浅色
          </text>
        </div>
        <div flex="~ col items-center">
          <NButton ghost :type="appStore.themeMode === 'dark' ? 'primary' : 'default'" h-60px w-115px @click="appStore.switchTheme('dark')">
            <template #icon>
              <NIcon size="30">
                <div i-line-md:moon-rising-alt-loop />
              </NIcon>
            </template>
          </NButton>
          <text mt-2>
            深色
          </text>
        </div>
        <div flex="~ col items-center">
          <NButton ghost :type="appStore.themeMode === 'auto' ? 'primary' : 'default'" h-60px w-115px @click="appStore.switchTheme('auto')">
            <template #icon>
              <NIcon size="30">
                <div i-ion:invert-mode />
              </NIcon>
            </template>
          </NButton>
          <text mt-2>
            跟随系统
          </text>
        </div>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<style>

</style>
