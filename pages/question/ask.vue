<template>
  <div class="mt-4">

    <v-row>
      <v-text-field class="ml-5 d-editor-title" v-model="title" placeholder="输入问题标题..." label="问题"
                    variant="underlined" clearable>
      </v-text-field>
      <div class="mt-1 mr-4">
        <!--        <v-btn elevation="1" :theme="themeInstance.global.name.value">手动保存</v-btn>-->
        <v-btn elevation="1">手动保存</v-btn>
        <v-btn elevation="0" color="blue" class="mx-1" variant="outlined">草稿箱</v-btn>
        <client-only>
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              :persistent="true"
              :open-on-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-btn v-if="isNew" color="blue" elevation="0"
                     @click="send()" v-bind="props">
                <!--                      @click="send()">-->

                发布
              </v-btn>
              <v-btn v-else color="#f48fb1" v-bind="props" elevation="0" variant="outlined"
                     @click="send()">
                更新
              </v-btn>
            </template>
            <v-card min-width="600px">
              <div class="px-4 pt-2 ">
                <div class="text-h6">
                  {{ isNew ? '发布' : '更新' }}问题
                </div>
                <v-divider class="mb-3"></v-divider>

                <v-row>
                  <span class="pt-3 px-4 text-body-1">分类:</span>
                  <v-chip-group mandatory v-if="questionGroupList"
                                v-bind:model-value="questionGroupId">
                    <v-chip v-for="g in questionGroupList" :key="g.id" :value="g.id"
                            @click="questionGroupId=g.id" :filter="true">
                      {{ g.name }}
                    </v-chip>
                  </v-chip-group>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                  <span class="pt-6 px-4 text-body-1">标签:</span>
                  <!--                  <select-tag style="width: 80%" class="py-2"></select-tag>-->
                </v-row>
              </div>
              <v-divider class="mt-1 mb-2"></v-divider>

              <v-textarea class="mx-2 mt-1" v-model="summary" placeholder="输入文章摘要..."
                          label="文章摘要" :rules="[rules.length(150)]" counter="150"
                          variant="outlined" clearable no-resize="no-resize"></v-textarea>

              <v-card-actions>
                <v-btn text @click="cancelChange()">
                  取消
                </v-btn>
                <v-btn color="primary" text @click="()=>{
                  if(isNew){
                    publishQuestion()
                    this.menu = false
                  }else {
                    updateQuestion()
                    this.menu = false
                  }
                 }">
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-menu v-model="settingsDialog"
                  :close-on-content-click="false"
                  :open-on-click="false">
            <template v-slot:activator="{ props }">
              <v-btn color="#9d5b8b" icon="true" size="small" class="ml-2 mr-n4"
                     v-bind="props" @click="settingsDialog=!settingsDialog">
                <!--                <v-icon size="x-large">mdi-brush-outline</v-icon>-->
                <v-icon size="x-large" color="#FFF">mdi-cookie-cog-outline</v-icon>
                <v-tooltip
                    activator="parent"
                    location="bottom"
                >文章外观设置
                </v-tooltip>
              </v-btn>
            </template>
            <v-card min-width="450px" style="overflow: hidden" class="d-ArticleThemeSettings">
              <div class="text-h6 ma-2">
                文章外观设置
              </div>
              <v-divider class="mb-6 mt-n2"></v-divider>

              <v-row class="pa-4 mb-n6">

                <v-select prepend-icon="mdi-progress-pencil"
                          label="掘金MarkdownTheme" class="mx-2 mt-n5"
                          :items="themeNameList"
                          item-title="text" item-value="value"
                          return-object
                          variant="underlined" v-model="themeName"
                ></v-select>
                <v-btn class="mr-4 mt-n2 text-white" color="#38b48b"
                       @click="randomTheme(themeNameList)">
                  随便来一个
                </v-btn>
              </v-row>
              <v-row class="pa-4 mb-n6">

                <v-select prepend-icon="mdi-progress-pencil"
                          label="LightMarkdownTheme" class="mx-2 mt-n5"
                          :items="mwebLightNameList"
                          item-title="text" item-value="value"
                          return-object
                          variant="underlined" v-model="themeName"
                ></v-select>
                <v-btn class="mr-4 mt-n2 text-white" color="#38b48b"
                       @click="randomTheme(mwebLightNameList)">
                  随便来一个
                </v-btn>
              </v-row>
              <v-row class="pa-4 mb-n6">

                <v-select prepend-icon="mdi-progress-pencil"
                          label="PurpleMarkdownTheme" class="mx-2 mt-n5"
                          :items="purpleLightList"
                          item-title="text" item-value="value"
                          return-object
                          variant="underlined" v-model="themeName"
                ></v-select>
                <v-btn class="mr-4 mt-n2 text-white" color="#38b48b"
                       @click="randomTheme(purpleLightList)">
                  随便来一个
                </v-btn>
              </v-row>
              <v-row class="pa-4 mb-n6">

                <v-select prepend-icon="mdi-progress-pencil"
                          label="DarkMarkdownTheme" class="mx-2 mt-n5"
                          :items="mwebDarkList"
                          item-title="text" item-value="value"
                          return-object
                          variant="underlined" v-model="darkThemeName"
                ></v-select>
                <v-btn class="mr-4 mt-n2 text-white" color="#38b48b"
                       @click="randomThemeDark(mwebDarkList)">
                  随便来一个
                </v-btn>
              </v-row>
              <!--              <v-btn @click="test()">test</v-btn>-->
              <v-divider class="pb-6"></v-divider>

              <v-row class="pa-4 ">

                <v-select prepend-icon="mdi-code-tags"
                          label="代码高亮风格" class="mx-2 mt-n5"
                          :items="HighlightStyleNameList"
                          item-title="text" item-value="value"
                          return-object
                          variant="underlined" v-model="highlightStyle"
                ></v-select>
                <v-btn class="mr-4 mt-n2 text-white" color="#38b48b"
                       @click="randomHighlightStyle(HighlightStyleNameList)">
                  随便来一个
                </v-btn>
              </v-row>
              <v-divider class="pb-6"></v-divider>

              <v-row class="pa-4 ">

                <v-select prepend-icon="mdi-code-tags"
                          label="代码高亮风格Base16" class="mx-2 mt-n5"
                          :items="HighlightStyleBase16NameList"
                          return-object
                          variant="underlined" v-model="highlightStyle"
                ></v-select>
                <v-btn class="mr-4 mt-n2 text-white" color="#38b48b"
                       @click="randomHighlightStyle(HighlightStyleBase16NameList)">
                  随便来一个
                </v-btn>
              </v-row>
            </v-card>
          </v-menu>


          <v-btn @click="layout.switchTheme(themeInstance)"
                 icon="true" size="small" class="ml-5" elevation="0"
                 transition="fade-transition">
            <v-icon v-if="themeInstance.global.current.value.dark">mdi-white-balance-sunny</v-icon>
            <v-icon v-if="!themeInstance.global.current.value.dark">mdi-weather-night</v-icon>
            <v-tooltip
                activator="parent"
                location="bottom"
            >{{ themeInstance.global.current.value.dark ? '日间模式' : '夜间模式' }}
            </v-tooltip>
          </v-btn>
        </client-only>
        <v-avatar class="mr-4" size="44">
          <v-img :src="useUserStore().userInfo?.avatar"></v-img>
        </v-avatar>
      </div>

      <!--      box-width="720"-->
    </v-row>
    <ImgCutter @cutDown="cutDown" rate="8:3"
               :original-graph="true"
               :boxWidth="1200" :boxHeight="450"
    >
      <template #open>
        <v-btn style="display: none"
               class="CutterBtn">
          CutterBtn
        </v-btn>
      </template>
    </ImgCutter>
    <BytemdEditor :content="content" @change-text="changeText">test</BytemdEditor>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from '#app'
