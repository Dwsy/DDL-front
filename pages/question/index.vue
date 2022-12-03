<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col>
      <v-card>
        {{selectTab}}
        <v-tabs v-model="selectTab" align-tabs="start" background-color="primary">
          <div class="v-btn v-btn--density-default rounded-0 v-btn--variant-text v-tab">问答</div>
          <v-divider :vertical="true" class="mr-4"></v-divider>
          <v-tab value="last">最新</v-tab>
          <v-tab value="recommend">推荐</v-tab>
          <v-tab value="unanswered">待回答</v-tab>
          <v-tab value="hot">最热</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="selectTab">
            <v-window-item value="last">
              <div v-for="question in questionIndexStore.dataList">
                <QuestionListCard v-bind="question"></QuestionListCard>
              </div>
            </v-window-item>

            <v-window-item value="two"> Two </v-window-item>

            <v-window-item value="three"> Three </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
      <v-alert v-if="alert">
        <v-alert-title>
          <v-icon>mdi-alert</v-icon>
          <span>到底了</span>
        </v-alert-title>
      </v-alert>
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, onUnmounted, ref, watch, watchEffect } from "vue";
import { useQuestionIndexStore } from '~/stores/question/questionIndexStore'
import { useRouter, useState } from '#app'
import QuestionListCard from '~~/components/question/questionListCard.vue'
import { useLoadingWin } from "~/composables/useTools";

const questionIndexStore = useQuestionIndexStore()
definePageMeta({
  scrollToTop: true,
  name: 'question',
  key:'question',
  keepalive:false,
})
const selectTab = useState()
const router = useRouter()
await questionIndexStore.loadQuestion()
watchEffect(async () => {

  // router.push({ query: { tab: selectTab.value } })
})
watch(selectTab, async (tabValue:string) => {
  questionIndexStore.page = 1
  console.log(tabValue)
  await navigateTo({
    query: {
      tab: tabValue,
    }
  })
})
onMounted(async () => {
  document.body.onscroll=useLoadingWin(loadingMore)
})
// onBeforeUnmount(() => {
//
// })
// onUnmounted(async () => {
// document.body.onscroll = null
//   await router.push({ query: {} })
//   questionIndexStore.$reset()
// })
const alert = ref()
const loadingMore = async () => {
  if (questionIndexStore.page >= questionIndexStore.totalPages) {
    if (questionIndexStore.dataList.length > (8*2)) {
      alert.value = true
      document.body.onscroll = null
    }
    return
  }
  questionIndexStore.page++
  await questionIndexStore.loadQuestion()
}
</script>

<style scoped></style>
