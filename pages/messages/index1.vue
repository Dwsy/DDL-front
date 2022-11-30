<template>
  <div>
    Parent/b
    <p>test:</p>
    <div v-if="showText">
      /* is always false after route changes */
      <p>hello world, should be alive?!</p>
    </div>
    <textarea></textarea>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { onMounted, ref } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({
  keepalive: true,
})
const showText = ref(false)
onMounted(() => {
  if (showText.value) return
  setTimeout(() => {
    showText.value = true
  }, 1000)
})
</script>
