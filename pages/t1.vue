<template>
  <div>
    {{ userStore.user?.nickname }}
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
console.log(userStore.user);
</script>

<style></style>
