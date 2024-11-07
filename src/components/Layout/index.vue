<script setup lang="ts">
import { useApp } from '@/store/app'
import { useAuth } from '@/store/auth'
import api from '@/store/auth/api'
import { useThemeVars } from 'naive-ui'

const appStore = useApp()
const authStore = useAuth()
const themeVars = useThemeVars()
const dropdownOptions = [
  {
    label: '退出登录',
    key: 'logout',
    icon: () => h('div', { class: 'i-ant-design:logout-outlined' }),
  },
]
const router = useRouter()
async function logout() {
  const res = await api.logout()
  if (res) {
    authStore.logout()
    router.replace('/login')
  }
}
async function onDropdownClick(key: string) {
  switch (key) {
    case 'logout':
      logout()
      break
  }
}
</script>

<template>
  <n-layout position="absolute">
    <n-layout-header flex="~ items-center justify-between" style="height: 64px;" px-20px>
      <div />
      <div flex="~ items-center">
        <NDropdown placement="bottom-end" :options="dropdownOptions" @select="onDropdownClick">
          <NButton tag="div" ghost :bordered="false">
            <NAvatar round size="large" />
            <div
              ml-10px
              :style="{
                color: themeVars.textColor3,
                fontSize: '18px',
              }"
            >
              {{ authStore.userInfo.username }}
            </div>
          </NButton>
        </NDropdown>
      </div>
    </n-layout-header>
    <NLayout position="absolute" style="top: 64px;" has-sider>
      <NLayoutSider show-trigger collapse-mode="width" :collapsed="appStore.collapsed" @update-collapsed="appStore.collapsed = !appStore.collapsed" />
      <NLayout>
        <NLayoutContent
          :content-style="{
            minHeight: 'calc(100vh - 128px)',
          }" position="absolute" flex-auto style="bottom:64px;" :native-scrollbar="false"
        >
          <slot />
        </NLayoutContent>
        <NLayoutFooter position="absolute" h-64px />
      </NLayout>
    </NLayout>
  </n-layout>
</template>
