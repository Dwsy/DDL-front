<template>
  <div class="v-container">
    <v-row class="article-content">

      <v-col xl="10" lg="10" md="10" sm="10" xs="12" class="ml-0 ml-md-2 ml-lg-6">
        <div class="pt-4">
          <div>

            <v-row>
              <v-col cols="1" class="mr-lg-5 mr-xl-n2 mr-md-10 mr-sm-8 mr-16">
                <v-avatar size="x-large">
                  <v-img :src="articleStore.articleField.user.userInfo.avatar"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="5" class="ml-n1 mt-1">
                <v-row>
                  <v-col class="ml-n8 ">
                    <span>{{ articleStore.articleField.user.nickname }}</span>
                    <span class="pl-3">Level:{{ articleStore.articleField.user.level }}</span>

                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="ml-n8 mt-n3 d-none d-sm-flex" style="color:#8a919f">
                    <span>  {{ dateFilter(articleStore.articleField.createTime, 'YYYY-MM-DD hh:mm') }} · </span>
                    <span>阅读量：{{ articleStore.articleField.viewNum }}</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mt-2">

                <v-btn v-if="articleStore.follow" class="float-end mx-4" color="pink lighten-3">
                  <span style="color: white" @click="()=>{unFollowUser(articleStore.articleField.user.id)
                                                          articleStore.follow=false}">已关注</span>
                </v-btn>
                <v-btn v-else class="float-end mx-4" color="blue lighten-3"
                       @click="()=>{followUser(articleStore.articleField.user.id)
                                                          articleStore.follow=true}">
                  <span style="color: white">关注</span>
                </v-btn>
              </v-col>
            </v-row>
            <v-row class="d-flex d-sm-none mx-4">
              <v-col>
                <v-col class="ml-n8 mt-n3 " style="color:#8a919f">
                  <span>  {{ dateFilter(articleStore.articleField.createTime, 'YYYY-MM-DD hh:mm') }} · </span>
                  <span>阅读量：{{ articleStore.articleField.viewNum }}</span>
                </v-col>
              </v-col>
            </v-row>
          </div>
          <v-divider class="my-4"></v-divider>
          <v-row class="my-1">
            <v-col>
              <span class="text-h4 pl-4" id="T-title">
                {{ articleStore.articleField.title }}
              </span>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <div v-html="articleStore.contentHtml"
               v-show="articleStore.markdownTheme"
               :class="articleStore.markdownTheme"
               class=" js-toc-content"

          ></div>
          <!--          v-intersect="()=>{gotoTitle=true}"-->
          <div v-show="!articleStore.markdownTheme" class="text-center text-h4 mt-16" style="margin-bottom:100% ">
            <span>
              加载中...
            </span>
          </div>

        </div>
        <v-divider class="mt-8 mb-6"></v-divider>

        <v-row>
          <v-col id="comments">
            <v-chip class="mr-6" color="primary" label>
              <v-icon left>mdi-format-list-group</v-icon>
              分组：{{ articleStore.articleField.articleGroup.name }}
            </v-chip>
            <div class="my-3  d-md-none"></div>
            <v-chip class="mr-2" color="pink lighten-1" label>
              <v-icon left>mdi-tag</v-icon>
              <span>标签</span>
            </v-chip>
            <v-chip class="mr-1" v-for="tag in articleStore.articleField.articleTags" :key="tag.id">
              <nuxt-link :to="`/article/tag/${tag.id}`">
                {{ tag.name }}
              </nuxt-link>
            </v-chip>
          </v-col>
        </v-row>

        <v-divider class="mt-10 mb-6"></v-divider>

        <div class="comment pa-3" v-intersect="onIntersect">
          <span class="text-h6 ml-2" id="comments1">评论</span>
          <v-row class="mt-5">
            <v-col cols="1" class="d-none d-md-flex">
              <v-avatar size="x-large">
                <v-img :src="user?.userInfo?.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col class="ml-xl-n8 ml-lg-n2">
              <v-textarea fluid placeholder="评论点啥吧。" clearable v-model="articleCommentStore.replyCommentText"
                          clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                          rows="4">
                <!--                auto-grow-->
              </v-textarea>
              <v-btn class="float-end mx-6 mb-4" color="primary" @click="ReplyComment()">发送</v-btn>
            </v-col>
            <v-divider class="mb-6 mt-n4"></v-divider>
          </v-row>


          <!--// todo 这功能啥正常到但是会runtime-dom.esm-bundler.js:13 等vuetify更新在改 -->
          <!--          Uncaught (in promise) TypeError: Cannot read properties of null (reading 'parentNode')-->
          <!--                    <v-row>-->
          <!--                      <v-col>-->
          <!--                        <div>-->
          <!--                          <v-menu location="bottom" nudge-bottom>-->
          <!--                            <template v-slot:activator="{ props }">-->
          <!--                              <v-btn-->
          <!--                                  color="info"-->
          <!--                                  v-bind="props"-->
          <!--                                  prepend-icon="mdi-menu"-->
          <!--                              >-->
          <!--                                <span>{{ articleCommentStore.selectCommentMenu }}</span>-->
          <!--                              </v-btn>-->
          <!--                            </template>-->

          <!--                            <v-list>-->
          <!--                              <v-list-item-->
          <!--                                  v-for="(item, index) in articleCommentStore.CommentMenuList"-->
          <!--                                  :key="index"-->
          <!--                              >-->
          <!--                                <v-btn elevation="0" @click="articleCommentStore.clickSelectCommentMenu(index)">{{ item }}</v-btn>-->
          <!--                              </v-list-item>-->
          <!--                            </v-list>-->

          <!--                          </v-menu>-->
          <!--                        </div>-->
          <!--                      </v-col>-->
          <!--                    </v-row>-->

          <v-row>
            <v-col>
              <v-list>
                <v-list-item
                    v-for="(item, index) in articleCommentStore.CommentMenuList"
                    :key="index"
                >
                  <v-btn elevation="0" @click="articleCommentStore.clickSelectCommentMenu(index)">{{ item }}</v-btn>
                </v-list-item>
              </v-list>
            </v-col>

          </v-row>


          <div v-if="articleCommentStore.loadingComment"
               class="text-h3 my-16 text-center">
            <!--            <v-sheet-->
            <!--                color="grey"-->
            <!--                class="pa-3"-->
            <!--            >-->
            <!--              <v-skeleton-loader-->
            <!--                  class="mx-auto"-->
            <!--                  max-width="300"-->
            <!--                  type="card"-->
            <!--              ></v-skeleton-loader>-->
            <!--            </v-sheet>-->
            <span>
            加载中...
          </span>
          </div>
          <div v-if="articleCommentStore.commentList.length===0">
            <div class="text-center my-8">
              <span class="text-h6 ">
                暂无评论
              </span>
            </div>
          </div>

          <div v-else v-for="(comment,index) in articleCommentStore.commentList" key="comment.id">
            <v-row class="mt-2 mt-lg-3">

              <v-col cols="1" xl="0" lg="1" sm="1" class="mr-8  mr-xl-n5 mr-lg-n2 d-comment">
                <v-avatar size="x-large">
                  <v-img :src="comment.user.userInfo.avatar"></v-img>
                </v-avatar>

              </v-col>


              <v-col class="ml-xl-n8 " :id="`comment-${comment.id}`">
                #{{ index + 1 }}
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

                    <v-col v-if="comment.showCommentBox"
                           class="ml-n8 px-0 px-lg-8 px-md-8 px-sm-2 transition-swing">
                      <div v-if="user.token">
                        <v-textarea fluid placeholder="回复点啥吧。" clearable
                                    v-model="comment.replyCommentText"
                                    clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                    rows="4" auto-grow="true">
                        </v-textarea>

                        <v-btn class="float-end mx-6 mb-4" color="primary"
                               @click="ReplyComment(comment.user.id,comment.id,index)">发送
                        </v-btn>
                      </div>
                      <div v-else class="text-center">
                        <nuxt-link to="/user/login">
                          <v-btn>
                            登陆
                          </v-btn>
                        </nuxt-link>
                      </div>
                    </v-col>


                    <v-row>
                      <v-col>
                        <div v-for="(childComment,Cindex) in comment.childComments" key="comment.id">
                          <v-row class="mt-5">

                            <v-col cols="2" class="mr-4 mr-sm-4 mr-xl-n5 mr-lg-n2 d-comment" xl="1" lg="1" md="1"
                                   sm="1">
                              <v-avatar size="x-large">
                                <v-img
                                    :src="childComment.user.userInfo.avatar"></v-img>
                              </v-avatar>
                            </v-col>


                            <v-col class="ml-xl-n8" :id="`comment-${childComment.id}`">
                              #{{ Cindex + 1 }}
                              <span>{{ childComment.user.nickname }}</span>
                              <span class="pl-3 mr-4">Level:{{ childComment.user.level }}</span>
                              <br class="d-sm-none"/>
                              <span class="mr-4">{{
                                  dateFilter(childComment.createTime, 'YYYY-MM-DD hh:mm')
                                }}</span>
                              <v-divider></v-divider>
                              <div>
                                <v-row class="mt-1">
                                  <v-col>
                                    <div v-if="childComment.replayCommentId===0">{{ childComment.text }}</div>

                                    <div v-else
                                         v-html="atSrtGotoHome(childComment.text,childComment.parentUserId)"></div>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col>
                                    <v-btn rounded plain elevation="0" outlined size="small" class="mr-3"
                                           @click="articleCommentStore.ActionComment(commentType.up,childComment.id,index,Cindex)">
                                      <v-icon
                                          :icon="articleCommentStore.getCommentActionIcon(commentType.up,index,Cindex)"
                                          :color="articleCommentStore.getCommentActionColor(commentType.up,index,Cindex)"></v-icon>
                                      <span v-if="childComment.upNum> 0">
                                    {{ childComment.upNum }}
                                  </span>
                                    </v-btn>
                                    <v-btn class="mr-3" rounded plain elevation="0" outlined size="small"
                                           @click="articleCommentStore.ActionComment(commentType.down,childComment.id,index,Cindex)">
                                      <v-icon
                                          :icon="articleCommentStore.getCommentActionIcon(commentType.down,index,Cindex)"
                                          :color="articleCommentStore.getCommentActionColor(commentType.down,index,Cindex)"></v-icon>
                                      <span v-if="childComment.downNum> 0">
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

                                      <div v-if="user.token">
                                        <v-textarea fluid placeholder="回复点啥吧。" clearable
                                                    v-model="childComment.replyCommentText"
                                                    clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                                                    rows="4" auto-grow="true">

                                        </v-textarea>
                                        <v-btn class="float-end mx-6 mb-4" color="primary"
                                               @click="ReplyComment(childComment.user.id,comment.id,index,Cindex,childComment.id)">
                                          发送
                                        </v-btn>
                                      </div>
                                      <div v-else class="text-center">
                                        <nuxt-link to="/user/login">
                                          <v-btn>
                                            登陆
                                          </v-btn>
                                        </nuxt-link>
                                      </div>
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
    <!--    https://vuetifyjs.com/zh-Hans/components/floating-action-buttons/#section-5c0f578b630994ae-->
    <!--    <v-speed-dial></v-speed-dial> todo 移动端要这个效果但是vuetify3还没这个组件-->

    <!-- todo 数字显 太长到话转换为文本w万啥到 如果这么大到数据到话。。-->
    <div class="side-toolbar1">
      <a href="#comments" v-if="!gotoTitle">
        <v-btn rounded elevation="0" @click="gotoTitle=true"
               size="small" class="mr-3" outlined>
          <v-icon>mdi-message-reply-text-outline</v-icon>
        </v-btn>
      </a>
      <a href="#T-title" v-else>
        <v-btn rounded elevation="0" @click="gotoTitle=false"
               size="small" class="mr-3" outlined>
          <v-icon>mdi-arrow-up-circle-outline</v-icon>
        </v-btn>
      </a>
      <v-btn rounded plain elevation="0" outlined size="small" class="mr-3"
             @click="articleStore.ActionArticle(commentType.up)">
        <v-icon :icon="articleStore.getArticleActionIcon(commentType.up)"></v-icon>
        <span v-if="articleStore.articleField.upNum>0">
          {{ articleStore.articleField.upNum }}
        </span>
      </v-btn>
      <v-btn class="mr-3" rounded plain elevation="0" outlined size="small"
             @click="articleStore.ActionArticle(commentType.down)">
        <v-icon :icon="articleStore.getArticleActionIcon(commentType.down)"></v-icon>
        <span v-if="articleStore.articleField.downNum>0">
          {{ articleStore.articleField.downNum }}
        </span>
      </v-btn>
      <v-btn class="mr-3" rounded plain elevation="0" outlined size="small">
        <v-icon icon="mdi-cards-heart-outline"></v-icon>
        <span v-if="articleStore.articleField.collectNum>0">
          {{ articleStore.articleField.collectNum }}
        </span>
      </v-btn>
    </div>
  </div>

