<template>

  <div>
    <v-row class="article-content">
      <!--    <a href="#nuxt-3-minimal-starter" class="toc-link node-name&#45;&#45;H1  is-active-link">Nuxt 3 Minimal Starter</a>-->
      <NuxtLink tag="a" :to="{hash: '#nuxt-3-minimal-starter'}" active-class="active">Let's go!</NuxtLink>
      <v-col xl="10" lg="10" md="10" sm="12" xs="12" class="ml-0 ml-md-2 ml-lg-6">

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

          <div v-html="html" :class="markdownTheme" class=" js-toc-content"></div>

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
              <v-textarea fluid placeholder="评论点啥吧。" clearable v-model="replyCommentText"
                          clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                          rows="4" auto-grow="true">

              </v-textarea>
              <v-btn class="float-end mx-6 mb-4" color="primary" @click="ReplyComment()">发送</v-btn>
            </v-col>

            <v-divider class="mb-6 mt-n4"></v-divider>
          </v-row>


          <v-row>
            <v-col>
              <div class="text-start">
                <v-menu location="bottom" nudge-bottom>
                  <template v-slot:activator="{ props }">
                    <v-btn
                        color="info"
                        v-bind="props"
                        prepend-icon="mdi-menu"
                    >
                      <span>{{ CommentMenuList[selectCommentMenu] }}</span>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                        v-for="(item, index) in CommentMenuList"
                        :key="index"
                    >
                      <v-btn elevation="0" @click="clickSelectCommentMenu(index)">{{ item }}</v-btn>
                    </v-list-item>
                  </v-list>

                </v-menu>
              </div>
            </v-col>
          </v-row>

          <div v-if="loadingComment" class="text-h4 text-center">
          <span>
            加载中...
          </span>
          </div>

          <div v-else v-for="(comment,index) in CommentContentList" key="comment.id">
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
                           @click="ActionComment(commentType.up,comment.id,index)">
                      <v-icon :icon="getCommentActionIcon(commentType.up,index)"
                              :color="getCommentActionColor(commentType.up,index)"></v-icon>
                      <span v-if="comment.upNum>0">
                      {{ comment.upNum }}
                    </span>
                    </v-btn>
                    <v-btn class="mr-3" rounded plain elevation="0" outlined size="small"
                           @click="ActionComment(commentType.down,comment.id,index)">
                      <v-icon :icon="getCommentActionIcon(commentType.down,index)"
                              :color="getCommentActionColor(commentType.down,index)"></v-icon>
                      <span v-if="comment.downNum>0">
                      {{ comment.downNum }}
                    </span>
                    </v-btn>

                    <v-btn size="small" rounded plain elevation="0" outlined @click="showCommentBox(index)">
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
                                           @click="ActionComment(commentType.up,childComment.id,index,Cindex)">
                                      <v-icon :icon="getCommentActionIcon(commentType.up,index,Cindex)"
                                              :color="getCommentActionColor(commentType.up,index,Cindex)"></v-icon>
                                      <span v-if="childComment.upNum>0">
                                    {{ childComment.upNum }}
                                  </span>
                                    </v-btn>
                                    <v-btn class="mr-3" rounded plain elevation="0" outlined size="small"
                                           @click="ActionComment(commentType.down,childComment.id,index,Cindex)">
                                      <v-icon :icon="getCommentActionIcon(commentType.down,index,Cindex)"
                                              :color="getCommentActionColor(commentType.down,index,Cindex)"></v-icon>
                                      <span v-if="childComment.downNum>0">
                                    {{ childComment.downNum }}
                                  </span>
                                    </v-btn>

                                    <v-btn rounded plain elevation="0" outlined @click="showCommentBox(index,Cindex)"
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
              <v-divider class="my-2" v-if="index+1!==CommentContentList.length"></v-divider>

            </v-row>

          </div>


        </div>


      </v-col>

      <v-col class="toc">
        <div class="js-toc">
        </div>
      </v-col>
    </v-row>
  </div>

</template>


<script setup lang="ts">
//todo 夜间模式
import {dateFilter} from '~~/composables/useTools'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css'

