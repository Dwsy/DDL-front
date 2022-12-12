<template>
  <v-row>
    <v-col cols="6">
      <div class="text-h4 text-center mb-4">文章</div>
      <v-tabs v-model="articleTab">
        <v-tab value="1">今日热门</v-tab>
        <v-tab value="3">三日榜</v-tab>
        <v-tab value="7">七日榜</v-tab>
      </v-tabs>
      <v-chip-group mandatory>
        <v-chip @click="changeArticleGroup(null)">综合</v-chip>
        <v-chip @click="changeArticleGroup(2)">前端</v-chip>
        <v-chip @click="changeArticleGroup(1)">后端</v-chip>
      </v-chip-group>
      <ArticleRankList :data="articleRankDataList" />
    </v-col>

    <v-col cols="6">
      <div class="text-h4 text-center mb-4">问答</div>
      <v-tabs v-model="questionTab">
        <v-tab value="1">今日热门</v-tab>
        <v-tab value="3">三日榜</v-tab>
        <v-tab value="7">七日榜</v-tab>
      </v-tabs>

      <v-chip-group mandatory>
        <v-chip @click="changeQuestionGroup(null)">综合</v-chip>
        <v-chip @click="changeQuestionGroup(1)">前端</v-chip>
        <v-chip @click="changeQuestionGroup(3)">后端</v-chip>
      </v-chip-group>
      <QuestionRankList :data="questionRankDataList" />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import ArticleRankList from '~/components/article/rankList.vue'
import QuestionRankList from '~/components/question/rankList.vue'
import { watchEffect, ref } from 'vue'
import {
  ArticleRankDataI,
  rankParamsI,
  useAxiosGetArticleRank,
} from '~/composables/Api/article/rank'
import { QuestionRankDataI, useAxiosGetQuestionRank } from '~/composables/Api/question/rank'
import { definePageMeta } from '#imports'
const articleTab = ref()
const questionTab = ref()
const articleRankParams = ref<rankParamsI>({ daysAgo: 1, size: 30, groupId: null })
const articleRankDataList = ref<ArticleRankDataI[]>()
const questionRankParams = ref<rankParamsI>({ daysAgo: 1, size: 30, groupId: null })
const questionRankDataList = ref<QuestionRankDataI[]>()
const articleGroup = ref()
onMounted(async () => {
  loadArticleRank().then()
  loadQuestionRank().then()
  document.getElementsByTagName('html')[0].style.overflow = 'hidden'
  watch(articleTab, async () => {
    articleRankParams.value.daysAgo = Number(articleTab.value)
    await loadArticleRank()
  })
  watch(questionTab, async () => {
    questionRankParams.value.daysAgo = Number(questionTab.value)
    await loadQuestionRank()
  })
  // watchEffect(async () => {
  //   await useAxiosGetArticleRank(articleRankParams.value)
  // })
})
onBeforeUnmount(() => {
  document.getElementsByTagName('html')[0].style.overflow = 'auto'
})

const loadArticleRank = async () => {
  const { data: articleRankDataR } = await useAxiosGetArticleRank(articleRankParams.value)
  if (articleRankDataR.code == 0) {
    articleRankDataList.value = articleRankDataR.data
  } else {
    errorMsg(articleRankDataR.msg)
  }
}
const loadQuestionRank = async () => {
  const { data: questionRankR } = await useAxiosGetQuestionRank(questionRankParams.value)
  if (questionRankR.code == 0) {
    questionRankDataList.value = questionRankR.data
  } else {
    errorMsg(questionRankR.msg)
  }
}

const changeArticleGroup = (id) => {
  articleRankParams.value.groupId = id
  loadArticleRank()
}
const changeQuestionGroup = (id) => {
  questionRankParams.value.groupId = id
  loadQuestionRank()
}
</script>

<style scoped></style>
