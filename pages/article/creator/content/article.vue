<template>


  <div>
    <v-tabs v-model="tab" active-class="d-article-tabs-active-class" transition="fade-transition">
      <v-tab value="null" v-show="false"></v-tab>
      <v-tab value="article">文章</v-tab>
      <v-tab value="draft">草稿箱 {{ counts[ArticleState.draft] }}</v-tab>
    </v-tabs>

    <v-divider></v-divider>
    <v-window v-model="tab" transition="fade-transition">
      <v-window-item value="null"></v-window-item>
      <v-window-item value="article">
        <Essays></Essays>
      </v-window-item>

      <v-window-item value="draft">
        <List v-for="data in draftListContent " v-bind="data" :key="data.id"></List>
        <v-container class="max-width ml-n16">
          <v-pagination v-model="params.page" class="my-4"
                        :length="totalPages">
          </v-pagination>
        </v-container>
      </v-window-item>

    </v-window>
  </div>

</template>

<script setup lang="ts">
import {inject, onMounted, provide, ref, watch, watchEffect} from 'vue'
import Essays from '~/components/article/creator/content/article/essays.vue'
import {useAxiosGetArticleCountByState, useAxiosGetUserArticleList} from '~/composables/Api/article/manageArticle'
import {ArticleState, GetUserArticleListParams} from '~/types/article/manageArticle'
import List from '~~/components/article/index/list.vue'
import {articleListData} from '~/types/article'
import {useAxiosGetArticleList} from '~/composables/Api/article'
import {defaultMsg, warningMsg} from '~/composables/utils/toastification'
import {useRoute} from '#app'
import {onBeforeRouteUpdate} from 'vue-router'

const tab = ref('null')
const counts = ref({})
const draftListContent = ref<Array<articleListData>>(null)
const totalPages = ref(null)
const params = ref<GetUserArticleListParams>({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  state: ArticleState.draft,
  tagId: null
})
const route = useRoute()
provide('articleCounts', counts)
onMounted(async () => {
  if (String(route.query.state) === 'draft') {
    tab.value = String(route.query.state)
  } else {
    // let href = window.location.href
    // window.history.replaceState({}, 'title', href + '?state=all')
    setTimeout(() => {
      tab.value = 'article'
    }, 100)
    //fixme 组件会onMounted 先这么解决了
  }
  const {data: countsRes} = await useAxiosGetArticleCountByState()
  counts.value = countsRes.data

  watchEffect(async () => {
    if (tab.value === 'draft') {
      let href = window.location.href
      let replaceId = 'state=' + 'draft'
      window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
      const {data: axiosResponse} = await useAxiosGetUserArticleList(params.value)
      if (axiosResponse.code === 0) {
        draftListContent.value = axiosResponse.data.content
        totalPages.value = axiosResponse.data.totalPages
        scrollTo(0, 0)
      } else {
        warningMsg(axiosResponse.msg)
      }
    }
    if (tab.value === 'article') {
      let href = window.location.href
      let replaceId = 'state=' + 'all'
      window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
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

