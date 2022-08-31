<template>
  <div>
    Group
    <div v-for="i in group">
      <nuxt-link to="/t1">t1</nuxt-link>
      <h1>---------------</h1>
      <!-- <nuxt-link :to="'/article/' + i.contentsId._id"> -->
      {{  i  }}
      <!-- </nuxt-link> -->
    </div>
  </div>
</template>

<script setup lang="ts">
    
const {data} =  await useAsyncData('glist', () => useApiFetch("article/group/list"))
// const group =await useFetchGetArticleGroupList()
const group = data.value['data']
</script>