<template>
  <div>@</div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { definePageMeta } from '#imports'

definePageMeta({
  // key:route => route.fullPath,
  keepalive: false,
})
</script>

<style scoped></style>
