<template>
  <div>
    <p>
      {{data}}
    </p>
    <h1>content</h1>
    <div  id="md-preview"
          class="md-preview default-theme" v-html="html">
    </div>
    <div>
      <h1>comment</h1>
      {{comment}}
    </div>
  </div>
</template>


<script setup lang="ts">
import { useFetchGetArticleField,useFetchGetArticleContent,useFetchGetArticleComment } from '~~/api/article';

let route = useRoute()
// console.log("article"+route.params.id);
let url = "http://localhost/article/article/field/9"
const d = await useAsyncData(url, () => $fetch(url))
console.log(d.data.value);

let {data} = await useFetchGetArticleField(route.params.id)
let html = (await useFetchGetArticleContent(route.params.id,{
  type:0
})).data
let comment = (await useFetchGetArticleComment(route.params.id)).data
console.log(html);


</script>