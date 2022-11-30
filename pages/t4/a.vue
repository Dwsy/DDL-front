<template>
  <div>
    aaa
    <v-text-field></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { onDeactivated } from '@vue/runtime-core'
import { onMounted } from 'vue'

onMounted(() => {
  clog('mounted')
})

onDeactivated(() => {
  clog('deactivated')
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>

<style scoped></style>
