<template>
  <div class="v-container">
    <v-row class="article-content">

      <v-col xl="10" lg="10" md="10" sm="10" xs="12" class="ml-0 ml-md-2 ml-lg-6">
        <div class="pt-4">
          <div>
            <v-row>
              <v-col>
              <span class="text-h5 pl-4">
                {{ field.title }}
              </span>
              </v-col>
            </v-row>
            <v-divider class="mt-2 mb-3"></v-divider>
            <v-row>
              <v-col cols="1" class="mr-lg-5 mr-xl-n2 mr-md-10 mr-sm-8 mr-16">
                <v-avatar size="x-large">
                  <v-img :src="field.user.userInfo.avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="5" class="ml-n1 mt-1">
                <v-row>
                  <v-col class="ml-n8 ">
                    <span>{{ field.user.nickname }}</span>
                    <span class="pl-3">Level:{{ field.user.level }}</span>

                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="ml-n8 mt-n3 d-none d-sm-flex" style="color:#8a919f">
                    <span>  {{ dateFilter(field.createTime, 'YYYY-MM-DD hh:mm') }} · </span>
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
            <v-row class="d-flex d-sm-none mx-4">
              <v-col>
                <v-col class="ml-n8 mt-n3 " style="color:#8a919f">
                  <span>  {{ dateFilter(field.createTime, 'YYYY-MM-DD hh:mm') }} · </span>
                  <span>阅读量：{{ field.viewNum }}</span>
                </v-col>
              </v-col>
            </v-row>
          </div>

          <v-divider class="my-4"></v-divider>

          <div v-html="articleStore.contentHtml" :class="markdownTheme" class=" js-toc-content"></div>

        </div>
        <v-divider class="mt-8 mb-6"></v-divider>

        <v-row>
          <v-col>
            <v-chip class="mr-6" color="primary" label>
              <v-icon left>mdi-format-list-group</v-icon>
              分组：{{ field.articleGroup.name }}
            </v-chip>
            <div class="my-3  d-md-none"></div>
            <v-chip class="mr-2" color="pink lighten-1" label>
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

            <v-col cols="1" class="d-none d-md-flex">
              <v-avatar size="x-large">
                <v-img :src="field.user.userInfo.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="ml-xl-n8 ml-lg-n2">
              <v-textarea fluid placeholder="评论点啥吧。" clearable v-model="articleCommentStore.replyCommentText"
                          clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                          rows="4" auto-grow="true">

              </v-textarea>
              <v-btn class="float-end mx-6 mb-4" color="primary" @click="ReplyComment()">发送</v-btn>
            </v-col>

            <v-divider class="mb-6 mt-n4"></v-divider>
          </v-row>

          <!--// todo 这功能啥正常到但是会runtime-dom.esm-bundler.js:13 等vuetify更新在改-->
          <!--          Uncaught (in promise) TypeError: Cannot read properties of null (reading 'parentNode')-->
          <!--          <v-row>-->
          <!--            <v-col>-->
          <!--              <div class="text-start">-->
          <!--                <v-menu location="bottom" nudge-bottom>-->
          <!--                  <template v-slot:activator="{ props }">-->
          <!--                    <v-btn-->
          <!--                        color="info"-->
          <!--                        v-bind="props"-->
          <!--                        prepend-icon="mdi-menu"-->
          <!--                    >-->
          <!--                      <span>{{ CommentMenuList[selectCommentMenu] }}</span>-->
          <!--                    </v-btn>-->
          <!--                  </template>-->

          <!--                  <v-list>-->
          <!--                    <v-list-item-->
          <!--                        v-for="(item, index) in CommentMenuList"-->
          <!--                        :key="index"-->
          <!--                    >-->
          <!--                      <v-btn elevation="0" @click="clickSelectCommentMenu(index)">{{ item }}</v-btn>-->
          <!--                    </v-list-item>-->
          <!--                  </v-list>-->

          <!--                </v-menu>-->
          <!--              </div>-->
          <!--            </v-col>-->
          <!--          </v-row>-->


          <div v-if="articleCommentStore.loadingComment" class="text-h4 text-center">
          <span>
            加载中...
          </span>
          </div>

          <div v-else v-for="(comment,index) in articleCommentStore.commentList" key="comment.id">
            <v-row class="mt-2 mt-lg-3">

              <v-col cols="2" xl="1" lg="1" sm="1" class="mr-1">
                <v-avatar size="x-large">
                  <v-img :src="comment.user.userInfo.avatar"></v-img>
                </v-avatar>

              </v-col>


              <v-col class="ml-xl-n8 ">
                #{{ index + 1 }}:{{ comment.id }}
                <span>{{ comment.user.nickname }}</span>
                <span class="pl-3 mr-4">Level:{{ comment.user.level }}</span>
                <br class="d-md-none"/>
                <span class="mr-4">  {{ dateFilter(comment.createTime, 'YYYY-MM-DD hh:mm') }}</span>
                <v-divider></v-divider>
                <v-row class="mt-1">
                  <v-col>
                    <span>{{ comment.text }}</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn rounded plain elevation="0" outlined size="small" class="mr-3"
                           @click="articleCommentStore.ActionComment(commentType.up,comment.id,index)">
                      <v-icon :icon="articleCommentStore.getCommentActionIcon(commentType.up,index)"
                              :color="articleCommentStore.getCommentActionColor(commentType.up,index)"></v-icon>
                      <span v-if="comment.upNum>0">
                      {{ comment.upNum }}
                    </span>
                    </v-btn>
                    <v-btn class="mr-3" rounded plain elevation="0" outlined size="small"
                           @click="articleCommentStore.ActionComment(commentType.down,comment.id,index)">
                      <v-icon :icon="articleCommentStore.getCommentActionIcon(commentType.down,index)"
                              :color="articleCommentStore.getCommentActionColor(commentType.down,index)"></v-icon>
                      <span v-if="comment.downNum>0">
                      {{ comment.downNum }}
                    </span>
                    </v-btn>

                    <v-btn size="small" rounded plain elevation="0" outlined
                           @click="articleCommentStore.showCommentBox(index)">
                      <v-icon size="large">mdi-reply-outline</v-icon>
                      <span v-if="comment.childComments.length>0">
                      {{ comment.childComments.length }}
                    </span>
                    </v-btn>

                    <v-col v-if="comment.showCommentBox" class="ml-n8 px-0 px-lg-8 px-md-8 px-sm-2 transition-swing">
                      <v-textarea fluid placeholder="回复点啥吧。" clearable
                                  v-model="comment.replyCommentText"
                                  clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                  rows="4" auto-grow="true">
                      </v-textarea>

                      <v-btn class="float-end mx-6 mb-4" color="primary"
                             @click="ReplyComment(comment.user.id,comment.id,index)">发送
                      </v-btn>
                    </v-col>

                    <v-row>
                      <v-col>
                        <div v-for="(childComment,Cindex) in comment.childComments" key="comment.id">
                          <v-row class="mt-5">

                            <v-col cols="2" class="mr-3 mr-sm-4" xl="1" lg="1" md="1" sm="1">
                              <v-avatar size="x-large">
                                <v-img
                                    :src="childComment.user.userInfo.avatar"></v-img>
                              </v-avatar>
                            </v-col>


                            <v-col class="ml-xl-n8">
                              #{{ Cindex + 1 }}:{{ childComment.id }}
                              <span>{{ childComment.user.nickname }}</span>
                              <span class="pl-3 mr-4">Level:{{ childComment.user.level }}</span>
                              <br class="d-sm-none"/>
                              <span class="mr-4">{{ dateFilter(childComment.createTime, 'YYYY-MM-DD hh:mm') }}</span>
                              <v-divider></v-divider>
                              <div>
                                <v-row class="mt-1">
                                  <v-col>
                                    <span>{{ childComment.text }}</span>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <v-btn rounded plain elevation="0" outlined size="small" class="mr-3"
                                           @click="articleCommentStore.ActionComment(commentType.up,childComment.id,index,Cindex)">
                                      <v-icon
                                          :icon="articleCommentStore.getCommentActionIcon(commentType.up,index,Cindex)"
                                          :color="articleCommentStore.getCommentActionColor(commentType.up,index,Cindex)"></v-icon>
                                      <span v-if="childComment.upNum>0">
                                    {{ childComment.upNum }}
                                  </span>
                                    </v-btn>
                                    <v-btn class="mr-3" rounded plain elevation="0" outlined size="small"
                                           @click="articleCommentStore.ActionComment(commentType.down,childComment.id,index,Cindex)">
                                      <v-icon
                                          :icon="articleCommentStore.getCommentActionIcon(commentType.down,index,Cindex)"
                                          :color="articleCommentStore.getCommentActionColor(commentType.down,index,Cindex)"></v-icon>
                                      <span v-if="childComment.downNum>0">
                                    {{ childComment.downNum }}
                                  </span>
                                    </v-btn>

                                    <v-btn rounded plain elevation="0" outlined
                                           @click="articleCommentStore.showCommentBox(index,Cindex)"
                                           size="small">
                                      <v-icon size="large">mdi-reply-outline</v-icon>
                                    </v-btn>
                                    <v-col v-if="childComment.showCommentBox"
                                           class="ml-n8 px-0 px-lg-8 px-md-8 px-sm-2 transition-swing">

                                      <v-textarea fluid placeholder="回复点啥吧。" clearable
                                                  v-model="childComment.replyCommentText"
                                                  clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                                  rows="4" auto-grow="true">

                                      </v-textarea>
                                      <v-btn class="float-end mx-6 mb-4" color="primary"
                                             @click="ReplyComment(comment.user.id,comment.id,index,Cindex)">发送
                                      </v-btn>
                                    </v-col>
                                    <v-row>

                                    </v-row>

                                  </v-col>
                                </v-row>
                              </div>
                            </v-col>
                            <!--                          <v-divider class="my-4" v-if="Cindex+1!==comment.childComments.length||index+1===CommentContentList.length"></v-divider>-->
                            <v-divider class="my-4"></v-divider>
                          </v-row>

                        </div>
                      </v-col>
                    </v-row>

                  </v-col>
                </v-row>
              </v-col>
              <v-divider class="my-2" v-if="index+1!==articleCommentStore.commentList.length"></v-divider>

            </v-row>

          </div>


        </div>


      </v-col>
      <v-col class="toc">
        <div class="js-toc">
        </div>
      </v-col>

    </v-row>


    <div class="side-toolbar1">
      <v-chip-group>
        <v-chip class="mr-6" label>
          <v-icon left>mdi-thumb-up-outline</v-icon>
          {{ field.upNum }}
        </v-chip>
        <v-chip class="mr-6" label>
          <v-icon left>mdi-thumb-down-outline</v-icon>
          {{ field.downNum }}
        </v-chip>
        <v-chip class="mr-6" label>
          <v-icon left>mdi-cards-heart-outline</v-icon>
          {{ field.downNum }}
        </v-chip>
      </v-chip-group>

    </div>
  </div>

