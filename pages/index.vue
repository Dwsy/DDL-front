<template>
  {{ paramId }}
</template>

<script lang="ts" setup>
import { definePageMeta, useRoute, useRouter } from '#imports'

let paramId = useRoute().params.id
let Router = useRouter()
if (paramId == undefined) {
  Router.push('/article')
} else {
  Router.push('/paramId')
}
definePageMeta({
  keepalive: true,
})
</script>

<style scoped></style>