</template>


<script setup lang="ts">
import hljs from 'highlight.js'
// import vCode from '~/utils/HljsLine'
import 'highlight.js/styles/atom-one-light.css'
// import 'highlight.js/styles/atom-one-dark.css'
import {commentType, useFetchGetArticleContent, useFetchGetArticleField} from '~/composables/Api/article'
import {onMounted, onUnmounted, ref, watch} from 'vue'
import {useRoute, dateFilter, definePageMeta} from '#imports'
import {onBeforeRouteUpdate} from 'vue-router'
import {useArticleStore} from '~/stores/article/articleStore'
import {useArticleCommentStore} from '~/stores/article/articleCommentStore'
import {useUserStore} from '~/stores/user'
import {useTheme} from 'vuetify'
import {useHead} from '#head'
import {atSrtGotoHome} from '~/composables/useTools'
import {followUser, unFollowUser} from '~/composables/Api/user/following'

definePageMeta({
  keepalive: false
})
//todo 移动端适配
let route = useRoute()
let aid = route.params.aid

let theme = useTheme()
let user = useUserStore()

let articleStore = useArticleStore()
let articleCommentStore = useArticleCommentStore()

let ArticleField = await useFetchGetArticleField(aid)
articleStore.articleField = ArticleField.data
let ArticleContent = await useFetchGetArticleContent(aid)
articleStore.contentHtml = ArticleContent.data


