<template>
  <div>
    <v-row>
      <span class="text-body-1 px-4 pt-3">分类:</span>
      <v-chip-group v-bind:model-value="selectionGroup" mandatory>
        <v-chip @click="changeGroup('0')"> 综合</v-chip>
        <v-chip v-for="g in groupData" :key="g.id" :label="true" @click="changeGroup(g.id)">
          <!--          variant="outlined"-->
          {{ g.name }}
        </v-chip>
      </v-chip-group>
    </v-row>

    <div>
      <v-divider class="my-2"></v-divider>
      <v-row>
        <span class="text-body-1 px-4 pt-3">标签:</span>
        <v-chip-group v-bind:model-value="selectionTag" mandatory>
          <v-chip @click="emit('selectTag', 0)"> 推荐</v-chip>
          <template v-for="tag in tags" :key="tag.id">
            <v-chip @click="emit('selectTag', tag.id)">
              {{ tag.name }}
            </v-chip>
          </template>
        </v-chip-group>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  useFetchGetArticleGroupList,
  useFetchGetArticleTagList,
  useFetchGetArticleTagListByGroupId,
} from '~/composables/Api/article'

const emit = defineEmits(['selectTag'])
let selectionGroup = ref(null)
let selectionTag = ref(null)
let tags = ref(null)
const { data: groupData } = await useFetchGetArticleGroupList()
tags.value = (await useFetchGetArticleTagList()).data

onMounted(async () => {
  selectionGroup.value = 0
  selectionTag.value = 0
  // changeGroup(groupData[0].id)
})
const changeGroup = async (id: string) => {
  // selectionGroup.value = id
  if (id == '0') {
    tags.value = (await useFetchGetArticleTagList()).data
    return
  }
  tags.value = (await useFetchGetArticleTagListByGroupId(id)).data
  selectionTag.value = 0
  // console.log(selectionTag.value);
}
const changeTag = (id: string) => {}
</script>

<style scoped>
.v-chip--selected {
  color: #9b59b6;
}
</style>