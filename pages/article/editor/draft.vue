<template>
  <div class="mt-6" v-if="articleGroupId">
    <v-row>
      <v-text-field class="ml-5 " v-model="title" placeholder="输入文章标题..." label="标题"
                    prepend-icon="mdi-format-title" variant="underlined" clearable>
      </v-text-field>
      <div class="mt-2 mr-4">
        <v-btn>手动保存</v-btn>
        <v-btn>草稿箱</v-btn>


        <client-only>
          <v-menu
              v-model="menu"
              :close-on-content-click="false"
              location="end"
              :open-on-click="false"
          >
            <template v-slot:activator="{ props }">
              <v-btn v-if="isNew" color="blue"
                     @click="send()">发布
              </v-btn>
              <v-btn v-else color="#42b732" v-bind="props"
                     class="text-white" @click="send()">
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
                            @click="()=>{this.articleGroupId=g.id}" filter="true">
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

              <v-card max-height="300px" class="mb-5" elevation="0">
                <span class="pt-2 px-4 text-body-1">文章头图：预览</span>
                <v-img :src="localBannerImg?localBannerImg:banner" class="mx-4"></v-img>
              </v-card>


              <v-row style="width: 90%" class="ml-8 ">
                <v-file-input label="选择文章头图" variant="underlined"
                              density="compact" prepend-icon="mdi-camera"
                              v-model="bannerFile"
                              accept="image/png, image/jpeg, image/bmp" :rules="bannerRules">
                </v-file-input>
                <v-btn color="blue" @click="uploadBannerFile()"
                       :disabled="disableUploadBtn" class="ml-4 text-white" elevation="1">
                  {{ !banner ? '上传' : '重新上传' }}
                </v-btn>
              </v-row>
              <!--              <v-divider class="mt-2"></v-divider>-->
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
        </client-only>
      </div>
      <v-avatar class="mr-8" size="large">
        <v-img :src="articleFieldData?.user.userInfo.avatar"></v-img>
      </v-avatar>
    </v-row>
    <BytemdEditor :content="content" @change-text="changeText"></BytemdEditor>
  </div>
</template>

<script setup lang="ts">
import {clearError, useRoute, useRouter} from '#app'
import {onMounted, ref, provide, reactive, toRaw, watch, watchEffect} from 'vue'
import 'bytemd/dist/index.min.css'
import BytemdEditor from '~/components/article/write/bytemdEditor.vue'
import {
  useAxiosGetArticleContent,
  useAxiosGetArticleField, useAxiosPostCreateArticle, useAxiosPostUploadImg, useAxiosPutUpdateArticle
} from '~/composables/Api/article/manageArticle'
import {ArticleField} from '~/stores/article/articleStore'
import {ArticleSource, ArticleSourceZh, ArticleState, CreateArticleBody} from '~/types/article/manageArticle'
import {ArticleGroup, ArticleTag} from '~/types/article'
import {
  createError,
  definePageMeta,
  useFetchGetArticleGroupList,
  defaultMsg,
  infoMsg,
  useAxiosPostUploadAvatar, warningMsg, successMsg, errorMsg
} from '#imports'
import {useUserStore} from '~/stores/user'
import SelectTag from '~/components/article/write/selectTag.vue'
// import breaks from '@bytemd/plugin-breaks'
// import highlight from '@bytemd/plugin-highlight'
// import footnotes from '@bytemd/plugin-footnotes'
// import frontmatter from '@bytemd/plugin-frontmatter'
// import gfm from '@bytemd/plugin-gfm'
// import mediumZoom from '@bytemd/plugin-medium-zoom'
// import gemoji from '@bytemd/plugin-gemoji'
definePageMeta({
  layout: false
})
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
const articleTagIds = ref([])
const banner = ref('')
const summary = ref('')
const articleGroupList = ref<ArticleGroup[]>()
const articleTagList = ref<ArticleTag[]>()
provide('tagList', {articleTagList})
const bannerFile = ref<File[]>()
const disableUploadBtn = ref(true)
const bannerRules = [
  value => {
    return !value || !value.length || value[0].size < 5000000 || '头图大小超过 5 MB!'
  },
]
//todo 图片裁切功能
const articleSource = ref<ArticleSource>()
const articleSourceUrl = ref(null)
const articleSourceItem = ref<{ text: string, value: ArticleSource }>()
const ArticleSourceItems = Object.keys(ArticleSource).map((key) => {
  return {text: ArticleSourceZh[key], value: key}
})
onMounted(async () => {
  if (route.query.new) {
    isNew.value = true
    // articleFieldData.value = null
    // articleFieldData.value.title = ''
  } else {
    if (route.query.id) {
      afId.value = String(route.query.id)
      const {data: ArticleFieldResponse} = await useAxiosGetArticleField(afId.value)
      if (ArticleFieldResponse.code === 0) {
        articleFieldData.value = ArticleFieldResponse.data
        // console.log(articleFieldData.value.user.id,userStore.user.id)
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
        const {data: ContentResponse} = await useAxiosGetArticleContent(afId.value)
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
          watchEffect(() => {
            articleSource.value = articleSourceItem.value.value
          })
        }
      }
    }
  }
  // watchEffect(() => {
  //   console.log('articleTagList', articleTagList.value)
  //   articleTagList.value.forEach((tag) => {
  //     articleTagIds.value.push(tag.id)
  //   })
  // })

  const {data: groupData} = await useFetchGetArticleGroupList()
  articleGroupList.value = groupData
  watch(bannerFile, () => {
    disableUploadBtn.value = bannerFile.value.length <= 0
  })
})
const rules = {
  email: v => !!(v || '').match(/@/) || '请输入有效的电子邮件',
  length: len => v => (v || '').length <= len || `文章摘要需小于或等于${len}个字符`,
  password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
      '密码必须包含大写字母、数字字符和特殊字符',
  required: v => !!v || '此字段是必需的。',
}