</template>


<script setup lang="ts">
//todo 夜间模式
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'
import {
  ArticleCommentAction,
  commentType, ReplyArticleCommentBody,
  useAxiosGetArticleComment,
  useAxiosPostActionArticleComment, useAxiosPostReplyArticleComment, useFetchGetArticleContent, useFetchGetArticleField
} from '~/composables/Api/article'
import {onMounted, onUnmounted, ref} from 'vue'
import ignore from 'ignore'
import {useRoute, watch} from '#imports'
import {onBeforeRouteLeave, onBeforeRouteUpdate} from 'vue-router'
import {useArticleStore, ArticleField} from '~/stores/article/articleStore'
import {useArticleCommentStore, CommentContent} from '~/stores/article/articleCommentStore'

let route = useRoute()
let aid = route.params.aid
let articleStore = useArticleStore()
let articleCommentStore = useArticleCommentStore()

let ArticleField = await useFetchGetArticleField(aid)
articleStore.articleField = ArticleField.data
let ArticleContent = await useFetchGetArticleContent(aid)
articleStore.contentHtml = ArticleContent.data
let field: ArticleField
field = articleStore.articleField

let loadingComment = false
let CommentContentList = ref<CommentContent[]>()

const mdThemeName = ['cyanosis', 'smart-blue', 'juejin', 'devui-blue', 'v-green', 'arknights']
let markdownTheme = ref('')

