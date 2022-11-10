<template>
  <div>
    <!--    <nuxt-link to="/article/index1">-->
    <!--      Test keep-alive1-->
    <!--    </nuxt-link>-->
    <!--    <nuxt-link to="/article/9">-->
    <!--      |||Test keep-alive id-->
    <!--    </nuxt-link>-->
    <!--    <div v-if="showText">-->
    <!--      /* is always false after route changes */-->
    <!--      <p>hello world, should be alive?!</p>-->
    <!--    </div>-->
    <v-row>

      <v-col xl="1" lg="1" md="0" sm="0" xs="0"></v-col>

      <v-col xl="10" lg="10" md="10" sm="12" xs="12">
        <div>
          <Group @select-tag="selectTag"></Group>
          <v-divider class="my-4"></v-divider>

          <List v-for="data in listContent " v-bind="data" :key="data.id"></List>

          <div>
            <v-alert v-model="alert" dismissible type="info" elevation="2" colored-border icon="mdi-alert">
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
import List from '~~/components/article/index/list.vue'
import Group from '~~/components/article/index/group.vue'
import {onActivated, onMounted, onUnmounted, ref} from 'vue'
import {definePageMeta, useFetchGetArticleList, useLoadingWin} from '#imports'
import {articleListData} from '~/types/article'
import {onBeforeRouteLeave} from 'vue-router'
import {useHead} from '#head'
import {useLayout} from '~/stores/layout'
//todo 因为做了瀑布流需要加一个 seo 隐藏分页
// import { useWindowScroll } from '@vueuse/core'
// const { x, y } = useWindowScroll()
// const page = ref(1)
definePageMeta({
  keepalive: true
})
useLayout().showFooter = true
const showText = ref(false)
onMounted(() => {
  if (showText.value) return
  setTimeout(() => {
    showText.value = true
  }, 1000)
})
let a = ref(0)
const params = ref({size: 8, page: 1, tagId: null, order: null, properties: null})

const {data: listData} = await useFetchGetArticleList({size: 8, page: 1, tagId: null, order: null, properties: null})
const listContent = ref<Array<articleListData>>(null)
listContent.value = listData.content

const totalPages = ref(null)
totalPages.value = listData.totalPages
const alert = ref(false)

useHead({
  title: '文章'
})
onMounted(() => {
  // console.log('index mounted')
  // console.log(indexTop.value)
  document.documentElement.scrollTop = 0
  document.body.onscroll = useLoadingWin(loadingMore)
})
// onUnmounted(() => {
// console.log('index unmounted')
// document.body.onscroll = document.documentElement.scrollTop=0
// })
// onActivated(() => {
//   console.log("onActivated")
//   document.documentElement.scrollTop = indexTop.value || 0
// })
// onBeforeRouteLeave((to, from, next) => {
//   indexTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
// indexTop.value = document.getElementById('__nuxt').scrollTop || 0
// next()
// })

const selectTag = async (tagID) => {
  if (tagID == 0) {
    params.value.tagId = null
  } else {
    params.value.tagId = tagID
  }
  params.value.page = 1
  // page.value = 1
  alert.value = false
  const data = (await useFetchGetArticleList(params.value)).data
  listContent.value = data.content
  totalPages.value = data.totalPages

}

const loadingMore = async () => {
  if (params.value.page >= Number(totalPages.value)) {
    if (listContent.value.length > 8) {
      alert.value = true
      document.body.onscroll = null
    }
    return
  }
  // params.value.page += 1
  const {data: listDataNew} = await useFetchGetArticleList(params.value)
  listContent.value.push(...listDataNew.content)
}
</script>

<style lang="scss" scoped>

</style>