import {onMounted, provide, ref, toRaw, watch, watchEffect} from 'vue'
import BytemdEditor from '~/components/article/write/bytemdEditor.vue'
import {
  ContentType,

  useAxiosPostCreateArticle,
  useAxiosPutUpdateArticle
} from '~/composables/Api/article/manageArticle'
import {ArticleField} from '~/stores/article/articleStore'
import {ArticleSource, ArticleSourceZh, ArticleState,} from '~/types/article/manageArticle'
import {ArticleGroup, ArticleTag} from '~/types/article'
import {
  ComponentToastMsg,
  createError,
  definePageMeta,
  errorMsg,
  infoMsg,
  useAxiosGetQuestionField, useAxiosPostAskQuestion, useAxiosPutUpdateAskQuestion, useFetchGetQuestionGroupList,
} from '#imports'
import {
  changeThemes,
  mwebDarkList,
  mwebLightNameList,
  purpleLightList,
  themeNameList,
  themes
} from '~~/constant/markdownThemeList'
import {
  changeHighlightStyle,
  HighlightStyleNameList,
  HighlightStyleBase16NameList
} from '~~/constant/highlightStyleList'
import {useUserStore} from '~/stores/user'
import SelectTag from '~/components/article/write/selectTag.vue'
import {useTheme} from 'vuetify'
import {TYPE} from 'vue-toastification/src/ts/constants'
import JumpPrompt from '~/components/common/Toast/jumpPrompt.vue'
import {useLayout} from '~/stores/layout'
import {CreateQuestionBody, useAxiosGetQuestionContent} from '~/composables/Api/messages/ask'
import {QaGroup, QuestionField, QuestionTag} from '~/types/question'


