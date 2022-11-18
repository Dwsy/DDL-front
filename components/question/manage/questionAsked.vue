<template>
  <div>
    <v-tabs v-model="tab" v-if="counts">
      <v-tab value="all">全部 {{ counts['ALL'] }}</v-tab>
      <v-tab value="ask">发起 {{ counts['ASK'] }}</v-tab>
      <v-tab value="resolved">以解决 {{ counts['RESOLVED'] }}</v-tab>
      <v-tab value="have_answer">以有答案 {{ counts['HAVE_ANSWER'] }}</v-tab>
      <v-tab value="hide">已隐藏 {{ counts['HIDE'] }}</v-tab>
      <v-tab value="unresolved">未解决 {{ counts['UNRESOLVED'] }}</v-tab>
      <v-tab value="auditing">审核中 {{ counts['AUDITING'] }}</v-tab>
      <v-tab value="rejected">未通过 {{ counts['REJECTED'] }}</v-tab>
    </v-tabs>
    <div v-for="question in ListContent">
      <QuestionListCard v-bind="question"></QuestionListCard>
    </div>
    <v-container class="max-width ml-n16">
      <v-pagination v-model="params.page" class="ml-n16"
                    :length="totalPages">
      </v-pagination>
    </v-container>


  </div>
</template>

<script setup lang="ts">
import {inject, onMounted, ref, watch, watchEffect} from 'vue'
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router'
import List from '~~/components/article/index/list.vue'
import {articleListData} from '~/types/article'
import {useAxiosGetArticleList} from '~/composables/Api/article'
import {ArticleState, GetUserArticleListParams} from '~/types/article/manageArticle'
import {useAxiosGetArticleCountByState, useAxiosGetUserArticleList} from '~/composables/Api/article/manageArticle'
import {QuestionState} from '~/types/question'
import {GetUserQuestionListParams} from '~/types/message/manage'
import {useAxiosGetUserQuestionList} from '~/composables/Api/question/manageQuestion'

const route = useRoute()
const router = useRouter()
const tab = ref()
const ListContent = ref<Array<articleListData>>(null)
// const allListContent = ref<Array<articleListData>>(null)
// const publishedListContent = ref<Array<articleListData>>(null)
// const hideListContent = ref<Array<articleListData>>(null)
// const auditingListContent = ref<Array<articleListData>>(null)
// const rejectedListContent = ref<Array<articleListData>>(null)
const totalPages = ref(null)
const params = ref<GetUserQuestionListParams>({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  status: QuestionState.ALL,
  tagId: null
})
// const counts = ref({})

const counts = inject('questionCounts')
onMounted(async () => {
  if (route.query.state) {
    if (route.query.state === 'draft') {
      tab.value = 'all'
    } else {
      tab.value = String(route.query.state)
    }
  } else {
    console.log('route.query.state', route.query.state)
    let href = window.location.href
    window.history.replaceState({}, 'title', href + '?state=all')
  }
  watchEffect(async () => {
    params.value.state = tab.value
    const {data: listData} = await useAxiosGetUserQuestionList(params.value)
    if (listData.code === 0) {
      scrollTo(0, 0)
      totalPages.value = listData.data.totalPages
      ListContent.value = listData.data.content
    }
  })

  watch(tab, async (val) => {
    params.value.page = 1
    let href = window.location.href
    let replaceId = 'state=' + val
    window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
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

<style scoped>

</style>