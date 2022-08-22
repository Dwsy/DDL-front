<template>
  <div>
    <div  id="md-preview"
          class="md-preview default-theme" v-html="r"></div>
  </div>
</template>


<script setup lang="ts">
let route = useRoute()
console.log("article"+route.params.id);

let body = {
  url: "https://nestapi.dwsy.link/api/contents/all/" + route.params.id,
  methods: "get",
  body: null,
  params: null,
}
const {data} = await useAsyncData(body.url, () => $fetch(body.url))
let r = data.value['content']['text']

</script>