import {
  ArticleCommentAction,
  commentType, ReplyArticleCommentBody,
  useAxiosGetArticleComment,
  useAxiosPostActionArticleComment, useAxiosPostReplyArticleComment, useFetchGetArticleContent, useFetchGetArticleField
} from '~/composables/Api/article'
import {onMounted, ref} from 'vue'
import ignore from 'ignore'
import {useRoute, watch} from '#imports'

const log = (log) => {
  console.log(log)
}

onMounted(async () => {
  let r = Math.ceil(x() * mdThemeName.length) - 1
  markdownTheme.value = 'markdown-body-' + mdThemeName[r]
  console.log('??')
  hljs.highlightAll()
  // setTimeout(() => {
  //   hljs.highlightAll()
  // }, 500)
  createToc()
  CommentMenuList.value = ['按热读 ↓', '按时间 ↑', '按时间 ↓']
  await loadComment()
})
const x = () => {
  console.log('---onMounted')
  return Math.random()
}
let route = useRoute()
let aid = route.params.aid
let field: ArticleField = null
const CommentContentList = ref<CommentContent[]>()
const message = ref('')
const showMessage = ref(false)
const mdThemeName = ['cyanosis', 'smart-blue', 'juejin', 'devui-blue', 'v-green', 'arknights']
let markdownTheme = ref('')
let {data: fieldData} = await useFetchGetArticleField(aid)
field = fieldData
let {data: html} = await useFetchGetArticleContent(aid, {type: 0})

const loadingComment = ref(true)
const showCommentMenu = ref(false)
const replyCommentText = ref('')
const CommentMenuList = ref([])
const selectCommentMenu = ref(1)

