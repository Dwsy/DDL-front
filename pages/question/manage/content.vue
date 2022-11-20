<template>


  <div>
    <v-tabs v-model="tab" active-class="d-article-tabs-active-class" transition="fade-transition">
      <v-tab value="null" v-show="false"></v-tab>
      <v-tab value="question">问题</v-tab>
      <v-tab value="draft">草稿箱 {{ counts['DRAFT'] }}</v-tab>
    </v-tabs>

    <v-divider></v-divider>
    <v-window v-model="tab" transition="fade-transition">
      <v-window-item value="null"></v-window-item>
      <v-window-item value="question">
        <QuestionAsked></QuestionAsked>
      </v-window-item>

      <v-window-item value="draft">
        <div v-for="question in draftListContent">
          <v-card class="my-2" elevation="0">
            <v-row style="font-size: 110%">
              <v-col cols="2">
                <v-row>
                  <v-col>
                    <div style="font-size: 10px;color: #3271ae">回答:{{ question.answerNum }}</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div style="font-size: 10px;color: #007b43">关注:9999</div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <div style="font-size: 10px;color: #ec6800">浏览{{ question.viewNum }}</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="ml-n16">
                <a target="_blank" :href='/question/+question.id' class="text-subtitle-1"> {{ question.title }}</a>
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="8">
                    <v-chip-group class="mt-7">
                      <v-chip v-for="tag in question.questionTags" :key="tag.id" :color="getRandomColor()" size="small">
                        <v-icon>
                          mdi-language-{{ tag.name.toLocaleLowerCase() }}
                        </v-icon>
                        {{ tag.name }}
                      </v-chip>
                    </v-chip-group>
                  </v-col>
                  <v-col offset="1" class="mt-2">
                    <v-row>
                      <v-col>
                        <!--                          <v-avatar size="small">-->
                        <!--                            <v-img :src="question.user.userInfo.avatar"></v-img>-->
                        <!--                          </v-avatar>-->
                        <!--                          <span class="text-blue-accent-1" style="font-size: 10px">{{ question.user.nickname }}</span>-->
                        <!--                  <div> {{ dateFilter(createTime, 'MM月DD') }}～发起提问</div>-->
                        <span> {{ timeAgoFilter(question.createTime) }}发起提问</span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-divider></v-divider>
        </div>
        <v-container class="max-width ml-n16">
          <v-pagination v-model="params.page" class="my-4"
                        :length="totalPages">
          </v-pagination>
        </v-container>
      </v-window-item>

    </v-window>
  </div>

</template>

<script setup lang="ts">
import {onMounted, provide, ref, watchEffect} from 'vue'


import {warningMsg} from '~/composables/utils/toastification'
import {useRoute} from '#app'
import QuestionAsked from '~/components/question/manage/questionAsked.vue'
import {QuestionField, QuestionState} from '~/types/question'
import {useAxiosGetQuestionCountByState, useAxiosGetUserQuestionList} from '~/composables/Api/question/manageQuestion'
import {GetUserQuestionListParams} from '~/types/message/manage'
import {dateFilter, getRandomColor, timeAgoFilter} from '~/composables/useTools'
const tab = ref('null')
const counts = ref({})
const draftListContent = ref<Array<QuestionField>>(null)
const totalPages = ref(null)


const params = ref<GetUserQuestionListParams>({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  state: QuestionState.DRAFT,
  tagId: null
})
const route = useRoute()
provide('questionCounts', counts)
onMounted(async () => {
  if (String(route.query.state) === 'draft') {
    tab.value = String(route.query.state)
  } else {
    setTimeout(() => {
      tab.value = 'question'
    }, 100)
    //fixme 组件会onMounted 先这么解决了
  }
  const {data: countsRes} = await useAxiosGetQuestionCountByState()
  counts.value = countsRes.data

  watchEffect(async () => {
    if (tab.value === 'draft') {
      let href = window.location.href
      let replaceId = 'state=' + 'draft'
      window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
      const {data: axiosResponse} = await useAxiosGetUserQuestionList(params.value)
      if (axiosResponse.code === 0) {
        draftListContent.value = axiosResponse.data.content
        totalPages.value = axiosResponse.data.totalPages
        scrollTo(0, 0)
      } else {
        warningMsg(axiosResponse.msg)
      }
    }
    if (tab.value === 'question') {
      let href = window.location.href
      let replaceId = 'state=' + 'all'
      window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
    }
  })
})
</script>

<style scoped>
:deep(.v-slide-group-item--active) {
  color: dodgerblue;
  font-size: 90%;
}
</style>



