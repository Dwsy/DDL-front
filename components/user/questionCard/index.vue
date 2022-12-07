<template>
  <div>
    <v-tabs v-model="tab">
      <v-tab value="all">全部</v-tab>
      <v-tab value="ASK">发起</v-tab>
      <v-tab value="RESOLVED">以解决</v-tab>
      <v-tab value="HAVE_ANSWER">以有答案</v-tab>
    </v-tabs>
    <UserQuestionList />

    <v-pagination v-model="params.page" :length="totalPages"></v-pagination>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { computed, inject, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { QuestionField, QuestionState } from '~/types/question'
import { useAxiosGetUserQuestionPageById } from '~/composables/Api/user/qa'
import UserQuestionList from '~/components/user/questionCard/UserQuestionList.vue'

// useLayout().drawer = false
const route = useRoute()
const router = useRouter()
const tab = ref()
const ListContent = ref<Array<QuestionField>>([])
provide('QuestionFieldList', ListContent)
const totalPages = ref()
const uid = String(route.params.id)
const params = ref({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  state: QuestionState.ALL,
})
// const counts = ref({})

// const counts = inject('questionCounts')
onMounted(async () => {
  if (route.query.state) {
    if (route.query.state === 'draft') {
      tab.value = 'all'
    } else {
      tab.value = String(route.query.state)
    }
  } else {
    let href = window.location.href
    window.history.replaceState({}, 'title', href + '?state=all')
  }
  watchEffect(async () => {
    params.value.state = tab.value
    const { data: listData } = await useAxiosGetUserQuestionPageById(uid, params.value)
    if (listData.code === 0) {
      scrollTo(0, 0)
      totalPages.value = listData.data.totalPages
      ListContent.value = listData.data.content
    }
  })

  watch(tab, async (val) => {
    params.value.page = 1
    // let href = window.location.href
    // let replaceId = 'state=' + val
    // window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
  })
})

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.query.state) {
    tab.value = String(to.query.state)
    next(false)
  }
  next()
})
</script>

<style scoped></style>
