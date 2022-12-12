<template>
  <!--  -->
  <div>
    <!--    {{sug}}-->
    <!--    prepend-inner-icon="mdi-magnify"-->
    <v-autocomplete
      v-model="infinityStore.infinityTopicList"
      v-model:search="text"
      :items="sug"
      :loading="isLoading"
      @keyup.enter="query"
      variant="underlined"
      hint="搜索话题"
      hide-no-data
      flat
      clearable
      hide-details
      rounded
      :readonly="readonly"
      chips
      closable-chips
      multiple
      dense
      item-title="name"
      item-value="name"
      label="关联话题"
      prepend-icon="mdi-magnify"
      return-object
    >
      <template v-slot:chip="{ props, item }">
        <v-chip v-bind="props" :text="item.raw.name" prepend-icon="mdi-music-accidental-sharp">
        </v-chip>
      </template>
      <template v-slot:item="{ props, item }">
        <v-list-item v-if="typeof item.raw !== 'object'" v-bind="props"></v-list-item>
        <v-list-item v-else variant="flat" v-bind="props" prepend-icon="mdi-music-accidental-sharp">
          浏览量：{{ item.raw.viewNum }}
        </v-list-item>
      </template>
    </v-autocomplete>
    <div class="pt-1">
      <span class="TagNum float-right">{{ `${infinityStore.infinityTopicList.length}/3` }}</span>
    </div>

    <v-text-field
      @click:append="addTopic()"
      v-model="addTopicName"
      label="手动添加话题"
      append-icon="mdi-chevron-up-circle-outline"
      :variant="'outlined'"
    ></v-text-field>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useRouter } from '#app'
import { onMounted, watch, ref, inject, watchEffect, toRef, toRefs } from 'vue'
import { useAxiosGetTagSuggestion } from '~/composables/Api/article/manageArticle'

import { defaultMsg } from '~/composables/utils/toastification'
import { useAxiosGetInfinityTopicList } from '~/composables/Api/infinity'
import { InfinityTopic } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { toReactive } from '#imports'
import { useAxiosPostCreateTopic } from '~/composables/Api/infinity/topic'
// import {ArticleTag} from '~/types/article'
// import {TagSuggestion} from '~/types/article/manageArticle'
const infinityStore = useInfinityStore()
const Router = useRouter()
// let model = ref(null)
const text = ref('')
const sug = ref([])
const isLoading = ref(false)
const readonly = ref(false)
const TagNumColor = ref('')
onMounted(() => {
  // infinityTopicList.value =
  // clog()
  watchEffect(() => {
    // if (infinityTopicList.value.length >= 3) {
    //   if (infinityTopicList.value.length > 3) {
    //     infinityTopicList.value.pop()
    if (infinityStore.infinityTopicList.length >= 3) {
      if (infinityStore.infinityTopicList.length > 3) {
        infinityStore.infinityTopicList.pop()
        defaultMsg('最多可以关联三个话题')
      }
      readonly.value = true
      TagNumColor.value = 'red'
    } else {
      readonly.value = false
      TagNumColor.value = '#000'
    }
  })
  watch(
    text,
    async () => {
      if (text.value === '') {
        // sug.value = (await useFetchGetinfinityTopicList()).data
        isLoading.value = false
        //todo 推荐最近使用的标签
        return
      }
      await debounceAjax(suggestion)
    },
    { immediate: true, deep: true }
  )
})

const suggestion = async () => {
  if (text.value === '') {
    return
  }
  isLoading.value = true
  // const response = await useAxiosGetTagSuggestion(text.value)
  const { data: axiosResponse } = await useAxiosGetInfinityTopicList()
  sug.value = []
  if (axiosResponse.code === 0) {
    axiosResponse.data.content.forEach((item) => {
      // item.name = '# ' + item.name
      sug.value.push(item)
    })
    isLoading.value = false
  }
  // response.data.data.forEach((item) => {
  //   sug.value.push(item.name)
  // })
  // sug.value = response.data.data
}
const query = () => {
  Router.push('/search/article/' + text.value)
}
const debounce = (fun, delay) => {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}
let debounceAjax = debounce(suggestion, 800)

const addTopicName = ref()
const addTopic = async () => {
  const { data: axiosResponse } = await useAxiosPostCreateTopic({ name: addTopicName.value })
  if (axiosResponse.code == 0) {
    defaultMsg('添加成功')
    addTopicName.value = ''
    infinityStore.infinityTopicList.push(axiosResponse.data)
  } else {
    errorMsg(axiosResponse.msg)
  }
}
</script>
<style scoped>
/*.TagNum {*/
/*  color: v-bind(TagNumColor);*/
/*}*/
</style>
