<template>
  <div class="mt-4">
    <Style id="highlightStyle" type="text/css" :children="HighlightStyle"/>
    <Style id="markdownTheme" type="text/css" :children="MarkdownTheme"/>
    <v-row>
      <v-col cols="10">
        <!--        <v-btn href="#answerId-1588022587668037632+#test"></v-btn>-->
        <v-row>
          <v-col>
            <v-row>
              <v-col cols=1>
                <client-only>
                  <div class="text-center" style="margin-top: 90px">
                    <v-btn icon="true" elevation="0"
                           @click="answerStore.action({
                           answerType: AnswerType.up,
                           questionFieldId: questionId,
                           actionAnswerOrCommentId: '-1'
                           })">
                      <v-icon class="text-grey"
                              :color="questionStore.getActionColor(AnswerType.down)"
                      >mdi-triangle
                      </v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个问题有用且描述清晰
                      </v-tooltip>
                    </v-btn>

                    <p> {{ questionStore.filed.upNum - questionStore.filed.downNum }}</p>
                    <v-btn icon="true" elevation="0"
                           @click="answerStore.action({
                           answerType: AnswerType.down,
                           questionFieldId: questionId,
                           actionAnswerOrCommentId: '-1'
                           })">
                      <v-icon class="text-grey mdi-rotate-180"
                              :color="questionStore.getActionColor(AnswerType.down)"
                      >mdi-triangle
                      </v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个问题没有认真研究用或描述不清晰
                      </v-tooltip>
                    </v-btn>
                    <br>


                    <v-dialog
                        v-model="collectionDialog"
                        persistent
                    >

                      <template v-slot:activator="{ props }">
                        <v-btn icon="true" elevation="0" class="mt-2" size="small"
                               @click="openCollectionDialog(1,questionId)">
                          <!--                               @click="openCollectionDialog(collectionType.Question,questionId)">-->
                          <v-icon class="text-grey">mdi-book-heart-outline</v-icon>
                          <v-tooltip activator="parent" location="right">
                            收藏并跟踪这个问题
                          </v-tooltip>
                        </v-btn>
                        <div v-if="questionStore.filed.collectNum>0" class="text-grey">
                          {{ questionStore.filed.collectNum }}
                        </div>
                      </template>
                      <div style="margin-left: 25%">
                        <v-card class="text-center" style="width: 600px">
                          <v-card-title>
                            <span class="text-h6 ml-8">添加到收藏夹</span>
                          </v-card-title>
                          <div class="d-flex my-n6 px-4" v-for="group in collectionGroupList" :key="group.id">
                            {{ group.select }}
                            <v-checkbox
                                v-model="group.select"
                                :label="group.groupName"
                                :model-value="group.select"
                                class="pr-2"
                                @change="addCollectionToGroup(group.id,group.select)"
                            ></v-checkbox>
                            <span class="pt-4">
                              {{ group.collectionNum }} / 999
                            </span>

                          </div>
                          <v-divider class="my-3"></v-divider>
                          <v-row class="pa-4 ml-2">

                            <!--                  <v-form ref="form">-->
                            <!--                    v-model="collectionName"-->
                            <!--                    :rules="collectionNameRules"-->
                            <v-text-field
                                label="新建分组"
                                required
                                append-inner-icon="mdi-check-bold"
                                @click:append-inner="newCollectionGroup()"
                                v-model="newCollectionGroupName"
                            ></v-text-field>

                          </v-row>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                color="red-darken-1"
                                text
                                @click="collectionDialog = false"
                            >
                              关闭
                            </v-btn>
                            <!--                <v-btn-->
                            <!--                    color="blue-darken-1"-->
                            <!--                    text-->
                            <!--                    @click="collectionDialog = false"-->
                            <!--                >-->
                            <!--                  收藏-->
                            <!--                </v-btn>-->

                          </v-card-actions>
                        </v-card>
                      </div>
                    </v-dialog>


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
                  <template v-if="questionStore.filed.user.id!==userStore.user.id">
                    <v-btn v-if="questionStore.follow" class="float-end mx-4" color="pink lighten-3">
                      <span style="color: white" @click="unsubscribe()">已关注</span>
                    </v-btn>
                    <v-btn v-else class="float-end mx-4" color="blue lighten-3"
                           @click="subscribe()">
                      <span style="color: white">关注</span>
                    </v-btn>
                  </template>
                  <v-btn v-else class="float-right" variant="outlined" color="#c42161"
                         :href="`/question/ask?id=${questionId}`" target="_blank">
                    重新编辑
                  </v-btn>
                </div>

                <div class="markdown-body question-content" v-html="questionStore.content" v-hljs></div>

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
                    <client-only>
                      <v-btn variant="tonal" key="answer" color="#47885e" href="#answer">
                        <!--                        <v-tooltip activator="parent" location="top">-->
                        <!--                          回答问题-->
                        <!--                        </v-tooltip>-->
                        回答
                      </v-btn>


                      <v-dialog>
                        <template v-slot:activator="{ props }">
                          <v-btn class="ml-4" v-bind="props" variant="tonal" key="reply" color="#00a3af">
                            <v-tooltip activator="parent" location="top">
                              询问问题其他细节或提出修改意见
                            </v-tooltip>
                            回复
                          </v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">

                          <v-card style="margin-left: 20%;width:55%">
                            <v-toolbar
                                color="#9d5b8b"
                                style="color: white"
                                :title="`回复${questionStore.filed.user.nickname}询问其他细节或提出修改意见`"
                            ></v-toolbar>
                            <!--                                <v-card-text>-->
                            <!--                                  <div class="text-h2 pa-12">Hello world!</div>-->
                            <!--                                </v-card-text>-->
                            <v-form>
                              <v-textarea fluid placeholder="" clearable
                                          v-model="replyCommentText"
                                          clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                          rows="4">
                                <!--                auto-grow-->
                              </v-textarea>
                            </v-form>
                            <v-card-actions class="justify-end">
                              <v-btn
                                  variant="outlined" color="#e2041b" class="mr-2"
                                  @click="isActive.value = false" append-icon="mdi-close"
                              >关闭
                              </v-btn>
                              <v-btn color="#98d98e" @click="answerStore.answerOrCommentQuestion(
                                      {
                                      mdText: replyCommentText,
                                      parentAnswerId: '0',
                                      questionId: questionId,
                                      answerType: AnswerType.comment
                                      },()=>{isActive.value = false})"
                                     variant="outlined" append-icon="mdi-reply"
                              >回复
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>

                      <v-btn class="ml-4" variant="tonal" key="follow" color="#b7282e">
                        追踪
                        <v-tooltip activator="parent" location="top">
                          关注跟踪这个问题，当有新的回答时会收到通知
                        </v-tooltip>
                      </v-btn>


                    </client-only>
                    <!--                    {{ questionStore.filed }}-->
                    <v-divider class="my-2"></v-divider>


                    <v-card v-if="questionStore.filed.questionCommentList.length>0" class="pa-5 mt-2"
                    >
                      <!--                            :theme="useCookie('theme')">-->

                      <template v-for="comment in questionStore.filed.questionCommentList">
                        <div class="float-left">
                          <a :href="`/user/${comment.user.id}`" target="_blank" class="text-blue">
                            {{ comment.user.nickname }}：
                          </a>
                        </div>
                        <div v-if="comment.replyUserAnswerId==='0'">{{ comment.textHtml }}</div>
                        <div v-else v-html="atSrtGotoHome(comment.textHtml,comment.parentUserId)"></div>
                        <div>
                          <span class="text-subtitle-2 text-grey">
                            {{ dateFilter(comment.createTime, 'YYYY年MM月DD hh:mm') }}
                          </span>
                          <v-btn icon="true" variant="text" size="small" color="blue"
                                 @click="showCommentDialog(comment.user,comment.id,'0',AnswerType.comment)">
                            <v-icon>mdi-reply</v-icon>
                          </v-btn>
                        </div>
                        <v-divider class="mt-1"></v-divider>
                      </template>
                    </v-card>

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
            <template v-for="(answer,index) in answerStore.dataList">
              <v-row class="mt-4" :id="`answerId-${answer.id}`">
                <v-col cols=1>
                  <client-only>
                    <div class="text-center">
                      <v-btn icon="true" elevation="0"
                             @click="answerStore.action({
                             answerType: AnswerType.up,
                             questionFieldId: questionId,
                             actionAnswerOrCommentId: answer.id
                             },index)">
                        <v-icon :color="answerStore.getActionColor(AnswerType.up, index)"
                        >mdi-triangle
                        </v-icon>
                        <v-tooltip activator="parent" location="right">
                          这个回答有用
                        </v-tooltip>
                      </v-btn>
                      <!--                      {{ answer.userAction }}-->
                      <p> {{ answer.upNum - answer.downNum }}</p>
                      <v-btn icon="true" elevation="0"
                             @click="answerStore.action({
                             answerType: AnswerType.down,
                             questionFieldId: questionId,
                             actionAnswerOrCommentId: answer.id
                             },index)">
                        <v-icon class=" mdi-rotate-180"
                                :color="answerStore.getActionColor(AnswerType.down, index)"
                        >mdi-triangle
                        </v-icon>
                        <v-tooltip activator="parent" location="right">
                          这个回答没有用
                        </v-tooltip>
                      </v-btn>

                      <v-btn icon="true" elevation="0" v-if="answer.accepted" class="my-2">
                        <v-icon class="" color="#00c13c" size="large"> mdi-check-bold</v-icon>
                        <v-tooltip activator="parent" location="right">
                          The question owner accepted this as the best answer 4 mins ago
                        </v-tooltip>
                      </v-btn>

                      <br>
                      <v-btn icon="true" elevation="0" class="mt-2" size="small"
                             @click="openCollectionDialog(3,answer.id)">
                        <!--                             @click="openCollectionDialog(collectionType.Answer,answer.id)">-->
                        <v-icon class="text-grey">mdi-book-heart-outline</v-icon>
                        <v-tooltip activator="parent" location="right">
                          收藏这个回答
                        </v-tooltip>
                      </v-btn>
                    </div>
                  </client-only>
                </v-col>
                <v-col cols=11>
                  <client-only>

                    <v-card class="pa-4">
                      <!--                    <v-row>-->
                      <!--                      <v-col>-->
                      <div v-html="answer.textHtml" v-hljs class="markdown-body"></div>
                      <!--                      <div v-html="answer.textHtml" class="markdown-body"></div>-->
                      <div class="mt-4">
                        <div class="float-left">
                          <v-dialog>
                            <template v-slot:activator="{ props }">
                              <v-btn class="ml-1" v-bind="props" variant="tonal" key="reply" color="#00a3af">
                                <v-tooltip activator="parent" location="top">
                                  询问问题其他细节或提出修改意见
                                </v-tooltip>
                                回复
                              </v-btn>
                            </template>
                            <template v-slot:default="{ isActive }">

                              <v-card style="margin-left: 20%;width:55%">
                                <v-toolbar
                                    color="#9d5b8b"
                                    style="color: white"
                                    :title="`回复${answer.user.nickname}询问其他细节或提出修改意见`"
                                ></v-toolbar>
                                <!--                                <v-card-text>-->
                                <!--                                  <div class="text-h2 pa-12">Hello world!</div>-->
                                <!--                                </v-card-text>-->
                                <v-form>
                                  <v-textarea fluid placeholder="" clearable
                                              v-model="replyCommentText"
                                              clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                              rows="4">
                                    <!--                auto-grow-->
                                  </v-textarea>
                                </v-form>
                                <v-card-actions class="justify-end">
                                  <v-btn
                                      variant="outlined" color="#e2041b" class="mr-2"
                                      @click="isActive.value = false" append-icon="mdi-close"
                                  >关闭
                                  </v-btn>
                                  <v-btn color="#92398e" @click="answerStore.answerOrCommentQuestion(
                                      {
                                      mdText: replyCommentText,
                                      parentAnswerId: answer.id,
                                      questionId: questionId,
                                      answerType: AnswerType.answer_comment
                                      },()=>{isActive.value = false})"
                                         variant="outlined" append-icon="mdi-reply"
                                  >回复
                                  </v-btn>
                                </v-card-actions>
                              </v-card>
                            </template>
                          </v-dialog>
                          <!--                        <v-btn variant="outlined" color="#00a3af">-->
                          <!--                          <v-tooltip activator="parent" location="top">-->
                          <!--                            询问问题其他细节或提出修改意见-->
                          <!--                          </v-tooltip>-->
                          <!--                          回复-->
                          <!--                        </v-btn>-->
                          <!--                        <v-btn class="mx-4" variant="outlined" color="#b7282e">-->
                          <!--                          关注-->
                          <!--                          <v-tooltip activator="parent" location="top">-->
                          <!--                            关注跟踪这个问题，当有新的回答时会收到通知-->
                          <!--                          </v-tooltip>-->
                          <!--                        </v-btn>-->
                        </div>
                        <div class="text-end">
                          <v-avatar>
                            <v-img :src="answer.user.userInfo.avatar"></v-img>
                          </v-avatar>
                          <span>{{ answer.user.nickname }}/</span>
                          <span class="text-grey">{{ dateFilter(answer.createTime) }}</span>
                        </div>
                      </div>
                      <!--                      </v-col>-->
                      <!--                    </v-row>-->
                      <v-card v-if="answer.childQaAnswers.length>0" class="pa-5">
                        <template v-for="childAnswer in answer.childQaAnswers">
                          <div class="float-left">
                            <a :href="`/user/${childAnswer.user.id}`" target="_blank" class="text-blue">
                              {{ childAnswer.user.nickname }}：
                            </a>
                          </div>
                          <div v-if="childAnswer.replyUserAnswerId==='0'">{{ childAnswer.textHtml }}</div>
                          <div v-else v-html="atSrtGotoHome(childAnswer.textHtml,childAnswer.parentUserId)"></div>
                          <!--                        <div>-->
                          <!--                          <v-btn size="x-small" icon="mdi-thumb-up-outline" :icon="true" elevation="0"></v-btn>-->
                          <!--                          <v-btn size="x-small" icon="mdi-thumb-down-outline" :icon="true" elevation="0"></v-btn>-->
                          <!--                          <v-btn size="x-small" icon="mdi-reply-outline" :icon="true" elevation="0"></v-btn>-->
                          <!--                        </div>-->
                          <div>
                          <span class="text-subtitle-2 text-grey">
                            {{ dateFilter(childAnswer.createTime, 'YYYY年MM月DD hh:mm') }}
                          </span>
                            <v-btn icon="true" variant="text" size="small" color="blue"
                                   @click="showCommentDialog(childAnswer.user,childAnswer.id,answer.id,AnswerType.answer_comment)">
                              <v-icon>mdi-reply</v-icon>
                            </v-btn>
                          </div>
                          <v-divider class="mt-1"></v-divider>
                        </template>
                      </v-card>
                    </v-card>

                  </client-only>
                </v-col>
              </v-row>
            </template>
            <v-row>
              <v-col offset="1">
                <v-divider class="my-4"></v-divider>
                <v-row class="pa-4">
                  <v-col cols="2">

                    <div class="text-h5" id="answer">撰写回答</div>
                  </v-col>
                  <v-col offset="9">
                    <v-btn variant="tonal" color="#669651" v-if="showAnswerWindow" class=""
                           @click="answerStore.answerOrCommentQuestion(
                               {parentAnswerId: '0',
                                     questionId: questionId,
                                     answerType: AnswerType.answer,
                                     // replyUserAnswerId: ,
                                     // replyUserId: '',
                                     mdText: content
                                     })">
                      发送
                    </v-btn>
                    <v-btn variant="outlined" color="#669651" v-if="showAnswerWindow" class="d-send-answer mt-n1 h-75"
                           size="small"
                           style="display: none"
                           @click="answerStore.answerOrCommentQuestion(
                                   {parentAnswerId: '0',
                                         questionId: questionId,
                                         answerType: AnswerType.answer,
                                         // replyUserAnswerId: ,
                                         // replyUserId: '',
                                         mdText: content
                                         })">
                      <p class="ml-4">发送回答</p>
                    </v-btn>
                  </v-col>
                </v-row>
                <AnswerBytemdEditor v-if="showAnswerWindow" :content="content" @change-text="changeText"
                                    style="margin-bottom: 100px">
                </AnswerBytemdEditor>
                <div v-else class="pa-8 d-answer-tip-card">
                  <span class="text-h6 text-green">适合作为回答的</span>
                  <div class="d-answer-tip-recommend">
                    <p class="card-text mdi">
                      经过验证的有效解决办法
                    </p>
                    <p class="card-text mdi">
                      自己的经验指引，对解决问题有帮助
                    </p>
                    <p class="card-text mdi">
                      遵循 Markdown 语法排版，代码语义正确
                    </p>
                  </div>
                  <span class="text-h6 text-red">不该作为回答的</span>
                  <div class="d-answer-tip-inappropriate">
                    <p class="card-text mdi">
                      询问内容细节或回复楼层
                    </p>
                    <p class="card-text mdi">
                      与题目无关的内容
                    </p>
                    <p class="card-text mdi">
                      “赞”“顶”“同问”“看手册”“解决了没”等毫无意义的内容
                    </p>
                  </div>
                  <div class="my-3">
                    <v-btn color="#1aad19" variant="tonal" @click="showAnswerWin()" size="large">撰写解决方法</v-btn>
                  </div>
                  <div class="d-answer-tip-comment">
                    <p class="card-text mdi">
                      询问细节、提出修改意见时，请使用每条内容下方的“回复”功能
                    </p>
                  </div>
                </div>

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
      <client-only>
        <v-dialog v-model="commentDialog">
          <v-card style="margin-left: 20%;width:55%">
            <v-toolbar
                color="#9d5b8b"
                style="color: white"
                :title="`回复${commentUser.nickname}询问其他细节或提出修改意见`"
            ></v-toolbar>
            <v-form>
              <v-textarea fluid placeholder="" clearable
                          v-model="replyCommentText"
                          clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                          rows="4">
              </v-textarea>
            </v-form>
            <v-card-actions class="justify-end">
              <v-btn
                  variant="outlined" color="#e2041b" class="mr-2"
                  @click="commentDialog = false" append-icon="mdi-close"
              >关闭
              </v-btn>
              <v-btn color="#98d98e" @click="answerStore.answerOrCommentQuestion(
                                      {
                                      mdText: replyCommentText,
                                      parentAnswerId: commentParentAnswerId,
                                      questionId: questionId,
                                      answerType: commentAnswerType,
                                      replyUserAnswerId: commentCommentId,//todo name
                                      replyUserId:commentUser.id
                                      },()=>{this.commentDialog = false})"
                     variant="outlined" append-icon="mdi-reply"
              >回复
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </client-only>
    </v-row>

  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import {useQuestionStore} from '~/stores/question/questionStore'
