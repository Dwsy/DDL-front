<template>
  <div>
    <v-tabs
        v-model="tab"
        active-class="d-article-tabs-active-class"
        transition="fade-transition"
    >
      <v-tab value="null" v-show="false"></v-tab>
      <v-tab value="question">问题</v-tab>
      <v-tab value="draft">草稿箱 {{ counts["DRAFT"] }}</v-tab>
    </v-tabs>

    <v-divider></v-divider>
    <v-window v-model="tab" transition="fade-transition">
      <v-window-item value="null"></v-window-item>
      <v-window-item value="question">
        <QuestionAsked></QuestionAsked>
      </v-window-item>

      <v-window-item value="draft">
        <QuestionManageCard/>
        <v-pagination v-model="params.page" class="my-4" :length="totalPages">
        </v-pagination>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import {onMounted, provide, ref, watchEffect} from 'vue'

import {warningMsg} from '~/composables/utils/toastification'
import {useRoute} from '#app'
import QuestionAsked from '~/components/question/manage/questionAsked.vue'
import {QuestionField, QuestionState} from '~/types/question'
import {
  useAxiosGetQuestionCountByState,
  useAxiosGetUserQuestionList,
} from '~/composables/Api/question/manageQuestion'
import {GetUserQuestionListParams} from '~/types/message/manage'
import {
  dateFilter,
  getRandomColor,
  timeAgoFilter,
} from '~/composables/useTools'

const tab = ref('null')
const counts = ref({})
const draftListContent = ref<Array<QuestionField>>(null)
provide('QuestionFieldManageList', draftListContent)
const totalPages = ref(null)

const params = ref<GetUserQuestionListParams>({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  state: QuestionState.DRAFT,
  tagId: null,
})
const route = useRoute()
provide('questionCounts', counts)
onMounted(async () => {
  if (String(route.query.state) === 'draft') {
    tab.value = String(route.query.state)
  } else {
    setTimeout(() => {
      tab.value = 'question'
    }, 100)
    //fixme 组件会onMounted 先这么解决了
  }
  const {data: countsRes} = await useAxiosGetQuestionCountByState()
  counts.value = countsRes.data

  watchEffect(async () => {
    if (tab.value === 'draft') {
      let href = window.location.href
      let replaceId = 'state=' + 'draft'
      window.history.replaceState(
          {},
          'title',
          href.replace(/state=\w+/i, replaceId)
      )
      const {data: axiosResponse} = await useAxiosGetUserQuestionList(
          params.value
      )
      if (axiosResponse.code === 0) {
        draftListContent.value = axiosResponse.data.content
        totalPages.value = axiosResponse.data.totalPages
        scrollTo(0, 0)
      } else {
        warningMsg(axiosResponse.msg)
      }
    }
    if (tab.value === 'question') {
      let href = window.location.href
      let replaceId = 'state=' + 'all'
      window.history.replaceState(
          {},
          'title',
          href.replace(/state=\w+/i, replaceId)
      )
    }
  })
})
</script>

<style scoped>
:deep(.v-slide-group-item--active) {
  color: dodgerblue;
  font-size: 90%;
}
</style>
