<template>
  <div>
    <v-tabs v-model="tab" v-if="counts">
      <v-tab value="all">全部 {{ counts['ALL'] }}</v-tab>
      <v-tab value="ask">发起 {{ counts['ASK'] }}</v-tab>
      <v-tab value="resolved">以解决 {{ counts['RESOLVED'] }}</v-tab>
      <v-tab value="have_answer">以有答案 {{ counts['HAVE_ANSWER'] }}</v-tab>
      <v-tab value="hide">已隐藏 {{ counts['HIDE'] }}</v-tab>
      <v-tab value="unresolved">未解决 {{ counts['UNRESOLVED'] }}</v-tab>
      <v-tab value="auditing">审核中 {{ counts['AUDITING'] }}</v-tab>
      <v-tab value="rejected">未通过 {{ counts['REJECTED'] }}</v-tab>
    </v-tabs>
    <div v-for="question in ListContent">
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
            <div class="float-left">
              <div class="text-subtitle-2">
                {{ question.summary }}
              </div>
              <v-chip-group>
                <v-chip v-for="tag in question.questionTags" :key="tag.id" :color="getRandomColor()" size="small">
                  <v-icon>
                    mdi-language-{{ tag.name.toLocaleLowerCase() }}
                  </v-icon>
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </div>
            <div class="text-end">
              <span class="mr-2 text-grey" style="font-size: 16px"
                    :title="dateFilter(question.createTime, 'YYYY/MM/DD hh:mm')"
                    v-if="dateFilter(question.createTime,'YYYY-MM-DD hh:mm')!==dateFilter(question.lastModifiedTime,'YYYY-MM-DD hh:mm')">
                      修改于：{{ timeAgoFilter(question.lastModifiedTime) }}
                    </span>

              <span style="font-size: 16px"> {{ timeAgoFilter(question.createTime) }}发起提问</span>
              <div>
                <span :style="{color: QuestionStateColor[question.questionState]}">
                        {{ QuestionStateZh[question.questionState] }}
                </span>
                <v-btn variant="tonal" class="mx-2" color="#028760" :href="`/question/ask?id=${question.id}`"
                       target="_blank">
                  编辑
                </v-btn>
                <v-btn variant="tonal" color="red">
                  删除
                </v-btn>
              </div>
            </div>

            <!--            <v-row>-->
            <!--              <v-col cols="8">-->
            <!--                <v-chip-group class="mt-7">-->
            <!--                  <v-chip v-for="tag in question.questionTags" :key="tag.id" :color="getRandomColor()" size="small">-->
            <!--                    <v-icon>-->
            <!--                      mdi-language-{{ tag.name.toLocaleLowerCase() }}-->
            <!--                    </v-icon>-->
            <!--                    {{ tag.name }}-->
            <!--                  </v-chip>-->
            <!--                </v-chip-group>-->
            <!--              </v-col>-->
            <!--              <v-col offset="1" class="mt-2">-->

            <!--                          <span class="mr-2 text-grey" style="font-size: 16px"-->
            <!--                                :title="dateFilter(question.createTime, 'YYYY/MM/DD hh:mm')"-->
            <!--                                v-if="dateFilter(question.createTime,'YYYY-MM-DD hh:mm')!==dateFilter(question.lastModifiedTime,'YYYY-MM-DD hh:mm')">-->
            <!--          修改于：{{ timeAgoFilter(question.lastModifiedTime) }}-->
            <!--        </span>-->
            <!--                <v-col>-->
            <!--                  <span> {{ timeAgoFilter(question.createTime) }}发起提问</span>-->
            <!--                </v-col>-->

            <!--              </v-col>-->
            <!--            </v-row>-->
          </v-col>
        </v-row>
      </v-card>
      <v-divider></v-divider>
    </div>
    <v-container class="max-width ml-n16">
      <v-pagination v-model="params.page" class="ml-n16"
                    :length="totalPages">
      </v-pagination>
    </v-container>


  </div>
</template>

<script setup lang="ts">
import {computed, inject, onMounted, ref, watch, watchEffect} from 'vue'
import {onBeforeRouteUpdate, useRoute, useRouter} from 'vue-router'
import {articleListData} from '~/types/article'
import {useAxiosGetArticleList} from '~/composables/Api/article'
import {ArticleState, GetUserArticleListParams} from '~/types/article/manageArticle'
import {useAxiosGetArticleCountByState, useAxiosGetUserArticleList} from '~/composables/Api/article/manageArticle'
import {QuestionField, QuestionState, QuestionStateColor, QuestionStateZh} from '~/types/question'
import {GetUserQuestionListParams} from '~/types/message/manage'
import {useAxiosGetUserQuestionList} from '~/composables/Api/question/manageQuestion'
import {dateFilter, getRandomColor, timeAgoFilter} from '~/composables/useTools'

const route = useRoute()
const router = useRouter()
const tab = ref()
const ListContent = ref<Array<QuestionField>>(null)
// const allListContent = ref<Array<articleListData>>(null)
// const publishedListContent = ref<Array<articleListData>>(null)
// const hideListContent = ref<Array<articleListData>>(null)
// const auditingListContent = ref<Array<articleListData>>(null)
// const rejectedListContent = ref<Array<articleListData>>(null)
const totalPages = ref(null)
const params = ref<GetUserQuestionListParams>({
  order: null,
  page: 1,
  properties: null,
  size: 8,
  state: QuestionState.ALL,
  tagId: null
})
// const counts = ref({})

const counts = inject('questionCounts')
onMounted(async () => {
  if (route.query.state) {
    if (route.query.state === 'draft') {
      tab.value = 'all'
    } else {
      tab.value = String(route.query.state)
    }
  } else {
    console.log('route.query.state', route.query.state)
    let href = window.location.href
    window.history.replaceState({}, 'title', href + '?state=all')
  }
  watchEffect(async () => {
    params.value.state = tab.value
    const {data: listData} = await useAxiosGetUserQuestionList(params.value)
    if (listData.code === 0) {
      scrollTo(0, 0)
      totalPages.value = listData.data.totalPages
      ListContent.value = listData.data.content
    }
  })

  watch(tab, async (val) => {
    params.value.page = 1
    let href = window.location.href
    let replaceId = 'state=' + val
    window.history.replaceState({}, 'title', href.replace(/state=\w+/i, replaceId))
  })

})

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.query.state) {
    tab.value = String(to.query.state)
    next(false)
  }
  next()
})

</script>

<style scoped>

</style>