const ReplyComment = articleCommentStore.ReplyComment

const gotoTitle = ref(false)

const message = ref('')
const showMessage = ref(false)
useHead({
  title: articleStore.articleField.title
})
onMounted(async () => {
  //
  if (user.token === '') {
    articleCommentStore.replyCommentText = '请先登陆'
  }
  await articleStore.init()
  if (theme.global.name.value === 'dark') {
    articleStore.markdownTheme = articleStore.markdownThemeDark
  } else {
    articleStore.markdownTheme = articleStore.markdownThemeLight
  }
  // https://highlightjs.readthedocs.io/en/latest/line-numbers.html?highlight=line
  hljs.highlightAll()

  setTimeout(() => {
    createToc()
    if (route.hash) {
      console.log(route.hash)
      const el = document.querySelector(route.hash)
      if (el) {
        el.scrollIntoView()
      }
    } else {
      document.documentElement.scrollTop = 0
    }
  }, 300)
  await articleCommentStore.init(articleStore.articleField)
  if (route.hash.startsWith('#comment-')) {
    console.log('goto comment:', route.hash)
    const el = document.querySelector(route.hash)
    if (el) {
      el.scrollIntoView()
    }
  }
  watch(theme.global.name, (val) => {
    if (val === 'dark') {
      articleStore.markdownTheme = articleStore.markdownThemeDark
    } else {
      articleStore.markdownTheme = articleStore.markdownThemeLight
    }
  })
})

