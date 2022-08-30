<template>
  <div>
    Group
    <div v-for="i in group">
      <h1>---------------</h1>
      <!-- <nuxt-link :to="'/article/' + i.contentsId._id"> -->
      {{  i  }}
      <!-- </nuxt-link> -->
    </div>
  </div>
</template>

<script setup lang="ts">
    
const {data} =  await useAsyncData('glist', () => useApiFetch("article/group/list"))
const group = data.value['data']
</script>