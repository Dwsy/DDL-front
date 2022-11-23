<template>
  <div class="mt-4">
    <v-row>
      <v-text-field
        v-model="title"
        class="d-editor-title ml-5"
        clearable
        label="标题"
        placeholder="输入文章标题..."
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
            :persistent="false"
            location="end"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-if="isNew"
                class="ml-1"
                color="blue"
                elevation="0"
                v-bind="props"
                @click="send()"
              >
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
                <div class="text-h6">{{ isNew ? '发布' : '更新' }}文章</div>
                <v-divider class="mb-3"></v-divider>

                <v-row>
                  <span class="text-body-1 px-4 pt-3">分类:</span>
                  <v-chip-group
                    v-if="articleGroupList"
                    mandatory
                    v-bind:model-value="articleGroupId"
                  >
                    <v-chip
                      v-for="g in articleGroupList"
                      :key="g.id"
                      :value="g.id"
                      filter="true"
                      @click="articleGroupId = g.id"
                    >
                      {{ g.name }}
                    </v-chip>
                  </v-chip-group>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                  <span class="text-body-1 px-4 pt-6">标签:</span>
                  <select-tag style="width: 80%" class="py-2"></select-tag>
                </v-row>
              </div>
              <v-divider class="mt-1 mb-2"></v-divider>

              <v-card class="mb-5" elevation="0">
                <span class="text-body-1 px-4 pt-2">文章头图：预览</span>
                <v-img
                  :src="localBannerImg ? localBannerImg : banner"
                  aspect-ratio="8/3"
                  class="d-draft-banner mx-4"
                  max-height="150px"
                  max-width="100%"
                ></v-img>
              </v-card>

              <!--                {{ disableUploadBtn }}-->
              <!--                <v-file-input label="选择文章头图" variant="underlined"-->
              <!--                              density="compact" prepend-icon="mdi-camera"-->
              <!--                              v-model="bannerFile"-->
              <!--                              accept="image/png, image/jpeg, image/bmp" :rules="bannerRules">-->
              <!--                </v-file-input>-->
              <!--              <ImgCutter @cutDown="cutDown" rate="4:3"-->
              <!--                         class="text-end">-->
              <!--                <template #open>-->

              <div class="text-end">
                <v-btn class="ml-2 mb-6 mr-10" color="blue" @click="clickCutterBtn()">
                  {{ !banner ? '上传' : '重新上传' }}
                </v-btn>
              </div>
              <!--                </template>-->
              <!--              </ImgCutter>-->
              <!--                <v-btn color="blue" @click="uploadBannerFile()"-->
              <!--                       :disabled="disableUploadBtn" class="ml-4 text-white" elevation="1">-->
              <!--                </v-btn>-->

              <v-textarea
                v-model="summary"
                :rules="[rules.length(150)]"
                class="mx-2 mt-1"
                clearable
                counter="150"
                label="文章摘要"
                no-resize="no-resize"
                placeholder="输入文章摘要...为空截取正文前150字"
                variant="outlined"
              ></v-textarea>
              <v-select
                v-model="articleSourceItem"
                :items="ArticleSourceItems"
                class="mt-n5 mx-2"
                item-title="text"
                item-value="value"
                label="文章来源"
                prepend-icon="mdi-progress-pencil"
                return-object
                variant="underlined"
              ></v-select>
              <!--              {{ articleSourceItem }}-->
              <!--              {{ articleSource }}-->
              <v-text-field
                v-if="articleSource !== ArticleSource.original"
                v-model="articleSourceUrl"
                class="mx-2"
                label="来源文章URL"
                variant="outlined"
              >
              </v-text-field>
              <v-card-actions>
                <v-btn text @click="cancelChange()"> 取消 </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="
                    () => {
                      if (isNew) {
                        publishArticle()
                        this.menu = false
                      } else {
                        updateArticle()
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
                <v-tooltip activator="parent" location="bottom">文章外观设置 </v-tooltip>
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
                          随便来一个123{{ darkHighlightStyle }}
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
    <ImgCutter
      :boxHeight="450"
      :boxWidth="1200"
      :original-graph="true"
      rate="8:3"
      @cutDown="cutDown"
    >
      <template #open>
        <v-btn class="CutterBtn" style="display: none"> CutterBtn </v-btn>
      </template>
    </ImgCutter>
    <BytemdEditor :content="content" @change-text="changeText">test</BytemdEditor>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from '#app'
import { nextTick, onMounted, provide, ref, toRaw, watch, watchEffect } from 'vue'
import ImgCutter from 'vue-img-cutter/src/components/ImgCutter'
import BytemdEditor from '~/components/article/write/bytemdEditor.vue'
import {
  ContentType,
  useAxiosGetArticleContent,
  useAxiosGetArticleField,
  useAxiosPostCreateArticle,
  useAxiosPostUploadImg,
  useAxiosPutUpdateArticle,
} from '~/composables/Api/article/manageArticle'
import { ArticleField } from '~/stores/article/articleStore'
import {
  ArticleSource,
  ArticleSourceZh,
  ArticleState,
  CreateArticleBody,
} from '~/types/article/manageArticle'
import { ArticleGroup, ArticleTag } from '~/types/article'
import {
  ComponentToastMsg,
  createError,
  defaultMsg,
  definePageMeta,
  errorMsg,
  infoMsg,
  successMsg,
  timeAgoFilter,
  useCookie,
  useFetchGetArticleGroupList,
  useGet,
  warningMsg,
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
import SelectTag from '~/components/article/write/selectTag.vue'
import { getUploadPictureBase64AndAudit } from '~/composables/utils/picture'
import { useTheme } from 'vuetify'
import { TYPE } from 'vue-toastification/src/ts/constants'
import JumpPrompt from '~/components/common/Toast/jumpPrompt.vue'
import { useLayout } from '~/stores/layout'
import { ResponseData } from '~/types/utils/axios'
import mediumZoom from 'medium-zoom'

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
const afId = ref('')
const articleFieldData = ref<ArticleField>()
const title = ref('')
const selectionGroup = ref(1)
const articleGroupId = ref('')
const articleTagIds = ref<Set<string>>()
const banner = ref('')
const summary = ref('')
const articleGroupList = ref<ArticleGroup[]>([])
const articleTagList = ref<ArticleTag[]>([])
provide('tagList', { articleTagList })
const bannerFile = ref<File>()
const disableUploadBtn = ref(true)
const bannerRules = [
  (value) => {
    return !value || !value.length || value[0].size < 5000000 || '头图大小超过 5 MB!'
  },
]

const test = () => {
  changeThemes(themes['ayuMirage'])
}
//todo 图片裁切功能
const articleSource = ref<ArticleSource>()
const articleSourceUrl = ref(null)
const articleSourceItem = ref<{ text: string; value: ArticleSource }>()
const ArticleSourceItems = Object.keys(ArticleSource).map((key) => {
  return { text: ArticleSourceZh[key], value: key }
})
const { data: groupData } = await useFetchGetArticleGroupList()
articleGroupList.value = groupData
const settingsDialog = ref(false)
const themeName = ref<string>('cyanosis')
const darkThemeName = ref<string>('geekBlackDark')
const highlightStyle = ref<string>('xcode')
const darkHighlightStyle = ref<string>('xcode')
const selectThemeTabName = ref('')

onMounted(async () => {
  const id = String(route.query.id)
  let version = Number(route.query.version || -1)
  await load(id, version)

  watchEffect(async () => {
    if (themeInstance.global.name.value === 'dark') {
      await changeThemes(themes[darkThemeName.value])
      await changeHighlightStyle(darkHighlightStyle.value)
      if (selectThemeTabName.value !== 'dark') {
        selectThemeTabName.value = 'dark'
      }
    } else {
      await changeThemes(themes[themeName.value])
      await changeHighlightStyle(highlightStyle.value)
      if (selectThemeTabName.value !== 'light') {
        selectThemeTabName.value = 'light'
      }
    }
  })
  watch(selectThemeTabName, (val) => {
    if (val === 'dark') {
      layout.switchDarkTheme(themeInstance)
    } else {
      layout.switchLightTheme(themeInstance)
    }
  })

  watchEffect(async () => {
    if (articleSourceItem.value) {
      articleSource.value = articleSourceItem.value.value
    }
  })

  watch(bannerFile, () => {
    disableUploadBtn.value = bannerFile.value == null
  })
})

async function load(id: string, version: number) {
  if (Boolean(id) === false) {
    isNew.value = true
    await router.push({
      query: {
        new: 'true',
      },
    })
  } else {
    if (route.query.id) {
      afId.value = String(route.query.id)
      const { data: ArticleFieldResponse } = await useAxiosGetArticleField(afId.value, version)
      //todo 优化
      if (ArticleFieldResponse.data === null) {
        await router.push({
          query: {
            new: 'true',
          },
        })
      } else if (ArticleFieldResponse.code === 0) {
        articleFieldData.value = ArticleFieldResponse.data
        if (articleFieldData?.value.user.id !== userStore.user?.id) {
          // await clearError({redirect: '/'})
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            data: 'data',
            fatal: true,
            message: 'Unauthorized',
          })
        }
        const { data: ContentResponse } = await useAxiosGetArticleContent(afId.value, {
          type: ContentType.markdown,
          version: version,
        })
        if (ContentResponse.code === 0) {
          content.value = ContentResponse.data
          title.value = articleFieldData.value.title
          articleGroupId.value = articleFieldData.value.articleGroup.id
          articleTagList.value = articleFieldData.value.articleTags
          banner.value = articleFieldData.value.banner
          summary.value = articleFieldData.value.summary
          // articleSource.value = articleFieldData.value.articleSource
          articleSourceItem.value = {
            text: ArticleSourceZh[articleFieldData.value.articleSource],
            value: articleFieldData.value.articleSource,
          }
          articleSourceUrl.value = articleFieldData.value.articleSourceUrl
          themeName.value = articleFieldData.value.markDownTheme
          darkThemeName.value = articleFieldData.value.markDownThemeDark
          highlightStyle.value = articleFieldData.value.codeHighlightStyle
        }
      }
    }
  }
}

const rules = {
  email: (v) => !!(v || '').match(/@/) || '请输入有效的电子邮件',
  length: (len) => (v) => (v || '').length <= len || `文章摘要需小于或等于${len}个字符`,
  password: (v) =>
    !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    '密码必须包含大写字母、数字字符和特殊字符',
  required: (v) => !!v || '此字段是必需的。',
}

const changeText = async (text) => {
  content.value = text
}

const send = async () => {
  if (title.value.trim() === '') {
    infoMsg('标题不能为空')
    return
  }
  if (content.value.trim() === '') {
    infoMsg('内容不能为空')
    return
  }
  saveState()
  menu.value = true
  await nextTick()
  setTimeout(() => {
    const element: HTMLImageElement = document.querySelector('.d-draft-banner img')
    console.log(element)
    mediumZoom(element, {
      background: 'rgba(0, 0, 0, 0.8)',
      scrollOffset: 0,
      margin: 0,
    })
  }, 1000)
}

const publishArticle = async () => {
  articleTagIds.value = new Set<string>()
  articleTagList.value.forEach((tag) => {
    articleTagIds.value.add(tag.id)
  })
  let body: CreateArticleBody = {
    allowComment: true,
    articleGroupId: articleGroupId.value,
    articleState: ArticleState.published,
    articleTagIds: Array.from(articleTagIds.value),
    banner: banner.value,
    content: content.value,
    summary: summary.value,
    title: title.value,
    articleSource: articleSource.value,
    articleSourceUrl: articleSourceUrl.value,
    codeHighlightStyle: highlightStyle.value,
    codeHighlightStyleDark: darkHighlightStyle.value,
    markDownTheme: themeName.value,
    markDownThemeDark: darkThemeName.value,
  }
  const { data: axiosResponse } = await useAxiosPostCreateArticle(body)
  if (axiosResponse.code === 0) {
    // successMsg('发布成功')
    const url = '/article/' + axiosResponse.data
    const timeout = setTimeout(() => {
      window.location.href = url
      // useRouter().push('/article/' + axiosResponse.data.id)
    }, 5000)
    ComponentToastMsg(`发布成功{{}}秒后自动跳转到文章`, TYPE.SUCCESS, JumpPrompt, 5, timeout, url)
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const updateArticle = async () => {
  articleTagIds.value = new Set()
  articleTagList.value.forEach((tag) => {
    articleTagIds.value.add(tag.id)
    // articleTagIds.value.push(tag.id)
  })
  console.log(articleTagIds.value)
  let body: CreateArticleBody = {
    allowComment: true,
    articleGroupId: articleGroupId.value,
    articleState: ArticleState.published,
    articleTagIds: Array.from(articleTagIds.value),
    banner: banner.value,
    content: content.value,
    summary: summary.value,
    title: title.value,
    articleSource: articleSource.value,
    articleSourceUrl: articleSourceUrl.value,
    articleId: afId.value,
    codeHighlightStyle: highlightStyle.value,
    codeHighlightStyleDark: darkHighlightStyle.value,
    markDownTheme: themeName.value,
    markDownThemeDark: darkThemeName.value,
  }
  const { data: axiosResponse } = await useAxiosPutUpdateArticle(body)
  if (axiosResponse.code === 0) {
    // successMsg('更新成功')
    const url = '/article/' + afId.value
    const timeout = setTimeout(async () => {
      window.location.href = url
      // await useRouter().push('/article/' + afId.value)
    }, 5000)
    ComponentToastMsg(`更新成功{{}}秒后自动跳转到文章`, TYPE.SUCCESS, JumpPrompt, 5, timeout, url)
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const saveState = () => {
  // console.log('saveState')
  beforeChangeState = {
    articleGroupId: toRaw(articleGroupId.value),
    articleTagList: toRaw(articleTagList.value),
    banner: toRaw(banner.value),
    summary: toRaw(summary.value),
    articleSource: toRaw(articleSource.value),
    articleSourceUrl: toRaw(articleSourceUrl.value),
  }
}
let beforeChangeState = {
  articleGroupId: '',
  articleTagList: [],
  banner: '',
  summary: '',
  articleSource: null,
  articleSourceUrl: '',
}
const bannerFileUploading = ref(false)
const localBannerImg = ref()
let lastUploadFileName = ''
const clickCutterBtn = () => {
  const element: HTMLElement = document.querySelector('.CutterBtn')
  element.click()
  menu.value = false
}
const cutDown = async (res) => {
  bannerFile.value = res.file
  menu.value = true
  await uploadBannerFile(res)
}

const uploadBannerFile = async (res) => {
  if (bannerFile.value === null) {
    defaultMsg('请选择文件')
  }

  //todo 文件上传接口细分
  bannerFileUploading.value = true
  const file = bannerFile.value
  console.log(file)
  if (res.dataURL === localBannerImg.value) {
    defaultMsg('请勿重复上传')
    bannerFileUploading.value = false
    return
  }
  localBannerImg.value = res.dataURL
  const { data: response } = await useAxiosPostUploadImg(file)
  bannerFileUploading.value = false
  if (response.code === 0) {
    const imgUrl = 'https://' + response.data + '?imageslim'
    const imgBase64 = await getUploadPictureBase64AndAudit(imgUrl, '图片违规上传失败')
    if (imgBase64) {
      banner.value = imgUrl
      localBannerImg.value = imgBase64
      lastUploadFileName = file.name
      defaultMsg('上传成功')
    } else {
    }
  } else {
    warningMsg('上传失败')
  }
}
const cancelChange = () => {
  menu.value = false
  articleGroupId.value = beforeChangeState.articleGroupId
  articleTagList.value = beforeChangeState.articleTagList
  banner.value = beforeChangeState.banner
  summary.value = beforeChangeState.summary
  articleSource.value = beforeChangeState.articleSource
  articleSourceUrl.value = beforeChangeState.articleSourceUrl
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
    'article/article/manage/historyVersion/' + afId.value
  )
  versionHistoryList.value = response.data
}

const gotoVersion = async (version: number) => {
  await load(afId.value, version)
  // successMsg('切换版本成功')
}
const editorTitleInputLabelFontSize = ref('130%')
// v-field--active
onMounted(() => {
  const editorTitleInput = document.querySelector('.d-editor-title > div.v-input__control > div')
  watchEffect(() => {
    // content.value.split('\n')
  })
  const observer = new MutationObserver((e) => {
    if (editorTitleInput.classList.contains('v-field--active')) {
      editorTitleInputLabelFontSize.value = '80%'
    } else {
      editorTitleInputLabelFontSize.value = '130%'
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
  /*font-size: v-bind('editorTitleInputLabelFontSize');*/
  color: v-bind('themeInstance.global.name.value === "dark" ? "#fff" : "#24292e"');
}

:deep(.vue-img-cutter) {
  z-index: 9999 !important;
}
</style>