onUnmounted(() => {
  console.log('onUnmounted')
  articleStore.$reset()
  articleCommentStore.$reset()
})
// todo 返回滚动位置
onBeforeRouteUpdate(async (to, from, next) => {
  if (to.hash) {
    if (to.path !== from.path) {
      next()
    } else {
      return
    }
  } else {
    console.log(to)
    console.log(from)
    next()
  }
})

// const follow = async () => {
//   if (articleStore.articleField.isFollow) {
//     await articleStore.unFollow()
//   } else {
//     await articleStore.follow()
//   }
// }

const onIntersect = (entries) => gotoTitle.value = !!entries
const createToc = () => {
  // @ts-ignore
  tocbot.init({
    tocSelector: '.js-toc',
    contentSelector: '.js-toc-content',
    headingSelector: 'h1, h2, h3,h4',
    hasInnerContainers: false,
    includeTitleTags: false,
    // scrollSmoothOffset: 80,
    scrollSmooth: false,
    // scrollSmoothDuration: 500,
  })
}


</script>


<style lang="sass">
@import "../../assets/sass/mdTheme/cyanosis"
@import "../../assets/sass/mdTheme/v-green"
@import "../../assets/sass/mdTheme/arknights"
@import "../../assets/sass/mdTheme/smart-blue.css"
@import "../../assets/sass/mdTheme/juejin"
@import "../../assets/sass/mdTheme/devui-blue"
@import "../../assets/sass/mdTheme/geek-black"