const ReplyComment = articleCommentStore.ReplyComment
const replyCommentText = ref(articleCommentStore.replyCommentText)
const showCommentMenu = ref(false)
const CommentMenuList = ref([])
const selectCommentMenu = ref(1)

const message = ref('')
const showMessage = ref(false)

onMounted(async () => {
  let r = Math.ceil(Math.random() * mdThemeName.length) - 1
  markdownTheme.value = 'markdown-body-' + mdThemeName[r]
  console.log('onMounted')
  hljs.highlightAll()
  if (route.hash) {
    const el = document.querySelector(route.hash)
    if (el) {
      el.scrollIntoView()
    }
  }
  setTimeout(() => {
    createToc()
  }, 100)
  CommentMenuList.value = ['按热读 ↓', '按时间 ↑', '按时间 ↓']
  await articleCommentStore.init(field)


})

onUnmounted(() => {
  console.log('onUnmounted')
  articleStore.$reset()
  articleCommentStore.$reset()
})

onBeforeRouteUpdate(async (to, from, next) => {
  if (to.hash) {
    if (to.path !== from.path) {
      next()
    } else {
      return
    }
  } else {
    next()
  }
})


const createToc = () => {
  // // toc()
  // // const element = document.getElementsByClassName("article-content")
  // let tocbotJS = document.createElement('script')
  // tocbotJS.src = 'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/tocbot/4.18.0/tocbot.min.js'
  // document.body.append(tocbotJS)
  // // @ts-ignore
  // tocbotJS.onload = tocbotJS.onreadystatechange = function () {
  //   if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
  //     //do something here!
  //     // @ts-ignore
  //
  //   }
  //   // @ts-ignore
  //   tocbotJS = tocbotJS.onreadystatechange = null
  // }
  // @ts-ignore
  tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.js-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3,h4',
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: false,
    // includeHtml: true,
    includeTitleTags: false,
    scrollSmoothOffset: -50,
    scrollSmooth: true,
    scrollSmoothDuration: 500,
  })
}


