<script setup lang="ts"></script>

<template>
  <div h-full p-20px>
    <div v-for="i in 1000" :key="i">
      内容{{ i }}
    </div>
  </div>
</template>

<style scoped></style>
