<template>
  <div>
    <h1>List</h1>
    <div v-for="i in content">
      <h1>---------------</h1>
      <nuxt-link :to="'/article/' + i.id">
      {{  i  }}
      </nuxt-link>
    </div>

  </div>
</template>
<script setup lang="ts">

const data = await useFetchGetArticleList()
let {content} = data.data||null

</script>