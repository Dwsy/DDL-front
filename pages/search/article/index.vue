<template>
  <div>
    <v-row>
      <v-col xl="1" lg="1" md="0" sm="0" xs="0"></v-col>
      <v-col xl="10" lg="10" md="10" sm="12" xs="12">
        <div>
          <div class="mt-8">
            <span class="text-subtitle-1" style="color: #9195a3"
              >共找到 {{ totalElements }}条结果</span
            >
          </div>

          <v-divider class="mb-6"></v-divider>
          <div>
            <div
              v-if="loading === false && searchListContent.length === 0"
              class="text-h4 my-12 text-center"
            >
              <br /><br /><br />
              <span> 未找到相关结果 </span>
              <br /><br /><br />
            </div>
            <div v-if="loading" class="text-h4 my-12 text-center">
              <br /><br /><br />
              <span class="my-12">检索中...</span>
              <br /><br /><br />
            </div>
            <div v-else v-for="content in searchListContent">
              <v-card elevation="1" outlined>
                <v-row>
                  <v-col class="px-4" cols="4">
                    <div class="text-subtitle-1">
                      <v-icon class="pb-1" color="blue darken-2" size="small"
                        >mdi-account-circle
                      </v-icon>
                      {{ content.userNickName }} |
                      <span class="text-subtitle-2">{{
                        dateFilter(content.createTime, 'YYYY-MM-DD')
                      }}</span>
                      <nuxt-link v-for="tag in content.tagList" :to="`/article/tag/${tag.id}`">
                        <span class="text-subtitle-2 link">
                          /
                          {{ tag.name }}
                        </span>
                      </nuxt-link>
                    </div>
                  </v-col>
                </v-row>
                <v-divider class="mx-3"></v-divider>
                <v-card target="_blank" :href="`/article/${content.id}`">
                  <v-row>
                    <v-col cols="8">
                      <v-row>
                        <v-col>
                          <v-card-title v-html="content.title"></v-card-title>
                          <v-card-text class="ml-3 mb-3" v-html="content.content"></v-card-text>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col offset="2">
                      <v-img
                        :aspect-ratio="1"
                        :src="content.banner"
                        class="my-n3"
                        max-height="150"
                        transition="slide-y-reverse-transition"
                      >
                      </v-img>
                    </v-col>
                  </v-row>
                </v-card>
              </v-card>
              <v-divider class="my-2"></v-divider>
            </div>
          </div>
          <!-- <div v-for="i in searchListContent">
            <h1>---------------</h1>
            <nuxt-link :to="'/article/' + i.id">
              {{ i }}
            </nuxt-link>
          </div> -->

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
import { onMounted, ref } from 'vue'
import { dateFilter, useAxiosGetSearchArticle, useRoute } from '#imports'
import { ArticleSearchData } from '~/types/search'

let searchListContent = ref<Array<ArticleSearchData>>()
let Route = useRoute()
const params = { size: 10, page: 1, order: null, properties: null }
const totalPages = ref(null)
const alert = ref(false)
const totalElements = ref(0)
const loading = ref(true)
onMounted(async () => {
  watchEffect(async () => {
    document.title = '搜索:' + Route.query.s
    let { data: searchRet } = await useAxiosGetSearchArticle(Route.query.s, params)
    totalElements.value = searchRet.data.totalElements
    searchListContent.value = searchRet.data.content
    totalPages.value = searchRet.data.totalPages
    params.page = 1
    document.body.onscroll = loadingWin
    loading.value = false
  })
})

const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  //滚动条滚动距离
  let scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  //窗口可视范围高度
  let clientHeight =
    window.innerHeight ||
    Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop + 100 >= scrollHeight) {
    clog('loading more')
    await loadingMore()
  }
}

const loadingMore = async () => {
  if (params.page >= Number(totalPages.value)) {
    if (searchListContent.value.length > 10) {
      alert.value = true
    }
    return
  }
  params.page += 1
  let { data: searchRetNew } = await useAxiosGetSearchArticle(Route.query.s, params)
  searchListContent.value.push(...searchRetNew.data.content)
}
</script>
<style scoped>
:deep(a) {
  text-decoration: none;
  color: inherit;
}

:deep(em) {
  font-style: normal;
}

:deep(.highlight) {
  color: #f73131;
}
</style>