definePageMeta({
  layout: false
})
const themeInstance = useTheme()

const layout = useLayout()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const isNew = ref(false)
const menu = ref(false)
const content = ref('')
const questionId = ref('')
const questionFieldData = ref<QuestionField>()
const title = ref('')
const questionGroupId = ref('')
const questionTagIds = ref<Set<string>>()
const summary = ref('')
const questionGroupList = ref<QaGroup[]>()
const questionTagList = ref<QuestionTag[]>()
provide('tagList', {questionTagList})

const {data: groupData} = await useFetchGetQuestionGroupList()
questionGroupList.value = groupData
const settingsDialog = ref(false)
const themeName = ref<string>('cyanosis')
const darkThemeName = ref<string>('geekBlackDark')
const highlightStyle = ref<string>('xcode')
const darkHighlightStyle = ref<string>('xcode')
onMounted(async () => {
  document.title = '提问题'
  const id = route.query.id
  if (Boolean(id) === false) {
    isNew.value = true
    await router.push({
      query: {
        new: 'true'
      }
    })
  } else {

    if (route.query.id) {
      questionId.value = String(route.query.id)
      const {data: questionFieldResponse} = await useAxiosGetQuestionField(questionId.value)
      //todo 优化
      if (questionFieldResponse.data === null) {
        await router.push({
          query: {
            new: 'true'
          }
        })
      } else if (questionFieldResponse.code === 0) {
        questionFieldData.value = questionFieldResponse.data
        if (questionFieldData?.value.user.id !== userStore?.user.id) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            data: 'data',
            fatal: true,
            message: 'Unauthorized'
          })
        }
        const {data: ContentResponse} = await useAxiosGetQuestionContent(questionId.value, ContentType.markdown)
        if (ContentResponse.code === 0) {
          content.value = ContentResponse.data
          title.value = questionFieldData.value.title
          questionGroupId.value = questionFieldData.value.group.id
          summary.value = questionFieldData.value.summary
          themeName.value = questionFieldData.value.markDownTheme
          darkThemeName.value = questionFieldData.value.markDownThemeDark
          highlightStyle.value = questionFieldData.value.codeHighlightStyle
          darkHighlightStyle.value = questionFieldData.value.codeHighlightStyleDark
        }
      }
    }
  }
  if (themeInstance.global.name.value === 'dark') {
    await changeThemes(themes[darkThemeName.value])
  } else {
    await changeThemes(themes[themeName.value])
  }
  watchEffect(async () => {
    if (themeInstance.global.name.value === 'dark') {
      await changeThemes(themes[darkThemeName.value])
    } else {
      await changeThemes(themes[themeName.value])
    }
  })

  watchEffect(async () => {
    await changeHighlightStyle(highlightStyle.value)
  })


})
const rules = {
  email: v => !!(v || '').match(/@/) || '请输入有效的电子邮件',
  length: len => v => (v || '').length <= len || `文章摘要需小于或等于${len}个字符`,
  password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      '密码必须包含大写字母、数字字符和特殊字符',
  required: v => !!v || '此字段是必需的。',
}

const changeText = async (text) => {
  content.value = text
}

const send = () => {
  if (title.value.length <= 0) {
    infoMsg('问题标题不能为空')
    return
  }
  if (content.value.length <= 0) {
    infoMsg('提问内容不能为空')
    return
  }
  saveState()
  menu.value = true
}

