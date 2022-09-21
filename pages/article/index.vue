<template>
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
</template>
  
<script setup lang="ts">
import List, { articleListData } from "~~/components/article/index/list.vue";
import Group from "~~/components/article/index/group.vue";
// import { useWindowScroll } from '@vueuse/core'
// const { x, y } = useWindowScroll()
onMounted(() => {
  document.body.onscroll = loadingWin
});
// const page = ref(1)
const params = ref({ size: 8, page: 1, tagId: null, order: null, properties: null })

const { data: listData } = await useFetchGetArticleList(params.value)
const listContent = ref<Array<articleListData>>(null)
listContent.value = listData.content

const totalPages = ref(null)
totalPages.value = listData.totalPages
const alert = ref(false)

const selectTag = async (tagID) => {
  console.log(tagID);
  params.value.tagId = tagID
  params.value.page=1
  // page.value = 1
  alert.value = false
  const data = (await useFetchGetArticleList(params.value)).data
  listContent.value = data.content
  totalPages.value = data.totalPages

}

const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //滚动条滚动距离
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  //窗口可视范围高度
  var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);
  if (clientHeight + scrollTop + 100 >= scrollHeight) {
    console.log("loading more");
    await loadingMore()
  }
}

const loadingMore = async () => {
  if (params.value.page >= Number(totalPages.value)) {
    if (listContent.value.length > 8) {
      alert.value = true
    }
    return
  }


  params.value.page += 1

  
  const { data: listDataNew } = await useFetchGetArticleList(params.value)
  listContent.value.push(...listDataNew.content)
}
</script>
  
<style lang="scss" scoped>

</style>