.comment
  border-style: solid
  border-width: 1px
  border-color: rgba(136, 136, 136, 0.49)
</style>

<style lang="css">
.article-content p {
  font-size: 20px;
}

.toc::-webkit-scrollbar {
  width: 0 !important;
}


.toc {
  position: sticky;
  top: 10%;
  height: 700px;
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
  padding: 10px;
}

.v-container {
  max-width: 100%;
}

/*html {*/
/*  scroll-behavior: smooth!important;*/
/*}*/

/* 语法高亮 */
.hljs-container {
  position: relative;
  display: block;
  width: 600px;
  padding: 30px 5px 2px;
  overflow-x: hidden;
  line-height: 20px;
  text-align: left;
  background: #21252b;
  box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

code {
  font-size: 18px !important;
}

/** 3个点 */
/*.hljs-container::before {*/
/*  position: absolute;*/
/*  top: 10px;*/
/*  left: 15px;*/
/*  width: 12px;*/
/*  height: 12px;*/
/*  overflow: visible;*/
/*  font-weight: 700;*/
/*  font-size: 16px;*/
/*  line-height: 12px;*/
/*  white-space: nowrap;*/
/*  text-indent: 75px;*/
/*  background-color: #fc625d;*/
/*  border-radius: 16px;*/
/*  box-shadow: 20px 0 #fdbc40, 40px 0 #35cd4b;*/
/*  content: attr(codetype);*/
/*}*/

/** 滚动条 */
:deep(.hljs) {
  overflow-x: auto;
}

:deep(.hljs::-webkit-scrollbar) {
  width: 12px !important;
  height: 12px !important;
}

:deep(.hljs::-webkit-scrollbar-thumb) {
  height: 30px !important;
  background: #d1d8e6;
  background-clip: content-box;
  border: 2px solid transparent;
  border-radius: 19px;
  opacity: 0.8;
}

:deep(.hljs::-webkit-scrollbar-thumb:hover) {
  background: #a5b3cf;
  background-clip: content-box;
  border: 2px solid transparent;
}

:deep(.hljs::-webkit-scrollbar-track-piece) {
  width: 30px;
  height: 30px;
  background: #333;
}

::-webkit-scrollbar-button {
  display: none;
}
</style>
<style scoped>
@media (min-width: 2300px) {
  .d-comment {
    margin-right: -40px !important;
  }
}

</style>