const changeText = (text) => {
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
  articleTagIds.value = []
  articleTagList.value.forEach((tag) => {
    articleTagIds.value.push(tag.id)
  })
  let body: CreateArticleBody = {
    allowComment: true,
    articleGroupId: articleGroupId.value,
    articleState: ArticleState.open,
    articleTagIds: articleTagIds.value,
    banner: banner.value,
    content: content.value,
    summary: summary.value,
    title: title.value,
    articleSource: articleSource.value,
    articleSourceUrl: articleSourceUrl.value
    // articleId: 0,
  }
  console.log(body)
  const {data: axiosResponse} = await useAxiosPostCreateArticle(body)
  if (axiosResponse.code === 0) {
    successMsg('发布成功')
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const updateArticle = async () => {
  articleTagIds.value = []
  articleTagList.value.forEach((tag) => {
    articleTagIds.value.push(tag.id)
  })
  let body: CreateArticleBody = {
    allowComment: true,
    articleGroupId: articleGroupId.value,
    articleState: ArticleState.open,
    articleTagIds: articleTagIds.value,
    banner: banner.value,
    content: content.value,
    summary: summary.value,
    title: title.value,
    articleSource: articleSource.value,
    articleSourceUrl: articleSourceUrl.value,
    articleId: afId.value,
  }
  const {data: axiosResponse} = await useAxiosPutUpdateArticle(body)
  if (axiosResponse.code === 0) {
    successMsg('发布成功')
  } else {
    errorMsg(axiosResponse.msg)
  }
  console.log(body)
}
const saveState = () => {
  console.log('saveState')
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
const uploadBannerFile = async () => {
  if (bannerFile.value === null) {
    defaultMsg('请选择文件')
  }
  //todo 文件上传接口细分
  bannerFileUploading.value = true
  const file = bannerFile.value[0]
  if (file.name === lastUploadFileName) {
    defaultMsg('请勿重复上传')
    bannerFileUploading.value = false
    return
  }
  const {data: response} = await useAxiosPostUploadImg(file)
  bannerFileUploading.value = false
  if (response.code === 0) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      banner.value = 'https://' + response.data + '?imageslim'
      localBannerImg.value = reader.result
    }
    lastUploadFileName = file.name
    defaultMsg('上传成功')

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
</script>
<script lang="ts">

</script>

<style scoped>
.v-chip--selected {
  color: #9b59b6;
}
</style>