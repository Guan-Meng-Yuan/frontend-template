<script setup lang="ts">
import { useLocale } from '@/locale/useLocale'
import { useAuth } from '@/store/auth'
import { useThemeVars } from 'naive-ui'
import api from './api'

onMounted(() => {
})
const formRef = ref()
const loginForm = ref<LoginParam>({})
const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}
const loading = ref(false)
const authStore = useAuth()
onKeyStroke('Enter', () => handleLogin())
const route = useRoute()
const router = useRouter()
const { t } = useLocale()
function handleLogin() {
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      loading.value = true
      const res = await api.login(loginForm.value)
      loading.value = false
      if (res) {
        authStore.setToken(res)
        const toPath = decodeURIComponent((route.query?.redirect || '/') as string)
        window.$message.success(t('login.success'))
        if (route.name === 'Login') {
          router.replace('/')
        }
        else {
          router.replace(toPath)
        }
      }
    }
  })
}
const themeVars = useThemeVars()
const slogan = import.meta.env.VITE_APP_SLOGAN
</script>

<template>
  <div flex="~ col items-center justify-center" class="bg" h-100vh>
    <div m="0 a" flex="~ col items-center" max-w-384px min-w-320px>
      <div py-32px text-center>
        <img style="width: 80%;" src="@/assets/images/account-logo.png" alt="">
        <div
          text-14px :style="{
            color: themeVars.textColor3,
          }"
        >
          {{ slogan }}
        </div>
      </div>
      <NForm ref="formRef" :rules="rules" :model="loginForm" size="large" w-full label-placement="left">
        <NFormItem path="username">
          <NInput v-model:value="loginForm.username" :placeholder="$t('placeholder.username')">
            <template #prefix>
              <div
                :style="{
                  color: themeVars.textColor3,
                }" i-ion:person-outline text-18px
              />
            </template>
          </NInput>
        </NFormItem>
        <NFormItem path="password">
          <NInput
            v-model:value="loginForm.password" type="password" show-password-on="click"
            :placeholder="$t('placeholder.password')"
          >
            <template #prefix>
              <div
                i-ion:lock-closed-outline text-18px :style="{
                  color: themeVars.textColor3,
                }"
              />
            </template>
          </NInput>
        </NFormItem>
        <NFormItem>
          <div w-full flex="~  justify-between">
            <NCheckbox v-model:checked="loginForm.rememberMe">
              {{ $t('login.rememberMe') }}
            </NCheckbox>
            <a text-inherit decoration-none href="javascript:">{{ $t('login.forgetPassword') }}</a>
          </div>
        </NFormItem>
        <n-form-item>
          <n-button type="primary" :loading="loading" size="large" block @click="handleLogin">
            {{ $t('login.btn') }}
          </n-button>
        </n-form-item>
      </NForm>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: url('@/assets/images/login.svg');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;
}
</style>
