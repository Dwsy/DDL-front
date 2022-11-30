<template>
  <!-- <div>
  <v-list-group v-for="i in data.data">
    <v-list>{{i}}</v-list>
  </v-list-group>
</div> -->
  <div>
    <pre>
  {{ r }}
    </pre>
    >
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
// import { getById } from "~~/api/useApiTest"
// import { useFetchResponse } from "~~/composables/useFetchResponse"
import { useRoute } from '#app'

let route = useRoute()
// clog(route.params.id)

// let { $axios } = useNuxtApp()
// const axios = $axios()
// const getlist = async () => axios.get("https://nestapi.dwsy.link/api/classification/article/6039284a2684e22ec8291c64")
let body = {
  url: 'https://nestapi.dwsy.link/api/contents/all/' + route.params.id,
  methods: 'get',
  body: null,
  params: null,
}
const { data } = await useAsyncData(body.url, () => $fetch(body.url))
let r = data.value['content']['text']
// const {data} = await useAsyncData('byid', () =>  useFetchResponse(body))
// clog(data.value);

// await $fetch.raw(url, {
//     method: methods,
//     headers: HeaderOption,
//     // baseURL: baseUrl,
//     params: params,
//   });
// clog(data.value);
// let array: Array<any> = null
// data.map(e => {
//   clog(e._id);
//   // let { data } =
//   let body = {
//     url: "https://nestapi.dwsy.link/api/contents/all/" + e._id,
//     methods: "get",
//     body: null,
//     params: null,
//   }
//   let d = await useFetchResponse(body)
//   array.push(d)
//   /* do things with response and response.data */
// })
//

// let d = await getById("6039284a2684e22ec8291c64")

// axios.get('/req/path/123').then((response) => {
//   /* do things with response and response.data */
// })
// let data =
</script>