const createToc = () => {
  // toc()
  // const element = document.getElementsByClassName("article-content")
  // const tocbotJS = document.createElement('script')
// // 渲染目录的位置。
//       tocSelector: '.js-toc',
// // 在哪里抓取标题以建立目录。
//       contentSelector: '.js-toc-content',
// // 在contentSelector元素中抓取哪些标题。
//       headingSelector: 'h1, h2, h3',
// // 匹配ignoreSelector的标题将被跳过。
//       ignoreSelector: '.js-toc-ignore',
// // 对于内容中相对或绝对定位的容器内的标题
//       hasInnerContainers: false,
// // 添加到链接的主类。
//       linkClass: 'toc-link',
// // 添加到链接中的额外类。
//       extraLinkClasses: '',
// // 添加到活动链接的类。
// //对应于页面上最上面的标题的链接。
//       activeLinkClass: 'is-active-link',
// // 添加到列表中的主类。
//       listClass: 'toc-list',
// // 添加到列表中的额外类。
//       extraListClasses: '',
// // 当一个列表应该被折叠时被添加的类。
//       isCollapsedClass: 'is-collapsed',
// // 当一个列表应该能够被折叠时被添加的类。
// // 可以折叠但不一定要折叠时添加的类。
//       collapsibleClass: 'is-collapsible',
// // 添加到列表项的类。
//       listItemClass: 'toc-list-item',
// // 添加到活动列表项的类。
//       activeListItemClass: 'is-active-li',
// // 多少个标题级别不应该被折叠。
// // 例如，数字6将显示所有内容，因为
// //只有6个标题层，而数字0会将它们全部折叠起来。
// // 被隐藏的部分将在你滚动到标题时打开
// // 当你滚动到其中的标题时就会关闭。
//       collapseDepth: 0,
// // 启用平滑滚动。
//       scrollSmooth: true,
// // 平滑滚动持续时间。
//       scrollSmoothDuration: 420,
// // 平滑滚动的偏移量。
//       scrollSmoothOffset: 0,
// // 回调滚动结束。
//       scrollEndCallback: function (e) {},
// // 标题与文档顶部之间的偏移量（这是为了进行微小的调整）。
//   headingsOffset: 1,
// // 事件发生之间的超时，以确保它是
// // 不会太快（出于性能原因）。
//       throttleTimeout: 50,
// // 要添加 positionFixedClass 的元素。
//       positionFixedSelector: null,
// // 添加固定位置类，使侧边栏在滚动后固定。
// // 向下滚动超过fixedSidebarOffset。
//       positionFixedClass: 'is-position-fixed',
// // fixedSidebarOffset可以是任何数字，但默认情况下被设置为
// // 为自动，它将 fixedSidebarOffset 设置为侧边栏的位置。
// //元素从文档顶部的offsetTop开始。
//       fixedSidebarOffset: 'auto',
// // includeHtml可以被设置为true，以包括来自//标题节点的HTML标记。
// // heading node，而不是仅仅包括textContent。
//       includeHtml: false。
// // onclick函数适用于toc中的所有链接。
// // 事件作为第一个参数，这可以用来停止。
// // 传播，防止默认或执行动作。
//   onClick: function (e) {},
// // orderedList可以被设置为false，以生成无序列表（ul）。
// // 而不是有序列表(ol)
//   orderedList: true,
// // 如果有一个固定的文章滚动容器，设置为计算标题的偏移量
//       scrollContainer: null,
// // 如果已经被外部系统渲染了，则阻止ToC DOM的渲染
//       skipRendering: false,
// // 改变标题标签的可选回调。
// // 例如，它可以用来在你认为太长的多行标题上削减并加上省略号。
// // 每次解析标题时都会被调用。希望得到一个字符串的回报，即要显示的修改后的标签。
// // function (string) => string
//       headingLabelCallback: false,
// // 忽略隐藏在DOM中的标题
//       ignoreHiddenElements: false,
// // 可选的回调，用于修改解析后的标题的属性。
// // 标题元素在节点参数中传递，默认解析器解析的信息在obj参数中提供。
// // 函数必须返回相同或修改过的obj。
// // 如果没有返回任何信息，该标题将被排除在TOC之外。
// // function (object, HTMLElement) => object | void
//       headingObjectCallback: null。
// // 设置基本路径，如果你在`head'中使用`base'标签，会很有用。
//   basePath: '',
// // 只在`tocSelector`滚动时生效。
// //保持toc的滚动位置与内容同步。
//       disableTocScrollSync: false
//
//   通过www.DeepL.com/Translator（免费版）翻译
  // @ts-ignore
  let init = tocbot.init({
    // Where to render the table of contents.
    tocSelector: '.js-toc',
    // Where to grab the headings to build the table of contents.
    contentSelector: '.js-toc-content',
    // Which headings to grab inside of the contentSelector element.
    headingSelector: 'h1, h2, h3,h4,h5,h6',
    // For headings inside relative or absolute positioned containers within content.
    hasInnerContainers: false,
    // includeHtml: true,
    includeTitleTags: false,
    scrollSmoothOffset: -100,
    scrollSmooth: true,
    scrollSmoothDuration: 500,
  })
}


const loadComment = async (properties?: string, order?, page?: number) => {
  loadingComment.value = true
  let params = {
    properties: properties,
    order: order,
    page: page
  }
  let {data: commentData} = await useAxiosGetArticleComment(aid, params)
  CommentContentList.value = commentData.data.content
  for (let commentContent of CommentContentList.value) {
    commentContent.replyCommentText = ref('')
    commentContent.childComments.forEach(childComment => {
      childComment.replyCommentText = ref('')
    })
  }
  loadingComment.value = false
}

const clickSelectCommentMenu = (index: number) => {
  selectCommentMenu.value = index
  switch (index) {
    case 0:
      loadComment('upNum', 'desc')
      break
    case 1:
      loadComment('createTime', 'asc')
      break
    case 2:
      loadComment('createTime', 'desc')
      break
  }
}