import {useCookie, useRoute, useRouter} from '#app'
import {atSrtGotoHome, dateFilter, handleCopy} from '~/composables/useTools'
import {nextTick, onMounted, ref, watch} from 'vue'
import {changeHighlightStyle} from '~/constant/highlightStyleList'
import {changeThemes, themes} from '~/constant/markdownThemeList'
import {useFetchGetQuestionContent, useFetchGetQuestionField} from '~/composables/Api/question'
import {useTheme} from 'vuetify'
import {useAnswerStore} from '~/stores/question/answerStore'
import {AnswerType, User} from '~/types/question/answer'
import AnswerBytemdEditor from '~/components/question/answerBytemdEditor.vue'
import {
  useAxiosCancelCollectionToGroup,
  useAxiosGetCollectionGroupList,
  useAxiosPostAddCollectionToGroup, useAxiosPostCreateCollectionGroup
} from '~/composables/Api/article'
import {collectionData, collectionGroupData, collectionType} from '~/types/article'
import {errorMsg, successMsg, warningMsg} from '~/composables/utils/toastification'
import {followUser, unFollowUser} from '~/composables/Api/user/following'
import {useLayout} from '~/stores/layout'
import {useUserStore} from '~/stores/user'

const theme = useTheme()
const route = useRoute()
const router = useRouter()
let userStore = useUserStore()
const questionId = String(route.params.qid)
const questionStore = useQuestionStore()
const answerStore = useAnswerStore()
const responseData = await useFetchGetQuestionField(questionId, true)
const content = ref('')
const replyCommentText = ref('')
const commentDialog = ref(false)
const changeText = async (text) => {
  content.value = text
}
const commentUser = ref<userData>()
const commentParentAnswerId = ref('')
const commentCommentId = ref(0)
const commentAnswerType = ref<AnswerType>()
const collectionDialog = ref(false)
let layout = useLayout()
layout.showFooter = true
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
const showAnswerWindow = ref(false)
let HighlightStyle
let MarkdownTheme
if (typeof window !== 'undefined') {
  HighlightStyle = await changeHighlightStyle(questionStore.getHighlightStyleName(), true)
  MarkdownTheme = await changeThemes(themes[questionStore.getMarkdownThemeName()], true)
}
onMounted(async () => {
  await answerStore.loadAnswer(questionId)
  watch(theme.global.name, async (val) => {
    if (val === 'dark') {
      await questionStore.changeThemeDark()
      await questionStore.changeHighlightStyleDark()
    } else {
      await questionStore.changeThemeLight()
      await questionStore.changeHighlightStyleLight()
    }
  })
  // #answerId-1588022587668037632-#test
  let h = route.hash
  if (h) {
    let hash = h.split('+')
    document.querySelector(`${hash[0]} ${hash[1]}`).scrollIntoView()
  }

})


