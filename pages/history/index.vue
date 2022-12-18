<template>
  <v-row>
    <v-col cols="8">
      <UserHistoryCardList :user-history-data-list="historyDataList" />
      <div v-if="Null" class="text-center text-h1 mt-16">空</div>
    </v-col>
    <!--    <v-divider :vertical="true"></v-divider>-->
    <v-divider :vertical="true"></v-divider>
    <v-col>
      <div class="test">
        {{ historyDataList.length }}
        <v-radio-group v-model="type" class="pa-5">
          <v-radio value="all" class="my-2">
            <template v-slot:label>
              <div class="text-lg">全部</div>
            </template>
          </v-radio>
          <v-divider></v-divider>
          <v-radio value="article" class="my-2">
            <template v-slot:label>
              <div class="text-lg">文章</div>
            </template>
          </v-radio>
          <v-divider></v-divider>
          <v-radio value="question" class="my-2">
            <template v-slot:label>
              <div class="text-lg">问答</div>
            </template>
          </v-radio>
          <v-divider></v-divider>
          <v-radio value="infinity" class="my-2">
            <template v-slot:label>
              <div class="text-lg">动态</div>
            </template>
          </v-radio>
          <v-divider></v-divider>
        </v-radio-group>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import {
  getHistoryType,
  useAxiosGetUserHistory,
  UserHistoryI,
} from '~/composables/Api/user/history'
import { warningMsg } from '~/composables/utils/toastification'
import { watch, ref } from 'vue'
import UserHistoryCardList from '~/components/user/history/userhistoryCardList.vue'
import { useFetchGetArticleList } from '~/composables/Api/article'
import { useLoadingWin } from '~/composables/useTools'

const type = ref<getHistoryType>('all')
const historyDataList = ref<UserHistoryI[]>([])
const Null = ref()
const page = ref(1)
const totalPages = ref(0)
onMounted(async () => {
  await loadHistory()
  watch(type, async () => {
    page.value = 1
    await loadHistory()
  })
  document.body.onscroll = useLoadingWin(loadingMore)
})

const loadHistory = async () => {
  const { data: axiosResponse } = await useAxiosGetUserHistory(type.value, page.value)
  if (axiosResponse.code === 0) {
    if (axiosResponse.data == null) {
      historyDataList.value = []
      Null.value = true
      return
    }
    if (page.value == 1) {
      totalPages.value = axiosResponse.data.totalPages
      historyDataList.value = axiosResponse.data.content
    } else {
      historyDataList.value.push(...axiosResponse.data.content)
    }
  } else {
    warningMsg(axiosResponse.msg)
  }
}

const loadingMore = async () => {
  if (page.value >= Number(totalPages.value)) {
    if (historyDataList.value.length > 8) {
      // alert.value = true
      document.body.onscroll = null
    }
    return
  }
  page.value += 1
  await loadHistory()
}
</script>

<style scoped>
.test {
  /*left: px;*/
  /*z-index: 1004;*/
  /*transform: translateX(0%);*/
  position: fixed;
  /*height: calc((100% - 48px) - 0px);*/
  top: 5%;
  right: 15%;
  bottom: 0;
  width: 15%;
}

.test1 {
  /*left: px;*/
  /*z-index: 1004;*/
  /*transform: translateX(0%);*/
  position: sticky;
  /*height: calc((100% - 48px) - 0px);*/
  top: 10%;
  right: 15%;
  bottom: 0;
  /*width: 1%;*/
}
</style>
