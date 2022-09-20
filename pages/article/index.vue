<template>
  <div>
    <Group></Group>
    {{}}
    <v-divider class="my-4"></v-divider>
    <List v-for="data in listContent " v-bind="data" :key="data.id"></List>
  </div>
</template>
  
<script setup lang="ts">
import List, { articleListData } from "~~/components/article/index/list.vue";
import Group from "~~/components/article/index/group.vue";
import { useWindowScroll } from '@vueuse/core'

const { x, y } = useWindowScroll()
const { data: listData } = await useFetchGetArticleList()
let listContent: Array<articleListData> = listData.content
let page = ref(1)
onMounted(() => {

  document.body.onscroll = loadingWin

});

const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //滚动条滚动距离
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  //窗口可视范围高度
  var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);

  if (clientHeight + scrollTop+100 >= scrollHeight) {
    console.log("===加载更多内容……===");
    await loadingMore()
  }else{
    console.log(scrollHeight);
    console.log(scrollTop);
    console.log(clientHeight);
    console.log("--------------------");
    console.log(y.value);
    console.log("-----------------------");
    
    
    
    
  }
}

const loadingMore = async () => {
  const { data: listData } = await useFetchGetArticleList({ page: ++page.value })
  listContent.push(...listData.content)
  removeEventListener("document.body.onscroll ", loadingWin)
  document.body.onscroll = null
  document.body.onscroll = loadingWin
  console.log(listContent);

}
</script>
  
<style lang="scss" scoped>

</style>