const collectionGroupList = ref<Array<collectionGroupData>>() // 收藏分组列表
const collectionType = ref<collectionType>()
const collectionSourceId = ref('')

const openCollectionDialog = async (type: collectionType, sourceId: string) => {
  collectionDialog.value = true
  collectionType.value = type
  collectionSourceId.value = sourceId
  const {data: axiosResponse} = await useAxiosGetCollectionGroupList()
  if (axiosResponse.code === 0) {
    collectionGroupList.value = axiosResponse.data
    // await loadArticleCollectionState()
    // if (articleCollectionState.value.code === 0) {
    //   const state = articleCollectionState.value.data
    //   // selectCollectionGroup.value = state
    //   // console.log(state)
    //   for (let i = collectionGroupList.value.length - 1; i >= 0; i--) {
    //     for (const iKey in state) {
    //       // console.log("collectionGroupList.value[i].id",collectionGroupList.value[i].id)
    //       // console.log("state[iKey].value[i].id",state[iKey])
    //       if (state[iKey] === collectionGroupList.value[i].id) {
    //         collectionGroupList.value[i].select = true
    //       }
    //     }
    //   }
    // }

  }
}
const addCollectionToGroup = async (groupId: string, select: boolean) => {
  let body: collectionData = {
    collectionType: collectionType.value,
    sourceId: collectionSourceId.value,
    groupId
  }
  if (select) {
    const {data: axiosResponse} = await useAxiosPostAddCollectionToGroup(body)
    if (axiosResponse.code === 0) {
      successMsg('收藏成功')
      collectionGroupList.value.find((value) => value.id === groupId).collectionNum++

    } else {
      warningMsg(axiosResponse.msg)
    }
  } else {
    const {data: axiosResponse} = await useAxiosCancelCollectionToGroup(body)
    if (axiosResponse.code === 0) {
      successMsg('取消收藏成功')
      collectionGroupList.value.find((value) => value.id === groupId).collectionNum--
    } else {
      errorMsg(axiosResponse.msg)
    }
  }

}