// const loadComment = async (properties?: string, order?, page?: number) => {
//   loadingComment.value = true
//   let params = {
//     properties: properties,
//     order: order,
//     page: page
//   }
//   let {data: commentData} = await useAxiosGetArticleComment(aid, params)
//   CommentContentList.value = commentData.data.content
//   for (let commentContent of CommentContentList.value) {
//     commentContent.replyCommentText = ref('')
//     commentContent.childComments.forEach(childComment => {
//       childComment.replyCommentText = ref('')
//     })
//   }
//   loadingComment.value = false
// }

// const clickSelectCommentMenu = (index: number) => {
//   selectCommentMenu.value = index
//   switch (index) {
//     case 0:
//       loadComment('upNum', 'desc')
//       break
//     case 1:
//       loadComment('createTime', 'asc')
//       break
//     case 2:
//       loadComment('createTime', 'desc')
//       break
//   }
// }







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
  border-color: rgba(136, 136, 136, 0.49)
</style>
<style lang="css">
/*.article-content p{*/
/*  font-size: 20px;*/
/*}*/

.toc::-webkit-scrollbar {
  width: 0 !important;
}


.toc {
  position: sticky;
  top: 10%;
  height: 500px;
  font-size: 17px;
  overflow: hidden;
  overflow-y: auto;
  /*border-style: solid;*/
  /*border-width: 1px;*/
  /*border-color: rgba(136, 136, 136, 0.44);*/
}

.toc-list {
  padding-left: 2em;
}

.toc > .toc-list li {
  list-style: auto;
}

.side-toolbar1 {
  position: fixed;
  bottom: 30px;
  right: 0;
  /*width: 200px;*/
  padding: 20px;
}

.v-container {
  max-width: 100%;
}
</style>