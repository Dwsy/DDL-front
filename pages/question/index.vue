<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col>
      <v-card>
        <v-tabs v-model="tab" align-tabs="start" background-color="primary">
          <div class="v-btn v-btn--density-default rounded-0 v-btn--variant-text v-tab">问答</div>
          <v-divider :vertical="true" class="mr-4"></v-divider>
          <v-tab value="new">最新</v-tab>
          <v-tab value="recommend">推荐</v-tab>
          <v-tab value="unanswered">待回答</v-tab>
          <v-tab value="hot">最热</v-tab>
        </v-tabs>

        <v-card-text>
          <v-window v-model="tab">
            <v-window-item value="new">
              <div v-for="question in questionIndexStore.dataList">
                <QuestionListCard v-bind="question"></QuestionListCard>
              </div>
            </v-window-item>

            <v-window-item value="two"> Two </v-window-item>

            <v-window-item value="three"> Three </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4"></v-col>
  </v-row>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue'
import { useQuestionIndexStore } from '~/stores/question/questionIndexStore'
import { useRouter } from '#app'
import QuestionListCard from '~~/components/question/questionListCard.vue'

const questionIndexStore = useQuestionIndexStore()

const tab = ref()

await questionIndexStore.loadNewQuestion()

onMounted(async () => {
  watchEffect(() => {
    useRouter().push({ query: { tab: tab.value } })
  })
  watch(tab, (tabValue) => {
    questionIndexStore.page = 1
    console.log(tabValue)
  })
})
onUnmounted(async () => {
  await useRouter().push({ query: {} })
  questionIndexStore.$reset()
})
</script>

<style scoped></style>