const newCollectionGroupName = ref('')
const newCollectionGroup = async () => {
  let body: any = {
    groupName: newCollectionGroupName.value
  }
  const {data: axiosResponse} = await useAxiosPostCreateCollectionGroup(body)
  if (axiosResponse.code === 0) {
    successMsg('创建成功')
    const {data: axiosResponse} = await useAxiosGetCollectionGroupList()
    if (axiosResponse.code === 0) {
      collectionGroupList.value = axiosResponse.data
      newCollectionGroupName.value = ''
    }
  } else {
    errorMsg(axiosResponse.msg)
  }
}


const subscribe = () => {
  followUser(questionStore.filed.user.id)
  questionStore.follow = true
}

const unsubscribe = () => {
  unFollowUser(questionStore.filed.user.id)
  questionStore.follow = false
}

const showCommentDialog = (user: User, CommentId: string, ParentAnswerId: string, answerType: AnswerType) => {
  commentDialog.value = true
  commentUser.value = user
  commentParentAnswerId.value = ParentAnswerId
  commentCommentId.value = CommentId
  commentAnswerType.value = answerType
}

const showAnswerWin = async () => {
  showAnswerWindow.value = true
  await nextTick()
  let element = document.querySelector('#answer')
  element.scrollIntoView({
    behavior: 'smooth'
  })
}
</script>

