<template>
  <h1>{{t}}</h1>
</template>

<script setup lang="ts">
   let {data:t}  =useFetch("http://localhost/search/article/suggestion/q")
  
</script>