const ReplyComment = async (parentUserId?: number, parentCommentId?: number, pIndexId?: number, cIndexId?: number) => {
  let text = null
  if (pIndexId !== undefined) {
    if (cIndexId !== undefined) {
      text = CommentContentList.value[pIndexId].childComments[cIndexId].replyCommentText
    } else {
      text = CommentContentList.value[pIndexId].replyCommentText
    }
  } else {
    text = replyCommentText.value
  }
  if (parentUserId === undefined) {
    parentUserId = field.user.id
  }
  if (text === '' || text === undefined) {
    alert('评论内容不能为空')
    // message.value = '评论内容不能为空'
    // showMessage.value = true
    return
  }
  if (parentCommentId === undefined) {
    parentCommentId = 0
  }
  let body: ReplyArticleCommentBody = {
    'articleFieldId': field.id,
    'parentCommentId': parentCommentId,
    'parentUserId': parentUserId,
    'text': text
  }
  let {data: ReplyCommentRetData} = await useAxiosPostReplyArticleComment(body)
  if (ReplyCommentRetData.code === 0) {
    alert('评论成功')
    if (pIndexId !== undefined) {
      if (cIndexId !== undefined) {
        CommentContentList.value[pIndexId].childComments[cIndexId].replyCommentText = ''
      } else {
        CommentContentList.value[pIndexId].replyCommentText = ''
      }
    } else {
      replyCommentText.value = ''
    }
    let {data: commentData} = await useAxiosGetArticleComment(aid)
    CommentContentList.value = commentData.data.content
    //前端填充2或重新加载后端数据
    // let newComment: CommentContent = {
    //   id: 1,
    //   deleted: false,
    //   createTime: 1661527565280,
    //   lastModifiedTime: 1661527565280,
    //   user: {
    //     id: 3,
    //     nickname: 'Dwsy',
    //     userInfo: {
    //       id: 3,
    //       avatar: 'https://gravatar.loli.net/avatar//a0b7b30cbef507e1fad31e75c6a134ee?s=65&r=X&d=',
    //       sign: 'sign',
    //       gender: 'FMAIL',
    //       birth: null
    //     },
    //     level: 5
    //   },
    //   userAction: 0,
    //   text:text,
    //   upNum: 2,
    //   downNum: 6,
    //   parentUserId: 0,
    //   parentCommentId: 0,
    //   parentUser: null,
    //   childComments: [],
    //   ua: 'user-agent',
    //   showCommentBox: false,
    //   replyCommentText: ref('')
    // }
    // CommentContentList.value.unshift(newComment)

  }
}

const getCommentActionIcon = (action: commentType, pIndexId: number, cIndexId?: number) => {
  if (cIndexId === undefined) {
    if (CommentContentList.value[pIndexId].userAction === action) {
      if (action === commentType.up) {
        return 'mdi-thumb-up'
      } else {
        return 'mdi-thumb-down'
      }
    } else {
      if (action === commentType.up) {
        return 'mdi-thumb-up-outline'
      } else {
        return 'mdi-thumb-down-outline'
      }
    }
  } else {
    if (CommentContentList.value[pIndexId].childComments[cIndexId].userAction === action) {
      if (action === commentType.up) {
        return 'mdi-thumb-up'
      } else {
        return 'mdi-thumb-down'
      }
    } else {
      if (action === commentType.up) {
        return 'mdi-thumb-up-outline'
      } else {
        return 'mdi-thumb-down-outline'
      }
    }
  }

}

const getCommentActionColor = (action: commentType, pIndexId: number, cIndexId?: number) => {
  if (cIndexId === undefined) {
    if (CommentContentList.value[pIndexId].userAction === action) {
      return 'pink lighten-2'
    } else {
      return ''
    }
  } else {
    if (CommentContentList.value[pIndexId].childComments[cIndexId].userAction === action) {
      return 'pink lighten-2'
    } else {
      return ''
    }
  }
}