<style scoped>
:deep(.markdown-body pre code ul li:before) {
  counter-increment: linenumber;
  content: counter(linenumber);
  margin-left: -20px;
  margin-right: 14px;
  color: v-bind('theme.global.name.value === "dark" ? "#9b9b9b" : "#626262"') !important;
}

:deep(.markdown-body pre code ul) {
  list-style-type: none;
  counter-reset: linenumber;
}

:deep(.markdown-body pre code ul li) {

}

:deep(.markdown-body pre code ul li:before) {
  counter-increment: linenumber;
  content: counter(linenumber);
  margin-left: -20px;
  margin-right: 14px;
  color: v-bind('theme.global.name.value === "dark" ? "#9b9b9b" : "#626262"') !important;
}

:deep(.markdown-body p) {
  font-size: 20px !important;
}

.markdown-body {
  padding: 0 10px !important;
  background-repeat: initial !important;
}


</style>

<style>
.d-answer-tip-card {
  font-size: 18px;
  border: 2px solid #1aad19;
  border-radius: 10px;
  padding: 15px;
}

.d-answer-tip-recommend {
  list-style: none;
}

.d-answer-tip-inappropriate {
  list-style: none;
}

.d-answer-tip-recommend p:before {
  content: "\F012C";
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "#41b883" : "#00c13c"') !important;
  font-weight: bold;
  margin-right: 3px;
}

