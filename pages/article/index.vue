<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>

      <v-col xl="10" lg="10" md="10" sm="12" xs="12">
        <div>
          <!--          <div style="position: sticky; top: 5%; z-index: 100; background-color: #00a0d8">-->
          <Group @select-tag="selectTag"></Group>
          <v-divider class="my-4"></v-divider>
          <!--          </div>-->

          <List v-for="data in listContent" :key="data.id" v-bind="data"></List>

          <div>
            <v-alert
              v-model="alert"
              colored-border
              dismissible
              elevation="2"
              icon="mdi-alert"
              type="info"
            >
              到头啦
            </v-alert>
          </div>
        </div>
      </v-col>

      <v-col xl="1" lg="1" md="1" sm="0" xs="0"></v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import List from '~~/components/article/index/list.vue'
import Group from '~~/components/article/index/group.vue'
import { onActivated, onBeforeUnmount, onMounted, onUnmounted, ref } from 'vue'
import {
  definePageMeta,
  useAxiosGetArticleList,
  useFetchGetArticleList,
  useLoadingWin,
} from '#imports'
import { articleListData } from '~/types/article'
import { onBeforeRouteLeave } from 'vue-router'
import { useHead } from '#head'
import { useLayout } from '~/stores/layout'
import { useTheme } from 'vuetify'
import { useUserStore } from '~/stores/user'
import { useAxiosGetRecommendArticle } from '~/composables/Api/article'
//todo 因为做了瀑布流需要加一个 seo 隐藏分页
// import { useWindowScroll } from '@vueuse/core'
// const { x, y } = useWindowScroll()
// const page = ref(1)
definePageMeta({
  keepalive: true,
})
const theme = useTheme()
useLayout().showFooter = true
const showText = ref(false)
onMounted(async () => {
  if (showText.value) return
  setTimeout(async () => {
    showText.value = true
    if (userStore.userInfo != null) {
      const { data: axiosResponse } = await useAxiosGetRecommendArticle(userStore.userInfo.tagStr)
      listContent.value.unshift(...axiosResponse.data)
    }
  }, 1000)
})
let a = ref(0)
const params = ref({
  size: 8,
  page: 1,
  tagId: null,
  order: null,
  properties: null,
})

const { data: listData } = await useFetchGetArticleList({
  size: 8,
  page: 1,
  tagId: null,
  order: null,
  properties: null,
})
const listContent = ref<Array<articleListData>>(null)
listContent.value = listData.content

const totalPages = ref(null)
totalPages.value = listData.totalPages
const alert = ref(false)

useHead({
  title: '文章',
})
const userStore = useUserStore()
onMounted(async () => {
  // clog('index mounted')
  // clog(indexTop.value)
  // document.documentElement.scrollTop = 0
  document.body.onscroll = useLoadingWin(loadingMore)
  await nextTick()
})
onBeforeUnmount(() => {
  document.body.onscroll = null
})

const selectTag = async (tagID) => {
  clog('selectTag')
  console.log('selectTag', tagID)
  if (tagID == 0) {
    params.value.tagId = null
  } else {
    params.value.tagId = tagID
  }
  params.value.page = 1
  // page.value = 1
  alert.value = false
  const { data: r } = await useAxiosGetArticleList(params.value)
  if (userStore.userInfo != null && tagID == 0) {
    const { data: axiosResponse } = await useAxiosGetRecommendArticle(userStore.userInfo.tagStr)
    r.data.content.unshift(...axiosResponse.data)
  }
  listContent.value = r.data.content
  totalPages.value = r.data.totalPages
  console.log('selectTag-end', r)
}

const loadingMore = async () => {
  if (params.value.page >= Number(totalPages.value)) {
    if (listContent.value.length > 8) {
      alert.value = true
      document.body.onscroll = null
    }
    return
  }
  params.value.page += 1
  const { data: listDataNew } = await useFetchGetArticleList(params.value)
  listDataNew.content.filter((item) => {
    if (listContent.value.find((item2) => item2.id == item.id)) {
      return false
    } else {
      return true
    }
  })
  listContent.value.push(...listDataNew.content)
}
</script>

<style lang="css" scoped>
:deep(.v-card--variant-elevated, .v-card--variant-flat) {
  background-color: v-bind('theme.global.name.value === "dark" ? "#0f0f0f" : "#FFF"') !important;
}
</style>
