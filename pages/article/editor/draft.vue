<template>
  <div class="mt-4">

    <v-row>
      <v-text-field class="ml-5 d-editor-title" v-model="title" placeholder="输入文章标题..." label="标题"
                    variant="underlined" clearable>
      </v-text-field>
      <div class="mt-1 mr-4">
        <v-btn elevation="1" :theme="themeInstance.global.name.value">手动保存</v-btn>
        <v-btn elevation="0" color="blue" class="mx-1" variant="outlined">草稿箱</v-btn>


        <client-only>
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              location="end"
              :persistent="true"
              :open-on-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-btn v-if="isNew" color="blue" elevation="0"
                     v-bind="props" @click="send()">
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
                  {{ isNew ? '发布' : '更新' }}文章
                </div>
                <v-divider class="mb-3"></v-divider>

                <v-row>
                  <span class="pt-3 px-4 text-body-1">分类:</span>
                  <v-chip-group mandatory v-if="articleGroupList"
                                v-bind:model-value="articleGroupId">
                    <v-chip v-for="g in articleGroupList" :key="g.id" :value="g.id"
                            @click="articleGroupId=g.id" filter="true">
                      {{ g.name }}
                    </v-chip>
                  </v-chip-group>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                  <span class="pt-6 px-4 text-body-1">标签:</span>
                  <select-tag style="width: 80%" class="py-2"></select-tag>
                </v-row>
              </div>
              <v-divider class="mt-1 mb-2"></v-divider>

              <v-card class="mb-5" elevation="0">
                <span class="pt-2 px-4 text-body-1">文章头图：预览</span>
                <v-img :src="localBannerImg?localBannerImg:banner"
                       aspect-ratio="8/3" max-height="300px" max-width="100%"
                       class="mx-4"></v-img>
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
                <v-btn color="blue" class="ml-2 mb-6 mr-10" @click="clickCutterBtn()">
                  {{ !banner ? '上传' : '重新上传' }}
                </v-btn>
              </div>
              <!--                </template>-->
              <!--              </ImgCutter>-->
              <!--                <v-btn color="blue" @click="uploadBannerFile()"-->
              <!--                       :disabled="disableUploadBtn" class="ml-4 text-white" elevation="1">-->
              <!--                </v-btn>-->


              <v-textarea class="mx-2 mt-1" v-model="summary" placeholder="输入文章摘要..."
                          label="文章摘要" :rules="[rules.length(150)]" counter="150"
                          variant="outlined" clearable no-resize="no-resize"></v-textarea>
              <v-select prepend-icon="mdi-progress-pencil"
                        label="文章来源" class="mx-2 mt-n5"
                        :items="ArticleSourceItems"
                        item-title="text" item-value="value"
                        return-object
                        variant="underlined" v-model="articleSourceItem"
              ></v-select>
              <!--              {{ articleSourceItem }}-->
              <!--              {{ articleSource }}-->
              <v-text-field v-if="articleSource!==ArticleSource.original"
                            label="来源文章URL" variant="outlined" class="mx-2">
              </v-text-field>
              <v-card-actions>
                <v-btn text @click="cancelChange()">
                  取消
                </v-btn>
                <v-btn color="primary" text @click="()=>{
                  if(isNew){
                    publishArticle()
                    this.menu = false
                  }else {
                    updateArticle()
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
import ImgCutter from 'vue-img-cutter/src/components/ImgCutter'
import BytemdEditor from '~/components/article/write/bytemdEditor.vue'
import {
  ContentType,
  useAxiosGetArticleContent,
  useAxiosGetArticleField,
  useAxiosPostCreateArticle,
  useAxiosPostUploadImg,
  useAxiosPutUpdateArticle
} from '~/composables/Api/article/manageArticle'
import {ArticleField} from '~/stores/article/articleStore'
import {ArticleSource, ArticleSourceZh, ArticleState, CreateArticleBody} from '~/types/article/manageArticle'
import {ArticleGroup, ArticleTag} from '~/types/article'
import {
  ComponentToastMsg,
  createError,
  defaultMsg,
  definePageMeta,
  errorMsg,
  infoMsg,
  successMsg, useCookie,
  useFetchGetArticleGroupList,
  warningMsg
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
import {getUploadPictureBase64AndAudit} from '~/composables/utils/picture'
import {useTheme} from 'vuetify'
import {TYPE} from 'vue-toastification/src/ts/constants'
import JumpPrompt from '~/components/article/creator/content/article/Toast/jumpPrompt.vue'
import {useLayout} from '~/stores/layout'


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
provide('tagList', {articleTagList})
const bannerFile = ref<File>()
const disableUploadBtn = ref(true)
const bannerRules = [
  value => {
    return !value || !value.length || value[0].size < 5000000 || '头图大小超过 5 MB!'
  },
]
// import '~~/constant/mwebMarkDownThemes/dark/ayuMirage'

const test = () => {
  changeThemes(themes['ayuMirage'])
  // console.log(themes['ayuMirage'])
}
//todo 图片裁切功能
const articleSource = ref<ArticleSource>()
const articleSourceUrl = ref(null)
const articleSourceItem = ref<{ text: string, value: ArticleSource }>()
const ArticleSourceItems = Object.keys(ArticleSource).map((key) => {
  return {text: ArticleSourceZh[key], value: key}
})
const {data: groupData} = await useFetchGetArticleGroupList()
articleGroupList.value = groupData
const settingsDialog = ref(false)
const themeName = ref<string>('cyanosis')
const darkThemeName = ref<string>('geekBlackDark')
const highlightStyle = ref<string>('xcode')
onMounted(async () => {
  const id = route.query.id
  if (Boolean(id) === false) {

    isNew.value = true
    await router.push({
      query: {
        new: 'true'
      }
    })
    // disableUploadBtn.value = false
    // articleFieldData.value = null
    // articleFieldData.value.title = ''

  } else {

    if (route.query.id) {
      afId.value = String(route.query.id)
      const {data: ArticleFieldResponse} = await useAxiosGetArticleField(afId.value)
      //todo 优化
      if (ArticleFieldResponse.data === null) {
        await router.push({
          query: {
            new: 'true'
          }
        })
      } else if (ArticleFieldResponse.code === 0) {
        articleFieldData.value = ArticleFieldResponse.data
        if (articleFieldData?.value.user.id !== userStore?.user.id) {
          // await clearError({redirect: '/'})
          throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            data: 'data',
            fatal: true,
            message: 'Unauthorized'
          })
        }
        const {data: ContentResponse} = await useAxiosGetArticleContent(afId.value, {
          type: ContentType.markdown
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
            value: articleFieldData.value.articleSource
          }
          articleSourceUrl.value = articleFieldData.value.articleSourceUrl
          themeName.value = articleFieldData.value.markDownTheme
          darkThemeName.value = articleFieldData.value.markDownThemeDark
          highlightStyle.value = articleFieldData.value.codeHighlightStyle
        }
      }
    }
  }

  watchEffect(async () => {
    if (themeInstance.global.name.value === 'dark') {
      // document.querySelector('html').style.backgroundColor = '#0e0e0e'
      // let element: HTMLElement = document.querySelector('#input-0')
      // element.style.color = '#FFF'
      // console.log('dark')
      await changeThemes(themes[darkThemeName.value])
      // let right: HTMLElement = document.querySelector('.bytemd-status-right')
      // right.style.color = '#FFF'
      // let left: HTMLElement = document.querySelector('.bytemd-status-left')
      // left.style.color = '#FFF'
      // document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-left > div > svg')
      //     .forEach((item: HTMLElement) => {
      //       item.style.color = '#FFF'
      //     })
      // document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div > svg')
      //     .forEach((item: HTMLElement) => {
      //       item.style.color = '#FFF'
      //     })
      // let css = await import('~~/constant/codemirrorTheme/monokai')
      // let markdownThemeStyleElement = document.querySelector('#codemirrorTheme')
      // if (markdownThemeStyleElement) {
      //   markdownThemeStyleElement.innerHTML = css.default
      // } else {
      //   markdownThemeStyleElement = document.createElement('style')
      //   markdownThemeStyleElement.id = 'codemirrorTheme'
      //   markdownThemeStyleElement.innerHTML = css.default
      //   document.head.appendChild(markdownThemeStyleElement)
      // }

    } else {
      // document.querySelector('html').style.backgroundColor = '#FFF'
      // let element: HTMLElement = document.querySelector('#input-0')
      // element.style.color = '#000'
      await changeThemes(themes[themeName.value])
      // let right: HTMLElement = document.querySelector('.bytemd-status-right')
      // right.style.color = '#000'
      // let left: HTMLElement = document.querySelector('.bytemd-status-left')
      // left.style.color = '#000'
      // document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-left > div > svg')
      //     .forEach((item: HTMLElement) => {
      //       item.style.color = '#000'
      //     })
      // document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div > svg')
      //     .forEach((item: HTMLElement) => {
      //       item.style.color = '#000'
      //     })
      // let css = await import('~~/constant/codemirrorTheme/default')
      // let markdownThemeStyleElement = document.querySelector('#codemirrorTheme')
      // if (markdownThemeStyleElement) {
      //   markdownThemeStyleElement.innerHTML = css.default
      // } else {
      //   markdownThemeStyleElement = document.createElement('style')
      //   markdownThemeStyleElement.id = 'codemirrorTheme'
      //   markdownThemeStyleElement.innerHTML = css.default
      //   document.head.appendChild(markdownThemeStyleElement)
      // }

    }
  })

  watchEffect(async () => {
    await changeHighlightStyle(highlightStyle.value)
  })

  watchEffect(async () => {
    if (articleSourceItem.value) {
      articleSource.value = articleSourceItem.value.value
    }
  })

  watch(bannerFile, () => {
    disableUploadBtn.value = bannerFile.value == null
    // const reader = new FileReader()
    // const file = bannerFile.value[0]
    // reader.readAsDataURL(file)
    // reader.onload = () => {
    //   localBannerImg.value = reader.result
    // }
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
    infoMsg('标题不能为空')
    return
  }
  if (content.value.length <= 0) {
    infoMsg('内容不能为空')
    return
  }
  saveState()
  menu.value = true
}

const publishArticle = async () => {
  articleTagIds.value = new Set<string>()
  articleTagList.value.forEach((tag) => {
    articleTagIds.value.add(tag.id)
    // articleTagIds.value.push(tag.id)
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
    markDownTheme: themeName.value,
    markDownThemeDark: darkThemeName.value
  }
  const {data: axiosResponse} = await useAxiosPostCreateArticle(body)
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
    markDownTheme: themeName.value,
    markDownThemeDark: darkThemeName.value
  }
  const {data: axiosResponse} = await useAxiosPutUpdateArticle(body)
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
    articleSourceUrl: toRaw(articleSourceUrl.value)
  }
}
let beforeChangeState = {
  articleGroupId: '',
  articleTagList: [],
  banner: '',
  summary: '',
  articleSource: null,
  articleSourceUrl: ''
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
  const {data: response} = await useAxiosPostUploadImg(file)
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

// const randomThemeJuejin = () => {
//   themeName.value = themeNameList[Math.ceil(Math.random() * themeNameList.length) - 1]
// }
const randomHighlightStyle = (list: Array<string>) => {
  highlightStyle.value = list[Math.ceil(Math.random() * list.length) - 1]
}
// const randomThemeLight = () => {
//   themeName.value = mwebLightNameList[Math.ceil(Math.random() * mwebLightNameList.length) - 1]
// }
// const randomThemeDark = () => {
//   darkThemeName.value = mwebDarkList[Math.ceil(Math.random() * mwebDarkList.length) - 1]
// }
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
    attributes: true
  })
})


</script>
<script lang="ts">

</script>


<style scoped>


:deep(.v-chip--selected) {
  color: #9b59b6;
}

:deep(.d-editor-title label) {
  font-size: v-bind('editorTitleInputLabelFontSize');
  color: v-bind('themeInstance.global.name.value === "dark" ? "#fff" : "#24292e"');;
}

:deep(.vue-img-cutter) {
  z-index: 9999 !important;
}
</style>

