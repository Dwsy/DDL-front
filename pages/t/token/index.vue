<template>
    <!-- <div v-for="i in data['data']">
      <h1>---------------</h1>
        <nuxt-link :to="'/t/' + i.contentsId">
        {{ i.title }}
        </nuxt-link>
    </div> -->
    <h1>
      token
    </h1>
    <p v-if="response===undefined">
      加载中
    </p>
    <p v-else-if="response.data.status===401">
      no auth
    </p>
        <p v-else="response.data.statusCode===401">
      {{response.data.message}}
    </p>
    <v-btn @click="t">
      show
    </v-btn>
</template>
<script setup lang="ts">
import { AxiosResponse } from 'axios';
import { get,post } from "~~/utils/req"
let route = useRoute()
// console.log(route.params.id);

// let { $axios } = useNuxtApp()
// const axios = $axios()
// const getlist = async () => axios.get("https://nestapi.dwsy.link/api/classification/article/6039284a2684e22ec8291c64")
let body = {
  url:" https://nestapi.dwsy.link/api/fields/draftList?query=%7B%22limit%22:777,%22sort%22:%22-_id%22,%22populate%22:%22tag+classification%22%7D",
  methods: "get",
  body: null,
  params: null,
}
let response:AxiosResponse=undefined
const t = ()=>{
  console.log(response.data.statusCode);
  
}

if (typeof window !== 'undefined') {
    response= await get(body.url)
    console.log("browser");
    
}else{
    console.log("NODE token");
}


// try {
//   response= await get(body.url)
//   console.log(response);
//   console.log("let response:AxiosResponse=null");
  
  
// } catch (error) {
//   console.log(error);
  
// }

// 
// let r:any=data.data
// console.log(r[0]);

// const {data} = await useAsyncData(body.url, () => $fetch(body.url))
// const {data} = await useAsyncData(body.url, async () => await useFetchResponse(body))
// console.log(data.value);
// const {data} = await useAsyncData('byid', () =>  useFetchResponse(body))
// console.log(data.value);

// await $fetch.raw(url, {
//     method: methods,
//     headers: HeaderOption,
//     // baseURL: baseUrl,
//     params: params,
//   });
// console.log(data.value);
// let array: Array<any> = null
// data.map(e => {
//   console.log(e._id);
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