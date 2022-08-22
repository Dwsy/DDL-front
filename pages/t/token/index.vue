<template>
  <!-- <div v-for="i in data['data']">
    <h1>---------------</h1>
      <nuxt-link :to="'/t/' + i.contentsId">
      {{ i.title }}
      </nuxt-link>
  </div> -->
  <h1>
    token{{count}}
  </h1>
  <p v-if="r===undefined">
    加载中
  </p>
<!--  <p v-else-if="r.data.status===401">-->
<!--    {{ r.data.message }}-->
<!--  </p>-->
  <p v-else>
    {{ r }}
  </p>
  <v-btn @click="t">
    show
  </v-btn>
</template>
<script setup lang="ts">
// import {AxiosResponse} from 'axios';
// import {get, post} from "~~/utils/req"
import {tokeTest} from "~~/api/useApiTest"
import { ref } from 'vue';
// definePageMeta({
//   layout: false
// })
import {AxiosResponse} from "axios";
let r = ref(null)

// let route = useRoute()
// console.log(route.params.id);

// let { $axios } = useNuxtApp()
// const axios = $axios()
// const getlist = async () => axios.get("https://nestapi.dwsy.link/api/classification/article/6039284a2684e22ec8291c64")
// let body = {
//   url: " https://nestapi.dwsy.link/api/fields/draftList?query=%7B%22limit%22:777,%22sort%22:%22-_id%22,%22populate%22:%22tag+classification%22%7D",
//   methods: "get",
//   body: null,
//   params: null,
// }
let count = ref<number>(0)
// let response = ref<AxiosResponse>(undefined)
onMounted( async () => {
  if (typeof window !== 'undefined') {
    // response = await get(body.url)
    let {data}=  await tokeTest()
    r.value=ref(data)
    console.log("browser");
    // console.log(response.value)
  } else {
    console.log("NODE token");
  }
})

const t = () => {
  console.log(r)
  // alert(r)
  count.value++
  // r=ref("1")
};

</script>