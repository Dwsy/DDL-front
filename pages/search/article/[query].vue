<template>
<div>
  <v-row>
    <v-col xl="1" lg="1" md="0" sm="0" xs="0"></v-col>
    <v-col xl="10" lg="10" md="10" sm="12" xs="12">
      <div>

        <div class="mt-8">
          <span class="text-subtitle-1 " style="color:#9195a3">共找到 {{ totalElements }}条结果</span>


        </div>

        <v-divider class="mb-6"></v-divider>
        <div>
          <div v-if="loading===false&&searchListContent.length===0" class="text-center text-h4 my-12">
            <br/><br/><br/>
            <span>
          未找到相关结果
        </span>
            <br/><br/><br/>
          </div>
          <div class="text-center text-h4 my-12" v-if="loading">
            <br/><br/><br/>
            <span class="my-12">检索中...</span>
            <br/><br/><br/>
          </div>
          <div v-else v-for="content in searchListContent">
            <v-card elevation="1" outlined>
              <v-row>
                <v-col class="px-4" cols="4">
                  <div class="text-subtitle-1">
                    <v-icon color="blue darken-2" size="small" class="pb-1">mdi-account-circle</v-icon>
                    {{ content.userNickName }} |
                    <span class="text-subtitle-2">{{ dateFilter(content.createTime, 'YYYY-MM-DD') }}</span>
                    <nuxt-link v-for="tag in content.tagList" :to="`/article/tag/${tag.id}`">
                  <span class="text-subtitle-2 link"> /
                    {{ tag.name }}
                  </span>
                    </nuxt-link>
                  </div>
                </v-col>
              </v-row>
              <v-divider class="mx-3"></v-divider>
              <v-card :to="`/article/${content.id}`">
                <v-row>
                  <v-col cols="8">
                    <v-row>
                      <v-col>
                        <v-card-title>{{ content.title }}</v-card-title>
                        <v-card-text class="ml-3 mb-3" v-html="content.content"></v-card-text>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col offset="2">
                    <v-img :src="imgList[0]" transition="slide-y-reverse-transition" max-height="150" class="my-n3"
                           :aspect-ratio="1"></v-img>
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
import {Ref} from '@vue/runtime-core'
import {onMounted, ref} from 'vue'
import {useAxiosGetSearchArticle, useRoute} from '#imports'

let imgList = ['https://tva1.sinaimg.cn/large/005NWBIgly1go817vkbb4j30vl0jencd.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1go8137lfsdj30rx0rw0up.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1gomphp0l22j31hc0u0wiq.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1go8137joftj30pc0oe75u.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1go8137mdujj30k70k70x2.jpg',
]
let searchListContent = ref<Array<searchContent>>()
let Route = useRoute()
const params = ref({size: 10, page: 1, order: null, properties: null})
const totalPages = ref(null)
const alert = ref(false)
const totalElements = ref(0)
const loading = ref(true)
onMounted(async () => {
  document.title = '搜索:' + Route.params.query
  let {data: searchRet} = await useAxiosGetSearchArticle(Route.params.query, params.value)
  totalElements.value = searchRet.data.totalElements
  searchListContent.value = searchRet.data.content
  totalPages.value = searchRet.data.totalPages
  document.body.onscroll = loadingWin
  loading.value = false
})

const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  //滚动条滚动距离
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  //窗口可视范围高度
  var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop + 100 >= scrollHeight) {
    console.log('loading more')
    await loadingMore()
  }
}

const loadingMore = async () => {
  if (params.value.page >= Number(totalPages.value)) {
    if (searchListContent.value.length > 10) {
      alert.value = true

    }
    return
  }
  params.value.page += 1
  let {data: searchRetNew} = await useAxiosGetSearchArticle(Route.params.query, params.value)
  searchListContent.value.push(...searchRetNew.data.content)
}

</script>

<script lang="ts">

export interface TagList {
  id: string;
  name: string;
}

export interface searchContent {
  id: string;
  userId: string;
  userNickName: string;
  title: string;
  content: string;
  summary: string;
  group: string;
  tagList: TagList[];
  viewNum: number;
  collectNum: number;
  upNum: number;
  downNum: number;
  suggestion?: any;
  createTime?: string
}
</script>
<style scoped>
:deep(a) {
  text-decoration: none;
  color: inherit;
}

:deep(em) {
  font-style: normal
}

:deep(.highlight) {
  color: #f73131
}
</style>