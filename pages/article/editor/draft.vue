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

            <v-card min-width="550">
              <div class="px-4 pt-2 ">
                <div class="text-subtitle-1">
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
                  <span class="pt-3 px-4 text-body-1">标签:</span>
                  {{ articleTagIds }}
                  <v-card>
                    <v-card-title>
                      Search for Public APIs
                    </v-card-title>

                    <v-card-text>
                      Explore hundreds of free API's ready for consumption! For more information visit
                      <a
                          class="text-grey-lighten-3"
                          href="https://github.com/toddmotto/public-apis"
                          target="_blank"
                          rel="noopener noreferrer"
                      >the GitHub repository</a>.
                    </v-card-text>

                    <v-card-text>
                      <v-autocomplete
                          v-model="model"
                          v-model:search="search"
                          :items="items"
                          :loading="isLoading"
                          hide-no-data
                          hide-selected
                          item-title="Description"
                          item-value="API"
                          label="Public APIs"
                          placeholder="Start typing to Search"
                          prepend-icon="mdi-database-search"
                          return-object
                      ></v-autocomplete>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-expand-transition>
                      <div v-if="model">
                        <v-list color="red-lighten-3">
                          <v-list-item
                              v-for="(field, i) in fields"
                              :key="i"
                          >
                            <v-list-item-header>
                              <v-list-item-title>{{ field.value }}</v-list-item-title>

                              <v-list-item-subtitle>{{ field.key }}</v-list-item-subtitle>
                            </v-list-item-header>
                          </v-list-item>
                        </v-list>
                      </div>
                    </v-expand-transition>

                    <v-divider v-if="model"></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn
                          :disabled="!model"
                          variant="outlined"
                          @click="model = null"
                      >
                        Clear

                        <v-icon end>
                          mdi-close-circle
                        </v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <!--                  <v-chip-group multiple v-if="articleTagIds"-->
                  <!--                                v-bind:model-value="articleTagIds">-->
                  <!--                    <v-chip v-for="tag in articleTagList" :key="tag.id" :value="tag.id"-->
                  <!--                            @click="()=>{}" closable="true" close-icon="mdi-close-circle-outline">-->
                  <!--                      {{ tag.name }}-->
                  <!--                    </v-chip>-->
                  <!--                  </v-chip-group>-->
                </v-row>
              </div>


              <v-divider class="mt-4"></v-divider>

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
                <v-btn text @click="menu = false">
                  取消
                </v-btn>
                <v-btn color="primary" text @click="menu = false">
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
import {ArticleGroup, ArticleTag} from '~/types/article'
import {definePageMeta, useFetchGetArticleGroupList} from '#imports'
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
const articleSource = ref<ArticleSource>()
const articleSourceUrl = ref(null)
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
        const {data: ContentResponse} = await useAxiosGetArticleContent(afId.value)
        if (ContentResponse.code === 0) {
          content.value = ContentResponse.data
          title.value = articleFieldData.value.title
          articleGroupId.value = articleFieldData.value.articleGroup.id
          articleTagList.value = articleFieldData.value.articleTags
          articleFieldData.value.articleTags.forEach((tag) => {
            articleTagIds.value.push(tag.id)
          })
        }
      }

    }
  }
  const {data: groupData} = await useFetchGetArticleGroupList()
  articleGroupList.value = groupData

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
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
  }),

  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || 'n/a',
        }
      })
    },
    items() {
      return this.entries.map(entry => {
        const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

        return Object.assign({}, entry, {Description})
      })
    },
  },

  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
          .then(res => res.json())
          .then(res => {
            const {entries} = res
            this.entries = entries.slice(0, 100)
            this.count = 100
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
    },
  },


}
</script>

<style scoped>
.v-chip--selected {
  color: #9b59b6;
}
</style>