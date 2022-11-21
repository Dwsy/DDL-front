<template>
  <!-- <div v-for="i in data['data']">
    <h1>---------------</h1>
      <nuxt-link :to="'/t/' + i.contentsId">
      {{ i.title }}
      </nuxt-link>
  </div> -->
  <h1>token{{ count }}</h1>
  <p v-if="r === undefined">加载中</p>
  <!--  <p v-else-if="r.data.status===401">-->
  <!--    {{ r.data.message }}-->
  <!--  </p>-->
  <p v-else>
    {{ r }}
  </p>
  <v-btn @click="t"> show </v-btn>
</template>
<script setup lang="ts">
// import {tokeTest,baseUrlTest} from "~~/api/useApiTest"
import { ref } from "vue";
let r = ref(null);
let count = ref<number>(0);
// let response = ref<AxiosResponse>(undefined)
onMounted(async () => {
  if (typeof window !== "undefined") {
    // response = await get(body.url)
    // let {data}=  await tokeTest()
    let { data } = await baseUrlTest();
    r.value = ref(data);
    console.log("browser");
    // console.log(process);

    // alert(config.process.env.API_BASE_URL)
    // console.log(response.value)
  } else {
    console.log("NODE token");
  }
});

const t = () => {
  count.value++;
};
</script>