const publishQuestion = async () => {
  questionTagIds.value = new Set<string>()
  // questionTagList.value.forEach((tag) => {
  //   questionTagIds.value.add(tag.id)
  // })
  questionTagIds.value.add('1')
  let body: CreateQuestionBody = {
    // allow_answer: true,
    questionGroupId: questionGroupId.value,
    // questionId: 0,
    // questionState: '',
    questionTagIds: Array.from(questionTagIds.value),
    content: content.value,
    summary: summary.value,
    title: title.value,
    codeHighlightStyle: highlightStyle.value,
    codeHighlightStyleDark: darkHighlightStyle.value,
    markDownTheme: themeName.value,
    markDownThemeDark: darkThemeName.value,
  }
  const {data: axiosResponse} = await useAxiosPostAskQuestion(body)
  if (axiosResponse.code === 0) {
    const url = '/question/' + axiosResponse.data
    const timeout = setTimeout(() => {
      window.location.href = url
    }, 5000)
    ComponentToastMsg(`发布成功{{}}秒后自动跳转到问题`, TYPE.SUCCESS, JumpPrompt, 5, timeout, url)
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const updateQuestion = async () => {
  questionTagIds.value = new Set()
  // questionTagList.value.forEach((tag) => {
  questionTagIds.value.add('1')
  // })
  console.log(questionTagIds.value)
  let body: CreateQuestionBody = {
    allow_answer: true,
    questionGroupId: questionGroupId.value,
    questionTagIds: Array.from(questionTagIds.value),
    content: content.value,
    summary: summary.value,
    title: title.value,
    codeHighlightStyleDark: darkHighlightStyle.value,
    questionId: questionId.value,
    questionState: undefined,
    codeHighlightStyle: highlightStyle.value,
    markDownTheme: themeName.value,
    markDownThemeDark: darkThemeName.value
  }
  const {data: axiosResponse} = await useAxiosPutUpdateAskQuestion(body)
  if (axiosResponse.code === 0) {
    const url = '/question/' + axiosResponse.data
    const timeout = setTimeout(() => {
      window.location.href = url
    }, 5000)
    ComponentToastMsg(`发布成功{{}}秒后自动跳转到问题`, TYPE.SUCCESS, JumpPrompt, 5, timeout, url)
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const saveState = () => {
  beforeChangeState = {
    questionGroupId: toRaw(questionGroupId.value),
    questionTagList: toRaw(questionTagList.value),
    summary: toRaw(summary.value),
  }
}
let beforeChangeState = {
  questionGroupId: '',
  questionTagList: [],
  summary: '',
}

const cancelChange = () => {
  menu.value = false
  questionGroupId.value = beforeChangeState.questionGroupId
  questionTagList.value = beforeChangeState.questionTagList
  summary.value = beforeChangeState.summary
}

const randomTheme = (list: Array<string>) => {
  themeName.value = list[Math.ceil(Math.random() * list.length) - 1]
}

const randomThemeDark = (list: Array<string>) => {
  darkThemeName.value = list[Math.ceil(Math.random() * list.length) - 1]
}

const randomHighlightStyle = (list: Array<string>) => {
  highlightStyle.value = list[Math.ceil(Math.random() * list.length) - 1]
}

const editorTitleInputLabelFontSize = ref('130%')
// onMounted(() => {
//   const editorTitleInput = document.querySelector('.d-editor-title > div.v-input__control > div')
//   watchEffect(() => {
//   })
//   const observer = new MutationObserver(() => {
//     if (editorTitleInput.classList.contains('v-field--active')) {
//       editorTitleInputLabelFontSize.value = '80%'
//     } else {
//       editorTitleInputLabelFontSize.value = '130%'
//     }
//   })
//   observer.observe(editorTitleInput, {
//     attributes: true
//   })
// })


</script>
<script lang="ts">

</script>


<style scoped>
:deep(.v-chip--selected) {
  color: #9b59b6;
}

:deep(.d-editor-title label) {
  font-size: v-bind('editorTitleInputLabelFontSize');
  color: v-bind('themeInstance.global.name.value === "dark" ? "#fff" : "#24292e"');
}

:deep(.d-editor-title input) {
  color: v-bind('themeInstance.global.name.value === "dark" ? "#fff" : "#000"');
}

:deep(.vue-img-cutter) {
  z-index: 9999 !important;
}
</style>

