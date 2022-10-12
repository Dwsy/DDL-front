<template>
  <div class="mt-6">
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
              transition="scale-transition"
              z-index="9999"
          >
            <template v-slot:activator="{ props }">
              <v-btn v-if="isNew" color="blue" v-bind="props"
                     @click="publishArticle()">发布
              </v-btn>
              <v-btn v-else color="#42b732" v-bind="props"
                     class="text-white" @click="updateArticle()">
                更新
              </v-btn>
            </template>

            <v-card min-width="300">
              <!--              <v-list>-->
              <!--                <v-list-item-->
              <!--                    prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"-->
              <!--                    title="John Leider"-->
              <!--                    subtitle="Founder of Vuetify"-->
              <!--                >-->
              <!--                  <template v-slot:append>-->
              <!--                    <v-btn-->
              <!--                        variant="text"-->
              <!--                        :class="fav ? 'text-red' : ''"-->
              <!--                        icon="mdi-heart"-->
              <!--                        @click="fav = !fav"-->
              <!--                    ></v-btn>-->
              <!--                  </template>-->
              <!--                </v-list-item>-->
              <!--              </v-list>-->

              <v-divider></v-divider>

              <!--              <v-list>-->
              <!--                <v-list-item>-->
              <!--                  <v-switch-->
              <!--                      v-model="message"-->
              <!--                      color="purple"-->
              <!--                      label="Enable messages"-->
              <!--                      hide-details-->
              <!--                  ></v-switch>-->
              <!--                </v-list-item>-->

              <!--                <v-list-item>-->
              <!--                  <v-switch-->
              <!--                      v-model="hints"-->
              <!--                      color="purple"-->
              <!--                      label="Enable hints"-->
              <!--                      hide-details-->
              <!--                  ></v-switch>-->
              <!--                </v-list-item>-->
              <!--              </v-list>-->

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    text
                    @click="menu = false"
                >
                  取消
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="menu = false"
                >
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </client-only>
      </div>
      <v-avatar class="mr-8" size="large">
        <v-img :src="articleFieldData.user.userInfo.avatar"></v-img>
      </v-avatar>
    </v-row>
    <BytemdEditor :content="content" @change-text="changeText"></BytemdEditor>
  </div>
</template>

<script setup lang="ts">
import {useRoute} from '#app'
import {onMounted, ref} from 'vue'
import 'bytemd/dist/index.min.css'
import BytemdEditor from '~/components/article/write/bytemdEditor.vue'
import {
  useAxiosCreateArticle,
  useAxiosGetArticleContent,
  useAxiosGetArticleField
} from '~/composables/Api/article/manageArticle'
import {ArticleField} from '~/stores/article/articleStore'
import {ArticleSource, ArticleState, CreateArticleBody} from '~/types/article/manageArticle'
import {ArticleGroup} from '~/types/article'
import {definePageMeta} from '#imports'
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
const route = useRoute()
const isNew = ref(false)
const content = ref('')
const afId = ref(0)
const articleFieldData = ref<ArticleField>()
const title = ref('')
const articleGroupId = ref(0)
const articleTagIds = ref<number[]>()
const banner = ref('')
const summary = ref('')
const articleGroupList = ref<ArticleGroup[]>()
const articleTagList = ref<ArticleGroup[]>()
const articleSource = ref<ArticleSource>()
const articleSourceUrl = ref(null)
onMounted(async () => {
  if (route.query.new) {
    isNew.value = true
    // articleFieldData.value = null
    // articleFieldData.value.title = ''
  } else {
    if (route.query.id) {
      afId.value = Number(route.query.id)
      const {data: ArticleFieldResponse} = await useAxiosGetArticleField(afId.value)
      if (ArticleFieldResponse.code === 0) {
        articleFieldData.value = ArticleFieldResponse.data
        const {data: ContentResponse} = await useAxiosGetArticleContent(afId.value)
        if (ContentResponse.code === 0) {
          content.value = ContentResponse.data
          title.value = articleFieldData.value.title
        }
      }

    }
  }

})

const changeText = (text) => {
  content.value = text
}

const publishArticle = async () => {
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
  // const {data: axiosResponse} = await useAxiosCreateArticle(body)
}
const updateArticle = () => {
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
  console.log(body)

}
</script>
<script lang="ts">
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
}
</script>

<style scoped>

</style>