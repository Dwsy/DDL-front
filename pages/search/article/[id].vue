<template>
<div>
  search
  <div v-for="i in ret">
    <h1>---------------</h1>
    <nuxt-link :to="'/article/' + i.id">
      {{  i  }}
    </nuxt-link>
  </div>
</div>
</template>

<script setup lang="ts">
import {onMounted, useRoute} from '#imports'
import {useAxiosGetSearchArticle} from '~/composables/Api/search'
let ret = ref()
let Route=  useRoute()
// console.log(Route.params.id)
onMounted(async ()=>{
  let searchRet = await useAxiosGetSearchArticle(Route.params.id)
  ret.value = searchRet.data["data"]
  console.log(ret)
})

</script>