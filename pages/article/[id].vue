<template>

  <div>
    <div v-html="data">
    </div>

    <h1>content</h1>
    <div id="md-preview" class="md-preview default-theme" v-html="html">
    </div>
    <div>
      <h1>comment</h1>
      <div v-for="i in comment.content">
        <div v-if="i.childComments != null">

        <div>
          <h1>1级评论{{ i.text }}</h1>
          <div v-for="c in i.childComments">
            2级评论{{ c.text }}
          </div>
        </div>
        <p>===================================</p>


        </div>
        <p v-else>"暂无评论"</p>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
// import { useFetchGetArticleField, useFetchGetArticleContent, useFetchGetArticleComment } from '~~/api/article';

// import { useFetchGetArticleGroupList } from '~~/composables/AsyncData/useApiFetch';

let route = useRoute()
// console.log("article"+route.params.id);
// let url = "http://localhost/article/article/field/9"
// const d = await useAsyncData(url, () => $fetch(url))

let { data } = await useFetchGetArticleField(route.params.id)
console.log(data);

let html = await useFetchGetArticleContent(route.params.id, {
  type: 0
})
html = html.data

let c =await useFetchGetArticleComment(route.params.id)

let comment = c.data


</script>