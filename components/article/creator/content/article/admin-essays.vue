<template>
  <div>
    <v-tabs v-model="tab" v-if="counts" class="mb-2">
      <v-tab value="all">全部 {{ counts[ArticleState.all] }}</v-tab>
      <v-tab value="auditing">审核中 {{ counts[ArticleState.auditing] }}</v-tab>
      <v-tab value="published">已发布 {{ counts[ArticleState.published] }}</v-tab>
      <v-tab value="hide">已隐藏 {{ counts[ArticleState.hide] }}</v-tab>
      <v-tab value="rejected">未通过 {{ counts[ArticleState.rejected] }}</v-tab>
    </v-tabs>
    <admin-article-manage-card />
    <v-container class="max-width ml-n16">
      <v-pagination v-model="params.page" :length="totalPages" class="ml-n16"> </v-pagination>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { inject, onMounted, provide, ref, watch, watchEffect } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import List from '~~/components/article/index/list.vue'
import { articleListData } from '~/types/article'
import { useAxiosGetArticleList } from '~/composables/Api/article'
import { ArticleState, GetUserArticleListParams } from '~/types/article/manageArticle'
import {
  useAxiosGetAdminArticleList,
  useAxiosGetArticleCountByState,
  useAxiosGetUserArticleList,
} from '~/composables/Api/article/manageArticle'
import { dateFilter, getRandomColor, timeAgoFilter } from '#imports'
import AdminArticleManageCard from '~/components/article/creator/content/article/admin-articleManageCard.vue'

const route = useRoute()
const router = useRouter()
const tab = ref()
const ListContent = ref<Array<articleListData>>(null)
provide('admin-manage-articleFiled', ListContent)
// const allListContent = ref<Array<articleListData>>(null)
// const publishedListContent = ref<Array<articleListData>>(null)
// const hideListContent = ref<Array<articleListData>>(null)
// const auditingListContent = ref<Array<articleListData>>(null)
// const rejectedListContent = ref<Array<articleListData>>(null)
const totalPages = ref(null)
const params = ref<GetUserArticleListParams>({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  state: ArticleState.all,
  tagId: null,
})
// const counts = ref({})
const counts = inject('admin-articleCounts')
onMounted(async () => {
  if (route.query.state) {
    if (route.query.state === 'draft') {
      tab.value = 'all'
    } else {
      tab.value = String(route.query.state)
    }
  } else {
    // clog('route.query.state', route.query.state)
    let href = window.location.href
    window.history.replaceState({}, 'title', href + '?state=all')
  }
  watchEffect(async () => {
    params.value.state = tab.value
    const { data: listData } = await useAxiosGetAdminArticleList(params.value)
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
.d-article-manage-summary {
  font-size: 14px;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
