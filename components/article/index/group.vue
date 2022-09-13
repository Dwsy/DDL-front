<template>
  <div>
    <h1>Group</h1>
    <div  v-for="i in group">
        <v-btn @click="changeGroup(i.id)" >
          {{ i.name}}
        </v-btn>
    </div>
    
    <div>
      <h1>Tag</h1>
      {{ tag }}
    </div>
  </div>
</template>

<script setup lang="ts">




const { data } = await useAsyncData('glist', () => useApiFetch("article/group/list"))
// const group =await useFetchGetArticleGroupList()
const group = data.value['data']
const tag = ref(null)
const changeGroup= async (id:number)=>{
  tag.value = (await useFetchGetArticleTagListByGroupId(id)).data
}

</script>