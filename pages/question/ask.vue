<template>
  <div class="mt-4">
    <v-row>
      <v-text-field
        v-model="title"
        class="d-editor-title ml-5"
        clearable
        label="问题"
        placeholder="输入问题标题..."
        variant="underlined"
      >
      </v-text-field>
      <div class="mt-2 mr-4 ml-2">
        <v-btn elevation="0" variant="tonal" color="#39c7af">手动保存</v-btn>

        <client-only>
          <v-menu v-model="versionHistoryMenu" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                class="ml-1"
                color="#00a381"
                elevation="0"
                v-bind="props"
                variant="tonal"
                @click="getVersionHistoryList()"
              >
                历史版本
              </v-btn>
            </template>
            <v-card class="pa-3" style="width: 300px">
              <v-row v-for="(item, index) in versionHistoryList">
                <v-col @click="gotoVersion(index)">
                  <span class="text-subtitle-1">标题：{{ item.title }}</span>
                  <span class="text-grey float-right">{{ timeAgoFilter(item.date) }}</span>
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
        </client-only>
        <client-only>
          <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :open-on-click="false"
            :persistent="true"
          >
            <template v-slot:activator="{ props }">
              <v-btn v-if="isNew" color="blue" elevation="0" v-bind="props" @click="send()">
                <!--                      @click="send()">-->

                发布
              </v-btn>
              <v-btn
                v-else
                color="#f48fb1"
                elevation="0"
                v-bind="props"
                variant="outlined"
                @click="send()"
              >
                更新
              </v-btn>
            </template>
            <v-card min-width="600px">
              <div class="px-4 pt-2">
                <div class="text-h6">{{ isNew ? '发布' : '更新' }}问题</div>
                <v-divider class="mb-3"></v-divider>

                <v-row>
                  <span class="text-body-1 px-4 pt-3">分类:</span>
                  <v-chip-group
                    v-if="questionGroupList"
                    mandatory
                    v-bind:model-value="questionGroupId"
                  >
                    <v-chip
                      v-for="g in questionGroupList"
                      :key="g.id"
                      :filter="true"
                      :value="g.id"
                      @click="questionGroupId = g.id"
                    >
                      {{ g.name }}
                    </v-chip>
                  </v-chip-group>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                  <span class="text-body-1 px-4 pt-6">标签:</span>
                  <!--                  <select-tag style="width: 80%" class="py-2"></select-tag>-->
                </v-row>
              </div>
              <v-divider class="mt-1 mb-2"></v-divider>

              <v-textarea
                v-model="summary"
                :rules="[rules.length(150)]"
                class="mx-2 mt-1"
                clearable
                counter="150"
                label="文章摘要"
                no-resize="true"
                placeholder="输入文章摘要..."
                variant="outlined"
              >
              </v-textarea>

              <v-card-actions>
                <v-btn text @click="cancelChange()"> 取消</v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="
                    () => {
                      if (isNew) {
                        publishQuestion()
                        this.menu = false
                      } else {
                        updateQuestion()
                        this.menu = false
                      }
                    }
                  "
                >
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>

          <v-menu v-model="settingsDialog" :close-on-content-click="false" :open-on-click="false">
            <template v-slot:activator="{ props }">
              <v-btn
                class="mr-n4 ml-2"
                color="#9d5b8b"
                icon="true"
                size="small"
                v-bind="props"
                @click="settingsDialog = !settingsDialog"
              >
                <!--                <v-icon size="x-large">mdi-brush-outline</v-icon>-->
                <v-icon color="#FFF" size="x-large">mdi-cookie-cog-outline</v-icon>
                <v-tooltip activator="parent" location="bottom">文章外观设置</v-tooltip>
              </v-btn>
            </template>
            <v-card>
              <div class="text-h6 ma-2">文章外观设置</div>
              <v-tabs v-model="selectThemeTabName">
                <v-tab value="light">日间主题</v-tab>
                <v-tab value="dark">夜间主题</v-tab>
              </v-tabs>

              <v-card-text>
                <v-window v-model="selectThemeTabName">
                  <v-window-item value="light">
                    <v-card
                      class="d-ArticleThemeSettings"
                      min-width="450px"
                      style="overflow: hidden"
                    >
                      <v-divider class="mt-n2 mb-6"></v-divider>

                      <v-row class="pa-4 mb-n6">
                        <v-select
                          v-model="themeName"
                          :items="themeNameList"
                          class="mt-n5 mx-2"
                          item-title="text"
                          item-value="value"
                          label="掘金MarkdownTheme"
                          prepend-icon="mdi-progress-pencil"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomTheme(themeNameList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                      <v-row class="pa-4 mb-n6">
                        <v-select
                          v-model="themeName"
                          :items="mwebLightNameList"
                          class="mt-n5 mx-2"
                          item-title="text"
                          item-value="value"
                          label="LightMarkdownTheme"
                          prepend-icon="mdi-progress-pencil"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomTheme(mwebLightNameList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                      <v-row class="pa-4 mb-n6">
                        <v-select
                          v-model="themeName"
                          :items="purpleLightList"
                          class="mt-n5 mx-2"
                          item-title="text"
                          item-value="value"
                          label="PurpleMarkdownTheme"
                          prepend-icon="mdi-progress-pencil"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomTheme(purpleLightList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>

                      <!--              <v-btn @click="test()">test</v-btn>-->
                      <v-divider class="pb-6"></v-divider>

                      <v-row class="pa-4">
                        <v-select
                          v-model="highlightStyle"
                          :items="HighlightStyleNameList"
                          class="mt-n5 mx-2"
                          item-title="text"
                          item-value="value"
                          label="代码高亮风格"
                          prepend-icon="mdi-code-tags"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomHighlightStyle(HighlightStyleNameList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                      <v-divider class="pb-6"></v-divider>

                      <v-row class="pa-4">
                        <v-select
                          v-model="highlightStyle"
                          :items="HighlightStyleBase16NameList"
                          class="mt-n5 mx-2"
                          label="代码高亮风格Base16"
                          prepend-icon="mdi-code-tags"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomHighlightStyle(HighlightStyleBase16NameList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                    </v-card>
                  </v-window-item>

                  <v-window-item value="dark">
                    <v-card
                      class="d-ArticleThemeSettings"
                      min-width="450px"
                      style="overflow: hidden"
                    >
                      <v-divider class="mt-n2 mb-6"></v-divider>

                      <v-row class="pa-4 mb-n6">
                        <v-select
                          v-model="darkThemeName"
                          :items="mwebDarkList"
                          class="mt-n5 mx-2"
                          item-title="text"
                          item-value="value"
                          label="DarkMarkdownTheme"
                          prepend-icon="mdi-progress-pencil"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomThemeDark(mwebDarkList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                      <!--              <v-btn @click="test()">test</v-btn>-->
                      <v-divider class="pb-6"></v-divider>

                      <v-row class="pa-4">
                        <v-select
                          v-model="darkHighlightStyle"
                          :items="HighlightStyleNameList"
                          class="mt-n5 mx-2"
                          item-title="text"
                          item-value="value"
                          label="代码高亮风格"
                          prepend-icon="mdi-code-tags"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomHighlightStyleDark(HighlightStyleNameList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                      <v-divider class="pb-6"></v-divider>

                      <v-row class="pa-4">
                        <v-select
                          v-model="darkHighlightStyle"
                          :items="HighlightStyleBase16NameList"
                          class="mt-n5 mx-2"
                          label="代码高亮风格Base16"
                          prepend-icon="mdi-code-tags"
                          return-object
                          variant="underlined"
                        ></v-select>
                        <v-btn
                          class="mt-n2 mr-4 text-white"
                          color="#38b48b"
                          @click="randomHighlightStyleDark(HighlightStyleBase16NameList)"
                        >
                          随便来一个
                        </v-btn>
                      </v-row>
                    </v-card>
                  </v-window-item>
                </v-window>
              </v-card-text>
            </v-card>
          </v-menu>

          <v-btn
            class="ml-5"
            elevation="0"
            icon="true"
            size="small"
            transition="fade-transition"
            @click="layout.switchTheme(themeInstance)"
          >
            <v-icon v-if="themeInstance.global.current.value.dark">mdi-white-balance-sunny</v-icon>
            <v-icon v-if="!themeInstance.global.current.value.dark">mdi-weather-night</v-icon>
            <v-tooltip activator="parent" location="bottom"
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
    <BytemdEditor :content="content" @change-text="changeText">test</BytemdEditor>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#app'
import { onMounted, provide, ref, toRaw, watch, watchEffect } from 'vue'
import BytemdEditor from '~/components/article/write/bytemdEditor.vue'
import { ContentType } from '~/composables/Api/article/manageArticle'
import {
  ComponentToastMsg,
  createError,
  definePageMeta,
  errorMsg,
  infoMsg,
  timeAgoFilter,
  useAxiosGetQuestionField,
  useAxiosPostAskQuestion,
  useAxiosPutUpdateAskQuestion,
  useFetchGetQuestionGroupList,
} from '#imports'
import {
  changeThemes,
  mwebDarkList,
  mwebLightNameList,
  purpleLightList,
  themeNameList,
  themes,
} from '~~/constant/markdownThemeList'
import {
  changeHighlightStyle,
  HighlightStyleNameList,
  HighlightStyleBase16NameList,
} from '~~/constant/highlightStyleList'
import { useUserStore } from '~/stores/user'
import { useTheme } from 'vuetify'
import { TYPE } from 'vue-toastification/src/ts/constants'
import JumpPrompt from '~/components/common/Toast/jumpPrompt.vue'
import { useLayout } from '~/stores/layout'
import { CreateQuestionBody, useAxiosGetQuestionContent } from '~/composables/Api/messages/ask'
import { QaGroup, QuestionField, QuestionTag } from '~/types/question'
import { ResponseData } from '~/types/utils/axios'

definePageMeta({
  layout: false,
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
provide('tagList', { questionTagList })

const { data: groupData } = await useFetchGetQuestionGroupList()
questionGroupList.value = groupData
const settingsDialog = ref(false)
const themeName = ref<string>('cyanosis')
const darkThemeName = ref<string>('geekBlackDark')
const highlightStyle = ref<string>('xcode')
const darkHighlightStyle = ref<string>('xcode')
const selectThemeTabName = ref('')
onMounted(async () => {
  document.title = '提问题'
  const id = String(route.query.id)
  let version = Number(route.query.version || -1)
  console.log('id', id)
  await load(id, version)
  // if (themeInstance.global.name.value === 'dark') {
  //   await changeThemes(themes[darkThemeName.value])
  // } else {
  //   await changeThemes(themes[themeName.value])
  // }
  watchEffect(async () => {
    if (themeInstance.global.name.value === 'dark') {
      console.log("stance.global.name.value === 'dark') {")
      await changeThemes(themes[darkThemeName.value])
      await changeHighlightStyle(darkHighlightStyle.value)
      if (selectThemeTabName.value !== 'dark') {
        selectThemeTabName.value = 'dark'
      }
    } else {
      console.log('eeee')
      await changeThemes(themes[themeName.value])
      await changeHighlightStyle(highlightStyle.value)
      if (selectThemeTabName.value !== 'light') {
        selectThemeTabName.value = 'light'
      }
    }
  })
  // watch()
  watch(selectThemeTabName, (val) => {
    if (val === 'dark') {
      layout.switchDarkTheme(themeInstance)
    } else {
      layout.switchLightTheme(themeInstance)
    }
  })
})

const load = async (id: string, version: number) => {
  console.log('Boolean(id) === false', Boolean(id) === false)
  if (id === undefined || id === 'undefined') {
    isNew.value = true

    await router.push({
      query: {
        new: 'true',
      },
    })
  } else {
    if (route.query.id) {
      questionId.value = String(route.query.id)
      const { data: questionFieldResponse } = await useAxiosGetQuestionField(
        questionId.value,
        version
      )
      //todo 优化
      if (questionFieldResponse.data === null) {
        await router.push({
          query: {
            new: 'true',
          },
        })
      } else if (questionFieldResponse.code === 0) {
        questionFieldData.value = questionFieldResponse.data
        if (questionFieldData?.value.user.id !== userStore.user.id) {
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            data: 'data',
            fatal: true,
            message: 'Unauthorized',
          })
        }
        const { data: ContentResponse } = await useAxiosGetQuestionContent(
          questionId.value,
          ContentType.markdown,
          version
        )
        if (ContentResponse.code === 0) {
          title.value = questionFieldData.value.title
          content.value = ContentResponse.data
          summary.value = questionFieldData.value.summary
          themeName.value = questionFieldData.value.markDownTheme
          darkThemeName.value = questionFieldData.value.markDownThemeDark
          highlightStyle.value = questionFieldData.value.codeHighlightStyle
          questionGroupId.value = questionFieldData.value.group.id
          darkHighlightStyle.value = questionFieldData.value.codeHighlightStyleDark
        }
      }
    }
  }
}

const rules = {
  email: (v) => !!(v || '').match(/@/) || '请输入有效的电子邮件',
  length: (len) => (v) => (v || '').length <= len || `文章摘要需小于或等于${len}个字符`,
  password: (v) =>
    !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|\W)).+$/) ||
    '密码必须包含大写字母、数字字符和特殊字符',
  required: (v) => !!v || '此字段是必需的。',
}

const changeText = async (text) => {
  content.value = text
}

const send = () => {
  if (title.value.trim() === '') {
    infoMsg('问题标题不能为空')
    return
  }
  if (content.value.trim() === '') {
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
  const { data: axiosResponse } = await useAxiosPostAskQuestion(body)
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
    // allow_answer: true,
    questionGroupId: questionGroupId.value,
    questionId: questionId.value,
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
  const { data: axiosResponse } = await useAxiosPutUpdateAskQuestion(body)
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
  changeHighlightStyle(highlightStyle.value)
}

const randomHighlightStyleDark = (list: Array<string>) => {
  darkHighlightStyle.value = list[Math.ceil(Math.random() * list.length) - 1]
  changeHighlightStyle(darkHighlightStyle.value)
}

const versionHistoryMenu = ref()
const versionHistoryList = ref<versionDataI[]>()

interface versionDataI {
  title: string
  date: string
}

const getVersionHistoryList = async () => {
  const { data: response } = await useGet<ResponseData<versionDataI[]>>(
    'article/article/manage/historyVersion/' + questionId.value
  )
  versionHistoryList.value = response.data
}

const gotoVersion = async (version: number) => {
  await load(questionId.value, version)
  // successMsg('切换版本成功')
}

const editorTitleInputLabelFontSize = ref('125%')
onMounted(() => {
  const editorTitleInput = document.querySelector('.d-editor-title > div.v-input__control > div')
  watchEffect(() => {})
  const observer = new MutationObserver(() => {
    if (editorTitleInput.classList.contains('v-field--active')) {
      editorTitleInputLabelFontSize.value = '80%'
    } else {
      editorTitleInputLabelFontSize.value = '125%'
    }
  })
  observer.observe(editorTitleInput, {
    attributes: true,
  })
})
</script>
<script lang="ts"></script>

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