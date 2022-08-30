<template>
  <div>
    <h1>List</h1>

    <div v-for="i in content">
      <h1>---------------</h1>
      <!-- <nuxt-link :to="'/article/' + i.contentsId._id"> -->
      {{  i  }}
      <!-- </nuxt-link> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { fieldList } from "~~/api/article/index"
const { data, pending, refresh } = await useAsyncData('fieldList', () => useApiFetch(fieldList))
const {content} = data.value['data']
</script>