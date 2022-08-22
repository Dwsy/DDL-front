<template>
  <div>
    <div v-for="i in data['data']">
      <h1>---------------</h1>
      <nuxt-link :to="'/article/' + i.contentsId._id">
        {{ i.title }}
      </nuxt-link>
    </div>
  </div>
</template>
<script setup lang="ts">
let url = "https://nestapi.dwsy.link/api/fields?query=%7B%22limit%22:8,%22page%22:1,%22sort%22:%22-_id%22,%22populate%22:%22tag+classification%22%7D"
const { data, pending, refresh } = await useAsyncData('doc', () => $fetch(url))
let r = data.value['data']
</script>