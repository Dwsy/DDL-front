<template>
  <div class="mt-4">
    <Style id="highlightStyle" type="text/css" :children="HighlightStyle"/>
    <Style id="markdownTheme" type="text/css" :children="MarkdownTheme"/>
    <v-row>
      <v-col cols="10">
        <v-row>
          <v-col>
            <v-row>
              <v-col cols=1>
                <client-only>
                  <div class="text-center" style="margin-top: 90px">
                    <v-btn icon="true" elevation="0">
                      <v-icon class="text-grey">mdi-triangle
                      </v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个问题有用且描述清晰
                      </v-tooltip>
                    </v-btn>

                    <p> {{ questionStore.filed.upNum - questionStore.filed.downNum }}</p>
                    <v-btn icon="true" elevation="0">
                      <v-icon class="text-grey mdi-rotate-180">mdi-triangle</v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个问题没有认真研究用或描述不清晰
                      </v-tooltip>
                    </v-btn>
                    <br>
                    <v-btn icon="true" elevation="0" class="mt-2" size="small">
                      <v-icon class="text-grey">mdi-book-heart-outline</v-icon>
                      <v-tooltip activator="parent" location="right">
                        收藏并跟踪这个问题
                      </v-tooltip>
                    </v-btn>
                  </div>
                </client-only>

              </v-col>
              <v-col cols=11>
                <div class="text-h5"> {{ questionStore.filed?.title }}</div>

                <div class="mt-1">
                  <v-avatar>
                    <v-img :src="questionStore.filed.user.userInfo.avatar"></v-img>
                  </v-avatar>

                  <span class="mr-4 text-blue">{{ questionStore.filed.user.nickname }}</span>

                  <span>发起于：{{ dateFilter(questionStore.filed.createTime, 'YYYY年MM月DD日') }}</span>
                  <span class="ml-4">修改：{{
                      dateFilter(questionStore.filed.lastModifiedTime, 'YYYY年MM月DD日')
                    }}</span>

                </div>

                <div class="markdown-body" v-html="questionStore.content"></div>

                <v-chip-group class="mt-7">
                  <v-chip v-for="tag in questionStore.filed.questionTags" :key="tag.id" size="small">
                    <v-icon>
                      mdi-language-{{ tag.name.toLocaleLowerCase() }}
                    </v-icon>
                    {{ tag.name }}
                  </v-chip>
                </v-chip-group>
                <v-divider class="my-3"></v-divider>
                <v-row class="">
                  <v-col>
                    <v-btn variant="outlined">
                      <v-tooltip activator="parent" location="top">
                        回答问题
                      </v-tooltip>
                      回答
                    </v-btn>

                    <v-btn class="mx-4" variant="outlined">
                      关注
                      <v-tooltip activator="parent" location="top">
                        关注跟踪这个问题，当有新的回答时会收到通知
                      </v-tooltip>
                    </v-btn>
                  </v-col>

                </v-row>
                <v-divider class="my-3"></v-divider>

                <div>
                  <div class="pa-2 text-h6">
                    {{ questionStore.filed.answerNum }}个回答
                  </div>
                </div>
                <v-row>

                </v-row>
              </v-col>
            </v-row>
            <v-row class="mt-4">
              <v-col cols=1>
                <client-only>
                  <div class="text-center">
                    <v-btn icon="true" elevation="0">
                      <v-icon class="text-grey">mdi-triangle
                      </v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个回答有用
                      </v-tooltip>
                    </v-btn>

                    <p> {{ questionStore.filed.upNum - questionStore.filed.downNum }}</p>
                    <v-btn icon="true" elevation="0">
                      <v-icon class="text-grey mdi-rotate-180">mdi-triangle</v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个回答没有用
                      </v-tooltip>
                    </v-btn>
                    <br>
                    <v-btn icon="true" elevation="0" class="mt-2" size="small">
                      <v-icon class="text-grey">mdi-book-heart-outline</v-icon>
                      <v-tooltip activator="parent" location="right">
                        收藏这个回答
                      </v-tooltip>
                    </v-btn>
                  </div>
                </client-only>
              </v-col>
              <v-col cols=11>
                <template v-for="answer in answerStore.dataList">
                  <v-card class="pa-4">
                    <!--                    <v-row>-->
                    <!--                      <v-col>-->
                    <div v-html="answer.textHtml" class="markdown-body"></div>
                    <div class="mt-4">
                      <div class="float-left">
                        <v-btn variant="outlined">
                          <v-tooltip activator="parent" location="top">
                            回答问题
                          </v-tooltip>
                          回答
                        </v-btn>

                        <v-btn class="mx-4" variant="outlined">
                          关注
                          <v-tooltip activator="parent" location="top">
                            关注跟踪这个问题，当有新的回答时会收到通知
                          </v-tooltip>
                        </v-btn>
                      </div>
                      <div class="text-end float-right">
                        <v-avatar>
                          <v-img :src="answer.user.userInfo.avatar"></v-img>
                        </v-avatar>
                        <span>{{ answer.user.nickname }}/</span>
                        <span>{{ dateFilter(answer.createTime) }}</span>
                      </div>
                    </div>
                    <!--                      </v-col>-->
                    <!--                    </v-row>-->
                  </v-card>
                </template>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        Related
        <div v-for="i in 50">
          <p>{{ i }}</p>
        </div>
      </v-col>

    </v-row>


  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import {useQuestionStore} from '~/stores/question/questionStore'
import {useCookie, useRoute} from '#app'
import {dateFilter} from '~/composables/useTools'
import {onMounted, watch} from 'vue'
import {changeHighlightStyle} from '~/constant/highlightStyleList'
import {changeThemes, themes} from '~/constant/markdownThemeList'
import {useFetchGetQuestionContent, useFetchGetQuestionField} from '~/composables/Api/question'
import {useTheme} from 'vuetify'
import {useAnswerStore} from '~/stores/question/answerStore'

const themeInstance = useTheme()
const questionId = String(useRoute().params.qid)
const questionStore = useQuestionStore()
const answerStore = useAnswerStore()
const responseData = await useFetchGetQuestionField(questionId)
if (responseData.code === 0) {
  questionStore.filed = responseData.data
  const contentResponseData = await useFetchGetQuestionContent(questionId)
  if (contentResponseData.code === 0) {
    questionStore.content = contentResponseData.data
  }
  questionStore.cookieThemeState = useCookie('theme')
} else {
  console.log(responseData.msg)
}
questionStore.init(questionId)

let HighlightStyle
let MarkdownTheme
if (typeof window !== 'undefined') {
  HighlightStyle = await changeHighlightStyle(questionStore.getHighlightStyleName(), true)
  MarkdownTheme = await changeThemes(themes[questionStore.getMarkdownThemeName()], true)
}

onMounted(async () => {
  await answerStore.loadAnswer(questionId)
  watch(themeInstance.global.name, async (val) => {
    if (val === 'dark') {
      await questionStore.changeThemeDark()
      await questionStore.changeHighlightStyleDark()
    } else {
      await questionStore.changeThemeLight()
      await questionStore.changeHighlightStyleLight()
    }
  })
  hljs.highlightAll()
})


</script>

<style scoped>

</style>