<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="page-container flex flex-col justify-center">
    <NResult title="抱歉，你访问的页面不存在" size="huge" status="404">
      <template #footer>
        <NButton type="info" @click="goHome">
          回到首页
        </NButton>
      </template>
    </NResult>
  </div>
</template>

  <style  scoped>
    .page-container {
      width: 100%;
      border-radius: 4px;
      height: 83vh;

      .text-center {
        h1 {
          color: #666;
          padding: 20px 0;
        }
      }

      img {
        width: 350px;
        margin: 0 auto;
      }
    }
  </style>