const ActionComment = async (CommentType: commentType, cid: number, pIndexId: number, cIndexId?: number) => {
  let body: ArticleCommentAction = {
    actionCommentId: cid,
    articleFieldId: field.id,
    commentType: CommentType,
  }
  console.log(body)

  let {data: actionData} = await useAxiosPostActionArticleComment(body)
  if (actionData.code !== 0) {
    alert(actionData.msg)
    return
  }
  let retType: commentType = actionData.data
  // switch (commentType) {
  //   case commentType.comment:
  //     break
  //   case commentType.comment_comment:
  //     break
  //   case commentType.up:
  //     break
  //   case commentType.down:
  //     break
  //   case commentType.cancel:
  //     break
  //   case commentType.upToDown:
  //     break
  //   case commentType.downToUp:
  //     break
  // }
  //todo 枚举判断替换成 switch 是不是好一点
  let pComment = CommentContentList.value[pIndexId]
  if (cIndexId === undefined) {
    if (retType === commentType.upToDown) {
      pComment.upNum--
      pComment.downNum++
      pComment.userAction = commentType.down
      pComment.upNum = Math.max(pComment.upNum, 0)
      pComment.downNum = Math.max(pComment.downNum, 0)
      return
    }
    if (retType === commentType.downToUp) {
      pComment.upNum++
      pComment.downNum--
      pComment.userAction = commentType.up
      pComment.upNum = Math.max(pComment.upNum, 0)
      pComment.downNum = Math.max(pComment.downNum, 0)
      return
    }

    if (CommentType === commentType.up) {
      if (retType === commentType.up) {
        pComment.upNum++
        pComment.userAction = commentType.up
      }
      if (retType === commentType.cancel) {
        pComment.upNum--
        pComment.userAction = commentType.cancel
      }
      pComment.upNum = Math.max(pComment.upNum, 0)
      pComment.downNum = Math.max(pComment.downNum, 0)
      return
    }

    if (CommentType === commentType.down) {
      if (retType === commentType.down) {
        pComment.downNum++
        pComment.userAction = commentType.down
      }
      if (retType === commentType.cancel) {
        pComment.downNum--
        pComment.userAction = commentType.cancel
      }
      pComment.upNum = Math.max(pComment.upNum, 0)
      pComment.downNum = Math.max(pComment.downNum, 0)
      return
    }

  } else {
    let cComment = pComment.childComments[cIndexId]
    if (retType === commentType.upToDown) {
      cComment.upNum--
      cComment.downNum++
      cComment.userAction = commentType.down
      cComment.upNum = Math.max(cComment.upNum, 0)
      cComment.downNum = Math.max(cComment.downNum, 0)
      return
    }
    if (retType === commentType.downToUp) {
      cComment.upNum++
      cComment.downNum--
      cComment.userAction = commentType.up
      cComment.upNum = Math.max(cComment.upNum, 0)
      cComment.downNum = Math.max(cComment.downNum, 0)
      return
    }

    if (CommentType === commentType.up) {
      if (retType === commentType.up) {
        cComment.upNum++
        cComment.userAction = commentType.up
      }
      if (retType === commentType.cancel) {
        cComment.upNum--
        cComment.userAction = commentType.cancel
      }
      cComment.upNum = Math.max(cComment.upNum, 0)
      cComment.downNum = Math.max(cComment.downNum, 0)
      return
    }
    if (CommentType === commentType.down) {
      if (retType === commentType.down) {
        cComment.downNum++
        cComment.userAction = commentType.down
      }
      if (retType === commentType.cancel) {
        cComment.downNum--
        cComment.userAction = commentType.cancel
      }
      cComment.upNum = Math.max(cComment.upNum, 0)
      cComment.downNum = Math.max(cComment.downNum, 0)
      return
    }
  }


}

const showCommentBox = (pIndexId: number, cIndexId?: number) => {
  if (cIndexId == undefined) {
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
  } else {
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
import {commentType} from '~/composables/Api/article'
import {Ref} from 'vue'

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
  ua: string;
  showCommentBox: boolean;
  userAction: commentType;
  replyCommentText: any
  // fixme ref 2层不需要value然后极会报错 ？ 先用any了
}


</script>

<style lang="sass">
//@import "tocbot/dist/tocbot.css"
//@import "tocbot/src/scss/styles"
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
<style scoped>
.toc::-webkit-scrollbar {
  width: 0 !important;
}

.toc {
  position: sticky;
  /*left: 88%;*/
  top: 10%;
  height: 50%;
  /*z-index: 1;*/
  border-radius: 6px;
  /*padding: 10px;*/
  /*color: #fff;*/
  font-size: 16px;
  overflow: hidden;
  overflow-y: auto
  /*backdrop-filter: blur(10px);*/

  /*background-color: rgba(12, 52, 90, 0.555);*/
}
</style>