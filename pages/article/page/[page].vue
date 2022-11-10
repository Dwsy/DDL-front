<template>
  <div>
    <Group @select-tag="selectTag"></Group>
    <v-divider class="my-4"></v-divider>

    <List v-for="data in listContent " v-bind="data" :key="data.id"></List>


    <v-row>
      <v-col cols="10">
        <v-container class="max-width">
          <v-pagination v-model="urlPage" class="my-4" :length="totalPages"></v-pagination>
        </v-container>
      </v-col>
    </v-row>

  </div>
</template>
  
<script setup lang="ts">
// 搜索引擎 分页模式 SEO
import List, { articleListData } from "~~/components/article/index/list.vue";
import Group from '~~/components/article/index/group.vue'
import {onMounted, watch} from 'vue'
import {useFetchGetArticleList} from '~/composables/Api/article'

// import { useWindowScroll } from '@vueuse/core'
// const { x, y } = useWindowScroll()
// onMounted(() => {
//   document.body.onscroll = loadingWin
// });
const p = useRoute().params.page
const urlPage = ref(Number(p))

onMounted(() => {
  watch(urlPage, async (p) => {
    params.value.page = p
    // useRouter().push(`/`)
    window.scrollTo(0, 0)
    useRouter().push(`/article/page/${p}`)

    // const data = (await useFetchGetArticleList(params.value)).data
    // listContent.value = data.content
  })
})
const params = ref({ size: 8, page: urlPage.value, tagId: null, order: null, properties: null })
const { data: listData } = await useFetchGetArticleList(params.value)
const listContent = ref<Array<articleListData>>(null)
listContent.value = listData.content
// const page = ref(1)
const totalPages = ref(null)
totalPages.value = listData.totalPages
const alert = ref(false)

const selectTag = async (tagID) => {
  // console.log(tagID);
  params.value.tagId = tagID
  // page.value = 1
  alert.value = false
  const data = (await useFetchGetArticleList(params.value)).data
  listContent.value = data.content
  totalPages.value = data.totalPages

}

// const loadingWin = async () => {
//   //文档内容实际高度（包括超出视窗的溢出部分）
//   var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
//   //滚动条滚动距离
//   var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
//   //窗口可视范围高度
//   var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
//   if (clientHeight + scrollTop + 100 >= scrollHeight) {
//     console.log("loading more");
//     await loadingMore()
//   }
// }

// const loadingMore = async () => {
//   if (page.value >= Number(totalPages.value)) {
//     if (listContent.value.length > 8) {
//       alert.value = true
//     }
//     return
//   }
//   console.log("page", page.value);
//   console.log("totalPages", totalPages.value);

//   page.value += 1
//   const { data: listDataNew } = await useFetchGetArticleList(params.value)
//   listContent.value.push(...listDataNew.content)
// }
</script>
  
<style lang="scss" scoped>

</style>