<template>

  <v-row>
    <v-col xl="1" lg="1" md="0" sm="0" xs="0"></v-col>

    <v-col xl="10" lg="10" md="10" sm="12" xs="12">
      <div class="pt-4">


        <div>
          <v-row>
            <v-col class="pl-4">
          <span class="text-h5">
            {{ field.title }}
          </span>
            </v-col>
          </v-row>
          <v-divider class="mt-2 mb-3"></v-divider>
          <v-row>
            <v-col cols="1">
              <v-avatar size="x-large">
                <v-img :src="field.user.userInfo.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="ml-n1 mt-1">
              <v-row>
                <v-col class="ml-n8 ">
                  <span>{{ field.user.nickname }}</span>
                  <span class="pl-3">Level:{{ field.user.level }}</span>

                </v-col>
              </v-row>

              <v-row>
                <v-col class="ml-n8 mt-n3 text" style="color:#8a919f">
                  <span>  {{ dataFilter(field.createTime, 'YYYY-MM-DD hh:mm') }} · </span>
                  <span>阅读量：{{ field.viewNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="mt-2">
              <v-btn class="float-end mx-4" color="blue lighten-3">
                <span style="color: white">关注</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>

        <v-divider class="my-4"></v-divider>
        <div v-html="html" :class="markdownTheme"></div>
      </div>
      <v-divider class="mt-8 mb-6"></v-divider>
      <v-row>
        <v-col>
          <v-chip class="mr-6" label color="primary">
            <v-icon left>mdi-format-list-group</v-icon>
            分组：{{ field.articleGroup.name }}
          </v-chip>

          <v-chip color="pink lighten-1" label class="mr-2">
            <v-icon left>mdi-tag</v-icon>
            <span>标签</span>
          </v-chip>
          <v-chip class="mr-1" v-for="tag in field.articleTags" :key="tag.id">
            <nuxt-link :to="`/article/tag/${tag.id}`">
              {{ tag.name }}
            </nuxt-link>
          </v-chip>
        </v-col>
      </v-row>

      <v-divider class="mt-10 mb-6"></v-divider>


      <div class="comment pa-3">
        <span class="text-h6 ml-2">评论</span>
        <v-row class="mt-5">

          <v-col cols="1">
            <v-avatar size="x-large">
              <v-img :src="field.user.userInfo.avatar"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="ml-n8">
            <v-textarea fluid placeholder="评论点啥吧。" clearable
                        clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                        rows="4" auto-grow="true">

            </v-textarea>
            <v-btn class="float-end mx-6 mb-4" color="primary">发送</v-btn>
          </v-col>

          <v-divider class="mb-6 mt-n4"></v-divider>
        </v-row>

        <div v-for="(comment,index) in CommentContentList" key="comment.id">
          <v-row class="mt-5">

            <v-col cols="1">
              <v-avatar size="x-large">
                <v-img :src="comment.user.userInfo.avatar"></v-img>
              </v-avatar>

            </v-col>


            <v-col class="ml-n8 ">
              #{{ index + 1 }}:{{comment.id}}
              <span>{{ comment.user.nickname }}</span>
              <span class="pl-3">Level:{{ comment.user.level }}</span>
              <span class="mx-4">  {{ dataFilter(comment.createTime, 'YYYY-MM-DD hh:mm') }}</span>
              <v-divider></v-divider>
              <v-row class="mt-1">
                <v-col>
                  <span>{{ comment.text }}</span>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn rounded plain elevation="0" outlined size="small" class="mr-3">
                    <v-icon>mdi-thumb-up-outline</v-icon>
                    <span v-if="comment.upNum>0">
                      {{ comment.upNum }}
                    </span>
                  </v-btn>
                  <v-btn rounded plain elevation="0" outlined size="small">
                    <v-icon>mdi-thumb-down-outline</v-icon>
                    <span v-if="comment.downNum>0">
                      {{ comment.downNum }}
                    </span>
                  </v-btn>

                  <v-btn rounded plain elevation="0" outlined @click="showCommentBox(index)">
                    <v-icon>mdi-reply-outline</v-icon>
                    <span v-if="comment.childComments.length>0">
                      {{ comment.childComments.length }}
                    </span>
                  </v-btn>

                  <v-col v-if="comment.showCommentBox" class="ml-n8 px-8">
                    <v-textarea fluid placeholder="回复点啥吧。" clearable
                                clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                rows="4" auto-grow="true">

                    </v-textarea>
                    <v-btn class="float-end mx-6 mb-4" color="primary">发送</v-btn>
                  </v-col>

                  <v-row>
                    <v-col>
                      <div v-for="(childComment,indexC) in comment.childComments" key="comment.id">
                        <v-row class="mt-5">

                          <v-col cols="1">
                            <v-avatar size="x-large">
                              <v-img
                                 :src="childComment.user.userInfo.avatar"></v-img>
                            </v-avatar>

                          </v-col>


                          <v-col class="ml-n8 ">
                            #{{ indexC + 1 }}:{{childComment.id}}
                            <span>{{ childComment.user.nickname }}</span>
                            <span class="pl-3">Level:{{ childComment.user.level }}</span>
                            <span class="mx-4">  {{ dataFilter(childComment.createTime, 'YYYY-MM-DD hh:mm') }}</span>
                            <v-divider></v-divider>
                            <v-row class="mt-1">
                              <v-col>
                                <span>{{ childComment.text }}</span>
                              </v-col>
                            </v-row>
                            <v-row>
                              <v-col>
                                <v-btn rounded plain elevation="0" outlined size="small" class="mr-3">
                                  <v-icon>mdi-thumb-up-outline</v-icon>
                                  <span v-if="childComment.upNum>0">
                                    {{ childComment.upNum }}
                                  </span>
                                </v-btn>
                                <v-btn rounded plain elevation="0" outlined size="small">
                                  <v-icon>mdi-thumb-down-outline</v-icon>
                                  <span v-if="childComment.downNum>0">
                                    {{ childComment.downNum }}
                                  </span>
                                </v-btn>

                                <v-btn rounded plain elevation="0" outlined @click="showCommentBox(index,indexC)" >
                                  <v-icon>mdi-reply-outline</v-icon>
                                  <!--                                  <span v-if="childComment.childComments.length>0">-->
                                  <!--                                    {{ childComment.childComments.length }}-->
                                  <!--                                  </span>-->
                                </v-btn>
                                <v-col v-if="childComment.showCommentBox" class="ml-n8 px-8">
                                  <v-textarea fluid placeholder="回复点啥吧。" clearable
                                              clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                              rows="4" auto-grow="true">

                                  </v-textarea>
                                  <v-btn class="float-end mx-6 mb-4" color="primary">发送</v-btn>
                                </v-col>
                                <v-row>

                                </v-row>

                              </v-col>
                            </v-row>
                          </v-col>
                          <v-divider class="my-4" v-if="index+1!==comment.childComments.length"></v-divider>

                        </v-row>

                      </div>
                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
            </v-col>
            <v-divider class="my-2" v-if="index+1!==CommentContentList.length"></v-divider>

          </v-row>

        </div>

      </div>


    </v-col>

    <v-col xl="1" lg="1" md="1" sm="0" xs="0"></v-col>
  </v-row>

</template>


<script setup lang="ts">
//todo 夜间模式
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import {ref} from 'vue'

onMounted(() => {
  hljs.highlightAll()
})
let route = useRoute()
let field: ArticleField = null
let CommentContentList = ref<CommentContent[]>([])
// console.log("article"+route.params.id);
// let url = "http://localhost/article/article/field/9"
// const d = await useAsyncData(url, () => $fetch(url))
const mdThemeName = ['cyanosis', 'smart-blue', 'juejin', 'devui-blue', 'v-green', 'arknights']
let markdownTheme = 'markdown-body-' + mdThemeName[0]
let {data: fieldData} = await useFetchGetArticleField(route.params.id)
field = fieldData
let {data: html} = await useFetchGetArticleContent(route.params.id, {type: 0})
let {data: commentData} = await useFetchGetArticleComment(route.params.id)
CommentContentList.value = commentData.content

const showCommentBox = (pIndexId:number,cIndexId?:number) => {
  if (cIndexId==undefined) {
    CommentContentList.value[pIndexId].showCommentBox = !CommentContentList.value[pIndexId].showCommentBox
    CommentContentList.value.forEach((value, index) => {
      if (index !== pIndexId) {
        value.showCommentBox = false
        value.childComments.forEach(value1 => {
          value1.showCommentBox = false
        })
      }
      if (index === pIndexId) {
        value.childComments.forEach((value1, index1) => {
          if (index1 !== cIndexId) {
            value1.showCommentBox = false
          }
        })
      }
    })
  }else {
    CommentContentList.value[pIndexId].childComments[cIndexId].showCommentBox = !CommentContentList.value[pIndexId].childComments[cIndexId].showCommentBox
    CommentContentList.value.forEach((value, index) => {
      if (index !== pIndexId) {
        value.showCommentBox = false
      }
      if (index === pIndexId) {
        value.showCommentBox = false
        value.childComments.forEach((value1, index1) => {
          if (index1 !== cIndexId) {
            value1.showCommentBox = false
          }
        })
      }
    })
  }
}

</script>
<script lang="ts">
interface UserInfo {
  id: number;
  avatar: string;
  sign: string;
  gender: string;
  birth: any;
}

interface User {
  id: number;
  nickname: string;
  userInfo: UserInfo;
  level: number;
}

interface ArticleTags {
  id: number;
  name: string;
  articleNum: number;
  tagInfo: string;
}

interface ArticleGroup {
  id: number;
  name: string;
  info: string;
  articleNum: number;
}

interface ArticleField {
  id: number;
  createTime: number;
  lastModifiedTime: number;
  user: User;
  title: string;
  summary: string;
  articleState: string;
  allowComment: boolean;
  viewNum: number;
  collectNum: number;
  upNum: number;
  downNum: number;
  banner: string;
  articleTags: ArticleTags;
  articleGroup: ArticleGroup;
}

//--
interface UserInfo {
  id: number;
  avatar: string;
  sign: string;
  gender: string;
  birth: any;
}


interface CommentContent {
  id: number;
  deleted: boolean;
  createTime: number;
  lastModifiedTime: number;
  user: User;
  text: string;
  upNum: number;
  downNum: number;
  parentUserId: number;
  parentCommentId: number;
  parentUser: any;
  childComments: CommentContent[];
  commentType: string;
  ua: string;
  showCommentBox:boolean;
}


</script>

<style lang="sass">
@import "../../assets/sass/mdTheme/cyanosis"
@import "../../assets/sass/mdTheme/v-green"
@import "../../assets/sass/mdTheme/arknights"
@import "../../assets/sass/mdTheme/smart-blue.css"
@import "../../assets/sass/mdTheme/juejin"
@import "../../assets/sass/mdTheme/devui-blue"

.comment
  border-style: solid
  border-width: 1px
  border-color: #595959
</style>