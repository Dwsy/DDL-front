<template>
  <div>
    <v-row>
      <span class="pt-3 px-4 text-body-1">分类:</span>
      <v-chip-group v-bind:model-value="selectionGroup" mandatory>
        <v-chip @click="changeGroup(0)">
          综合
        </v-chip>
        <v-chip label v-for="g in groupData" :key="g.id" @click="changeGroup(g.id)"
        >
          <!--          variant="outlined"-->
          {{ g.name }}
        </v-chip>
      </v-chip-group>
    </v-row>

    <div>
      <v-divider class="my-2"></v-divider>
      <v-row>
        <span class="pt-3 px-4 text-body-1">标签:</span>
        <v-chip-group v-bind:model-value="selectionTag" mandatory>
          <v-chip @click="emit('selectTag', 0)">
            推荐
          </v-chip>
          <v-chip v-for="tag in tags" :key="tag.id" @click="emit('selectTag', tag.id)">
            {{ tag.name}}
          </v-chip>
        </v-chip-group>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useFetchGetArticleGroupList, useFetchGetArticleTagList, useFetchGetArticleTagListByGroupId} from '#imports'

const emit = defineEmits(['selectTag'])
let selectionGroup = ref(null)
let selectionTag = ref(null)
let tags = ref(null)
const {data: groupData} = await useFetchGetArticleGroupList()
tags.value = (await useFetchGetArticleTagList()).data

onMounted(async () => {
  selectionGroup.value = 0
  selectionTag.value = 0
  // changeGroup(groupData[0].id)
})
const changeGroup = async (id: number) => {
  // selectionGroup.value = id
  if (id == 0) {
    tags.value = (await useFetchGetArticleTagList()).data
    return
  }
  tags.value = (await useFetchGetArticleTagListByGroupId(id)).data
  selectionTag.value = 0
  // console.log(selectionTag.value);

}
const changeTag = (id: Number) => {}


</script>

<style scoped>
.v-chip--selected {
  color: #9b59b6;
}
</style>