.d-answer-tip-inappropriate p:before {
  content: "\F0156";
  font-size: 135%;
  color: red;
  font-weight: bold;
  margin-right: 3px;
}

.d-answer-tip-comment p:before {
  content: "\F064E";
  font-size: 135%;
  color: #40c4ff;
  font-weight: bold;
  margin-right: 5px;
}

.d-tip-error {
  /*background: #fcf1f1 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#351212" : "#fcf1f1"') !important;
  border-left-color: red !important;
  /*color: black!important;*/
}

.d-tip-success {
  /*background: #f0f8e5 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#09250d" : "#f0f8e5"') !important;
  border-left-color: #1aad19 !important;
  /*color: black!important;*/
}

.d-tip-warning {
  /*background: #fcf2e9 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2c240a" : "#fcf2e9"') !important;
  border-left-color: #ec6800 !important;
  /*color: black!important;*/
}

.d-tip-info {
  /*background: #eef6fd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#162430" : "#eef6fd"') !important;
  border-left-color: #40c4ff !important;
  /*color: black!important;*/
}


.d-tip-share {
  /*background: #dddddd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2a2a2abc" : "#eeeeee"') !important;
  border-left-color: #8b968d !important;
  /*color: black!important;*/
}

/*.d-tip-error > p:first-child:before {*/
/*  content: "\F0156";*/
/*  font-size: 135%;*/
/*  color: red;*/
/*  font-weight: bold;*/
/*  margin-right: 5px;*/
/*  margin-left: -10px;*/
/*}*/
.d-tip-error > p:first-child:before {
  content: "\F0156";
  font-size: 135%;
  color: red;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-error > p:not(:first-child) {
  margin-left: 22px;
}

.d-tip-success p:first-child:before {
  content: "\F012C";
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "#41b883" : "#00c13c"') !important;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-warning p:first-child:before {
  content: "\F0205";
  font-size: 135%;
  position: center;
  height: 100%;
  color: #ff6800;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-info p:first-child:before {
  content: "\F064E";
  font-size: 135%;
  color: #40c4ff;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-share p:first-child:before {
  content: "\F0065";
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "" : "#858585"') !important;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip > p:not(:first-child) {
  margin-left: 22px;
}

</style>