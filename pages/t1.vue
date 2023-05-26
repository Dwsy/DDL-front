<template>
  <div>
    {{ userStore.user?.nickname }}
  </div>
  
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
clog(userStore.user)
</script>

<style></style>
