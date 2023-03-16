<template>
  <div class="v-container abc" v-if="ArticleField.data">
    <Head>
      <Title>{{ title }}</Title>
      <Meta :content="title" name="description" />
      <Style id="highlightStyle" :children="articleStore.HighlightStyleStr" type="text/css" />
      <Style id="markdownTheme" :children="articleStore.MarkdownThemeStr" type="text/css" />
    </Head>
    <v-row class="article-content">
      <v-col class="ml-md-2 ml-lg-6 ml-0" lg="10" md="10" sm="10" xl="10" xs="12">
        <div class="mt-n8">
          <div>
            <v-row class="mb-1">
              <v-col>
                <span id="T-title" class="text-h3">
                  {{ articleStore.articleField.title }}
                </span>
              </v-col>
            </v-row>
            <v-divider class="my-1"></v-divider>
            <v-row>
              <v-col cols="1" class="mr-lg-1 mr-xl-n2 mr-md-10 mr-sm-8 mr-16">
                <nuxt-link :to="`/user/${articleStore.articleField.user.id}`">
                  <v-avatar size="60">
                    <v-img :src="articleStore.articleField.user.userInfo.avatar"></v-img>
                  </v-avatar>
                </nuxt-link>
              </v-col>
              <v-col cols="5" class="ml-n1 mt-1">
                <v-row>
                  <v-col class="ml-n8">
                    <span>{{ articleStore.articleField.user.nickname }}</span>
                    <span class="pl-3">Level:{{ articleStore.articleField.user.level }}</span>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="ml-n8 mt-n3 d-none d-sm-flex" style="color: #8a919f">
                    <!--                    <span>  {{ dateFilter(articleStore.articleField.createTime, 'YYYY-MM-DD hh:mm') }} · </span>-->
                    <span>
                      {{ timeAgoFilter(articleStore.articleField.createTime) }}
                      ·
                    </span>
                    <span>阅读量：{{ articleStore.articleField.viewNum }}</span>
                  </v-col>
                </v-row>
              </v-col>
              <v-col v-if="user?.user?.id !== articleStore.articleField.user.id" class="mt-2">
                <v-btn v-if="articleStore.follow" class="float-end mx-4" color="pink lighten-3">
                  <span style="color: white" @click="unsubscribe()">已关注</span>
                </v-btn>
                <v-btn v-else class="float-end mx-4" color="blue lighten-3" @click="subscribe()">
                  <span style="color: white">关注</span>
                </v-btn>
              </v-col>
              <v-col class="mt-2" v-else>
                <a
                  :href="`/article/editor/draft?id=${articleStore.articleField.id}`"
                  target="_blank"
                >
                  <v-btn class="float-end mx-4" color="blue lighten-3">
                    <span style="color: white">编辑</span>
                  </v-btn>
                </a>
              </v-col>
            </v-row>

            <v-row class="d-flex d-sm-none mx-4">
              <v-col>
                <v-col class="ml-n8 mt-n3" style="color: #8a919f">
                  <span>
                    {{ dateFilter(articleStore.articleField.createTime, 'YYYY-MM-DD hh:mm') }}
                    ·
                  </span>
                  <span>阅读量：{{ articleStore.articleField.viewNum }}</span>
                </v-col>
              </v-col>
            </v-row>
          </div>
          <v-divider class="my-1"></v-divider>
          <v-img
            v-if="articleStore.articleField.banner"
            :aspect-ratio="8 / 3"
            :cover="true"
            :src="articleStore.articleField.banner"
            class="d-article-banner"
            width="100%"
          >
          </v-img>
          <v-divider class="mb-2" v-if="articleStore.articleField.banner"></v-divider>
          <!--          :class="articleStore.markdownTheme"-->
          <div
            v-show="!articleStore.loading"
            v-hljs="{ addCopy: true }"
            class="js-toc-content markdown-body"
            v-html="articleStore.contentHtml"
          ></div>
          <!--          v-intersect="()=>{gotoTitle=true}"-->
          <div
            v-show="articleStore.loading"
            class="text-h4 mt-16 text-center"
            style="margin-bottom: 100%"
          >
            <span> 加载中... </span>
          </div>
        </div>
        <v-divider class="mt-8 mb-6"></v-divider>

        <v-row>
          <v-col id="comments">
            <v-chip class="mr-6" color="primary" :label="true">
              <v-icon left>mdi-format-list-group</v-icon>
              分组：{{ articleStore.articleField.articleGroup.name }}
            </v-chip>
            <div class="d-md-none my-3"></div>
            <v-chip class="mr-2" color="pink lighten-1" :label="true">
              <v-icon left>mdi-tag</v-icon>
              <span>标签</span>
            </v-chip>
            <v-chip v-for="tag in articleStore.articleField.articleTags" :key="tag.id" class="mr-1">
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
              <v-textarea
                v-model="articleCommentStore.replyCommentText"
                clear-icon="mdi-close-circle"
                clearable
                fluid
                placeholder="评论点啥吧。"
                prepend-inner-icon="mdi-comment"
                rows="4"
              >
                <!--                auto-grow-->
              </v-textarea>
              <v-btn class="float-end mx-6 mb-4" color="primary" @click="ReplyComment()"
                >发送
              </v-btn>
            </v-col>
            <v-divider class="mt-n4 mb-6"></v-divider>
          </v-row>

          <!--// todo 这功能啥正常到但是会runtime-dom.esm-bundler.js:13 等vuetify更新在改 -->
          <!--          Uncaught (in promise) TypeError: Cannot read properties of null (reading 'parentNode')-->
          <!--        https://github.com/nuxt/framework/issues/2985#issuecomment-1272257723-->
          <client-only>
            <v-row>
              <v-col>
                <div>
                  <v-menu location="bottom" nudge-bottom>
                    <template v-slot:activator="{ props }">
                      <v-btn
                        class="d-article-comment-oder-btn"
                        color="info"
                        prepend-icon="mdi-menu"
                        v-bind="props"
                      >
                        <span>{{
                          articleCommentStore.CommentMenuList[articleCommentStore.selectCommentMenu]
                        }}</span>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item
                        v-for="(item, index) in articleCommentStore.CommentMenuList"
                        :key="index"
                      >
                        <v-btn
                          elevation="0"
                          @click="articleCommentStore.clickSelectCommentMenu(index)"
                        >
                          {{ item }}
                        </v-btn>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </div>
              </v-col>
            </v-row>
          </client-only>

          <div v-if="articleCommentStore.loadingComment" class="text-h3 my-16 text-center">
            <span> 加载中... </span>
          </div>
          <div v-if="articleCommentStore.commentList.length === 0">
            <div class="my-8 text-center">
              <span class="text-h6"> 暂无评论 </span>
            </div>
          </div>

          <div v-for="(comment, index) in articleCommentStore.commentList" v-else key="comment.id">
            <v-row class="mt-lg-3 mt-2">
              <v-col class="mr-xl-n5 mr-lg-n2 d-comment mr-8" cols="1" lg="1" sm="1" xl="0">
                <v-avatar size="x-large">
                  <v-img :src="comment.user.userInfo.avatar"></v-img>
                </v-avatar>
              </v-col>

              <v-col :id="`comment-${comment.id}`" class="ml-xl-n8">
                #{{ comment.commentSerialNumber }}
                <span>{{ comment.user.nickname }}</span>
                <span class="mr-4 pl-3">Level:{{ comment.user.level }}</span>
                <br class="d-md-none" />
                <span class="mr-4"> {{ dateFilter(comment.createTime, 'YYYY-MM-DD hh:mm') }}</span>
                <div class="float-right">
                  <v-menu>
                    <template v-slot:activator="{ props }">
                      <v-icon v-bind="props">mdi-drag-horizontal</v-icon>
                    </template>
                    <v-card>
                      <v-list-item>
                        <v-list v-if="showDelBtn(comment.user.id)" class="cursor-pointer">
                          <v-icon @click="articleCommentStore.deleteComment(aid, comment.id)"
                            >mdi-delete-outline
                          </v-icon>
                          删除
                        </v-list>
                        <v-divider></v-divider>
                        <v-list class="cursor-pointer">
                          <v-icon> mdi-shield-half-full </v-icon>
                          举报
                        </v-list>
                      </v-list-item>
                    </v-card>
                  </v-menu>
                </div>
                <v-divider></v-divider>
                <v-row class="mt-n2">
                  <v-col>
                    <span>{{ comment.text }}</span>
                  </v-col>
                </v-row>
                <v-row class="mt-n6">
                  <v-col>
                    <v-btn
                      class="mr-3"
                      elevation="0"
                      outlined
                      plain
                      rounded
                      size="small"
                      @click="articleCommentStore.ActionComment(CommentType.up, comment.id, index)"
                    >
                      <v-icon
                        :color="articleCommentStore.getCommentActionColor(CommentType.up, index)"
                        :icon="articleCommentStore.getCommentActionIcon(CommentType.up, index)"
                      ></v-icon>
                      <span v-if="comment.upNum > 0">
                        {{ comment.upNum }}
                      </span>
                    </v-btn>
                    <v-btn
                      class="mr-3"
                      elevation="0"
                      outlined
                      plain
                      rounded
                      size="small"
                      @click="
                        articleCommentStore.ActionComment(CommentType.down, comment.id, index)
                      "
                    >
                      <v-icon
                        :color="articleCommentStore.getCommentActionColor(CommentType.down, index)"
                        :icon="articleCommentStore.getCommentActionIcon(CommentType.down, index)"
                      ></v-icon>
                      <span v-if="comment.downNum > 0">
                        {{ comment.downNum }}
                      </span>
                    </v-btn>

                    <v-btn
                      elevation="0"
                      outlined
                      plain
                      rounded
                      size="small"
                      @click="articleCommentStore.showCommentBox(index)"
                    >
                      <v-icon size="large">mdi-reply-outline</v-icon>
                      <span v-if="comment.childComments.length > 0">
                        <!--                      {{ comment.childComments.length }}-->
                      </span>
                    </v-btn>
                    <v-col
                      v-if="comment.showCommentBox"
                      class="ml-n8 px-lg-8 px-md-8 px-sm-2 transition-swing px-0"
                    >
                      <div v-if="user.token">
                        <v-textarea
                          v-model="comment.replyCommentText"
                          :auto-grow="true"
                          clear-icon="mdi-close-circle"
                          clearable
                          fluid
                          placeholder="回复点啥吧。"
                          prepend-inner-icon="mdi-comment"
                          rows="4"
                        >
                        </v-textarea>

                        <v-btn
                          class="float-end mx-6 mb-4"
                          color="primary"
                          @click="ReplyComment(comment.user.id, comment.id, index)"
                          >发送
                        </v-btn>
                      </div>
                      <div v-else class="text-center">
                        <nuxt-link to="/user/login">
                          <v-btn> 登陆</v-btn>
                        </nuxt-link>
                      </div>
                    </v-col>

                    <v-row>
                      <v-col cols="12">
                        <div
                          v-for="(childComment, Cindex) in childCommentLimit(comment)"
                          :key="childComment.id"
                        >
                          <v-row class="mt-1">
                            <v-col
                              class="mr-sm-4 mr-xl-n5 mr-lg-n12 d-comment mr-4"
                              cols="2"
                              lg="1"
                              md="1"
                              sm="1"
                              xl="1"
                            >
                              <v-avatar>
                                <v-img :src="childComment.user.userInfo.avatar"></v-img>
                              </v-avatar>
                            </v-col>

                            <v-col
                              :id="`comment-${childComment.id}`"
                              class="ml-xl-n10"
                              style="font-size: 80%"
                            >
                              #{{ childComment.commentSerialNumber }}
                              <!--                              #{{ Cindex + (comment.childCommentPage - 1) * 8 + 1 }}-->
                              <span>{{ childComment.user.nickname }}</span>
                              <span class="mr-4 pl-3">Level:{{ childComment.user.level }}</span>
                              <br class="d-sm-none" />
                              <span class="mr-4">{{
                                dateFilter(childComment.createTime, 'YYYY-MM-DD hh:mm')
                              }}</span>
                              <div class="float-right">
                                <v-menu location="bottom" nudge-bottom>
                                  <template v-slot:activator="{ props }">
                                    <v-icon v-bind="props">mdi-drag-horizontal</v-icon>
                                  </template>
                                  <v-list-item>
                                    <v-list
                                      v-if="showDelBtn(comment.user.id)"
                                      class="cursor-pointer"
                                    >
                                      <v-icon
                                        @click="articleCommentStore.deleteComment(aid, comment.id)"
                                        >mdi-delete-outline
                                      </v-icon>
                                      删除
                                    </v-list>
                                    <v-divider></v-divider>
                                    <v-list class="cursor-pointer">
                                      <v-icon> mdi-shield-half-full </v-icon>举报
                                    </v-list>
                                  </v-list-item>
                                </v-menu>
                              </div>
                              <v-divider></v-divider>
                              <div>
                                <v-row class="mt-n3">
                                  <v-col>
                                    <div v-if="childComment.replyUserCommentId === '0'">
                                      {{ childComment.text }}
                                    </div>

                                    <div
                                      v-else
                                      v-html="
                                        atSrtGotoHome(childComment.text, childComment.parentUserId)
                                      "
                                    ></div>
                                  </v-col>
                                </v-row>
                                <v-row>
                                  <v-col class="mt-n2">
                                    <v-btn
                                      class="mr-3"
                                      elevation="0"
                                      outlined
                                      plain
                                      rounded
                                      size="x-small"
                                      @click="
                                        articleCommentStore.ActionComment(
                                          CommentType.up,
                                          childComment.id,
                                          index,
                                          Cindex
                                        )
                                      "
                                    >
                                      <v-icon
                                        :color="
                                          articleCommentStore.getCommentActionColor(
                                            CommentType.up,
                                            index,
                                            Cindex
                                          )
                                        "
                                        :icon="
                                          articleCommentStore.getCommentActionIcon(
                                            CommentType.up,
                                            index,
                                            Cindex
                                          )
                                        "
                                      ></v-icon>
                                      <span v-if="childComment.upNum > 0">
                                        {{ childComment.upNum }}
                                      </span>
                                    </v-btn>
                                    <v-btn
                                      class="mr-3"
                                      elevation="0"
                                      outlined
                                      plain
                                      rounded
                                      size="x-small"
                                      @click="
                                        articleCommentStore.ActionComment(
                                          CommentType.down,
                                          childComment.id,
                                          index,
                                          Cindex
                                        )
                                      "
                                    >
                                      <v-icon
                                        :color="
                                          articleCommentStore.getCommentActionColor(
                                            CommentType.down,
                                            index,
                                            Cindex
                                          )
                                        "
                                        :icon="
                                          articleCommentStore.getCommentActionIcon(
                                            CommentType.down,
                                            index,
                                            Cindex
                                          )
                                        "
                                      ></v-icon>
                                      <span v-if="childComment.downNum > 0">
                                        {{ childComment.downNum }}
                                      </span>
                                    </v-btn>

                                    <v-btn
                                      elevation="0"
                                      outlined
                                      plain
                                      rounded
                                      size="x-small"
                                      @click="articleCommentStore.showCommentBox(index, Cindex)"
                                    >
                                      <v-icon size="large">mdi-reply-outline</v-icon>
                                    </v-btn>
                                    <v-col
                                      v-if="childComment.showCommentBox"
                                      class="ml-n8 px-lg-8 px-md-8 px-sm-2 transition-swing px-0"
                                    >
                                      <div v-if="user.token">
                                        <v-textarea
                                          v-model="childComment.replyCommentText"
                                          :auto-grow="true"
                                          clear-icon="mdi-close-circle"
                                          clearable
                                          fluid
                                          placeholder="回复点啥吧。"
                                          prepend-inner-icon="mdi-comment"
                                          rows="4"
                                        >
                                        </v-textarea>
                                        <v-btn
                                          class="float-end mx-6 mb-4"
                                          color="primary"
                                          @click="
                                            ReplyComment(
                                              childComment.user.id,
                                              comment.id,
                                              index,
                                              Cindex,
                                              childComment.id,
                                              childComment.user.nickname
                                            )
                                          "
                                        >
                                          发送
                                        </v-btn>
                                      </div>
                                      <div v-else class="text-center">
                                        <nuxt-link to="/user/login">
                                          <v-btn> 登陆</v-btn>
                                        </nuxt-link>
                                      </div>
                                    </v-col>
                                    <v-row></v-row>
                                  </v-col>
                                </v-row>
                              </div>
                            </v-col>
                            <!--                          <v-divider class="my-4" v-if="Cindex+1!==comment.childComments.length||index+1===CommentContentList.length"></v-divider>-->
                            <v-divider class="my-4"></v-divider>
                          </v-row>

                          <v-row>
                            <div
                              v-if="
                                Cindex === 2 && !comment.loadMore && comment.childCommentNum > 3
                              "
                              class="pa-4 ml-4"
                            >
                              <v-btn
                                @click="
                                  () => {
                                    comment.loadMore = true
                                  }
                                "
                              >
                                查看更多 共{{ comment.childCommentNum }} 条回复
                              </v-btn>
                            </div>
                          </v-row>
                        </div>
                        <div v-if="comment.loadMore" class="text-start" style="width: 30%">
                          <!--                                            @input="(page)=> {-->
                          <!--                                             await articleCommentStore.loadChildComment(comment.id,page)-->
                          <!--                                            }"-->
                          <!--                                  <v-container class="max-width">-->
                          <v-pagination
                            v-model="comment.childCommentPage"
                            :length="comment.childCommentTotalPages"
                            class="my-4"
                            rounded="circle"
                            @update:modelValue="
                              (page) => {
                                articleCommentStore.loadChildComment(comment, page)
                              }
                            "
                          ></v-pagination>
                          <!--                                  </v-container>-->
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-divider
                v-if="index + 1 !== articleCommentStore.commentList.length"
                class="my-2"
              ></v-divider>
            </v-row>
          </div>
          <!--          //评论分页-->
          <v-row>
            <v-col cols="10">
              <v-container class="max-width">
                <v-pagination
                  v-model="articleCommentStore.page"
                  :length="articleCommentStore.totalPages"
                  class="my-4"
                ></v-pagination>
              </v-container>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <!--      目录-->
      <v-col class="toc">
        <div class="js-toc"></div>
      </v-col>
    </v-row>
    <!--    https://vuetifyjs.com/zh-Hans/components/floating-action-buttons/#section-5c0f578b630994ae-->
    <!--        <v-speed-dial></v-speed-dial> todo 移动端要这个效果但是vuetify3还没这个组件-->
    <!-- todo 数字显 太长到话转换为文本w万啥到 如果这么大到数据到话。。-->
    <!--    侧边按钮-->
    <client-only>
      <div class="side-toolbar1">
        <a href="#comments" v-if="!gotoTitle">
          <v-btn class="mr-3" elevation="0" outlined rounded size="small" @click="gotoTitle = true">
            <v-icon>mdi-message-reply-text-outline</v-icon>
            <v-tooltip activator="parent" location="top">评论区</v-tooltip>
          </v-btn>
        </a>
        <a href="#T-title" v-else>
          <v-btn
            class="mr-3"
            elevation="0"
            outlined
            rounded
            size="small"
            @click="gotoTitle = false"
          >
            <v-icon>mdi-arrow-up-circle-outline</v-icon>
            <v-tooltip activator="parent" location="top">回到顶部</v-tooltip>
          </v-btn>
        </a>
        <v-btn
          class="mr-3"
          elevation="0"
          outlined
          plain
          rounded
          size="small"
          @click="articleStore.ActionArticle(CommentType.up)"
        >
          <v-icon :icon="articleStore.getArticleActionIcon(CommentType.up)"></v-icon>
          <span v-if="articleStore.articleField.upNum > 0">
            {{ articleStore.articleField.upNum }}
          </span>
        </v-btn>
        <v-btn
          class="mr-3"
          elevation="0"
          outlined
          plain
          rounded
          size="small"
          @click="articleStore.ActionArticle(CommentType.down)"
        >
          <v-icon :icon="articleStore.getArticleActionIcon(CommentType.down)"></v-icon>
          <span v-if="articleStore.articleField.downNum > 0">
            {{ articleStore.articleField.downNum }}
          </span>
        </v-btn>

        <v-dialog v-model="collectionDialog" persistent transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-3"
              elevation="0"
              outlined
              plain
              rounded
              size="small"
              v-bind="props"
              @click="collectionArticles()"
            >
              <v-icon v-if="!articleStore.collect" icon="mdi-cards-heart-outline"></v-icon>
              <v-icon v-else icon="mdi-cards-heart"></v-icon>
              <span v-if="articleStore.articleField.collectNum > 0">
                {{ articleStore.articleField.collectNum }}
              </span>
              <v-tooltip activator="parent" location="top">收藏</v-tooltip>
            </v-btn>
          </template>
          <div style="margin: auto">
            <v-card class="text-center" style="width: 600px">
              <v-card-title>
                <span class="text-h6 ml-8">添加到收藏夹</span>
              </v-card-title>
              <div v-for="group in collectionGroupList" :key="group.id" class="d-flex my-n6 px-4">
                {{ group.select }}
                /* :model-value="group.select" */
                <v-checkbox
                  v-model="group.select"
                  :label="group.groupName"
                  class="pr-2"
                  @change="addCollectionToGroup(group.id, group.select)"
                ></v-checkbox>
                <span class="pt-4"> {{ group.collectionNum }} / 999 </span>
              </div>
              <v-divider class="my-3"></v-divider>
              <v-row class="pa-4 ml-2">
                <!--                  <v-form ref="form">-->
                <!--                    v-model="collectionName"-->
                <!--                    :rules="collectionNameRules"-->
                <v-text-field
                  v-model="newCollectionGroupName"
                  append-inner-icon="mdi-check-bold"
                  label="新建分组"
                  required
                  @click:append-inner="newCollectionGroup()"
                ></v-text-field>
              </v-row>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red-darken-1" text @click="collectionDialog = false"> 关闭</v-btn>
                <!--                <v-btn-->
                <!--                    color="blue-darken-1"-->
                <!--                    text-->
                <!--                    @click="collectionDialog = false"-->
                <!--                >-->
                <!--                  收藏-->
                <!--                </v-btn>-->
              </v-card-actions>
            </v-card>
          </div>
        </v-dialog>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import {
  CommentType,
  useAxiosCancelCollectionToGroup,
  useAxiosGetArticleCollectionState,
  useAxiosGetCollectionGroupList,
  useAxiosPostAddCollectionToGroup,
  useAxiosPostCreateCollectionGroup,
  useFetchGetArticleContent,
  useFetchGetArticleField,
} from '~/composables/Api/article'
import { onMounted, onUnmounted, ref, toRef, watch } from 'vue'
import { definePageMeta, useCookie, useRoute } from '#imports'
import { warningMsg, errorMsg, successMsg } from '~/composables/utils/toastification'
import { onBeforeRouteUpdate } from 'vue-router'
import { useArticleStore } from '~/stores/article/articleStore'
import { CommentContent, useArticleCommentStore } from '~/stores/article/articleCommentStore'
import { useUserStore } from '~/stores/user'
import { useTheme } from 'vuetify'
import { useHead } from '#head'
import { atSrtGotoHome, dateFilter, handleCopy, timeAgoFilter } from '~/composables/useTools'
import { followUser, unFollowUser } from '~/composables/Api/user/following'
import { collectionData, collectionGroupData, collectionType } from '~/types/article'
import { useLayout } from '~/stores/layout'
import { navigateTo, useRouter } from '#app'
import mediumZoom from 'medium-zoom'
import { changeHighlightStyle } from '~/constant/highlightStyleList'
import { changeThemes, themes } from '~/constant/markdownThemeList'
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline/esm/index.js'

definePageMeta({
  keepalive: false,
})
useLayout().showFooter = true
const theme = useTheme()
//todo 移动端适配
let route = useRoute()
let aid = String(route.params.aid)
const cookieThemeState = useCookie('theme')

const user = useUserStore()
const router = useRouter()
const articleStore = useArticleStore()
const articleCommentStore = useArticleCommentStore()
let ArticleField = await useFetchGetArticleField(aid)
if (ArticleField.code !== 0) {
  // throw createError({
  //   statusCode: 404,
  //   statusMessage: '文章不存在',
  // })
  navigateTo('i404')
}
articleStore.articleField = ArticleField.data
if (ArticleField.data == undefined) {
  router.push('/article')
}
// clog('title', ArticleField.data.title)
const title = ref<string>(ArticleField.data.title)
let ArticleContent = await useFetchGetArticleContent(aid)
articleStore.contentHtml = ArticleContent.data

const ReplyComment = articleCommentStore.ReplyComment

const gotoTitle = ref(false)

const message = ref('')
// const showMessage = ref(false)
const getMarkdownThemeName = () => {
  if (cookieThemeState.value === 'dark') {
    return ArticleField.data?.markDownThemeDark
  } else {
    return ArticleField.data?.markDownTheme
  }
}
const getHighlightStyleName = () => {
  if (cookieThemeState.value === 'dark') {
    return ArticleField.data?.codeHighlightStyleDark
  } else {
    return ArticleField.data?.codeHighlightStyle
  }
}

if (typeof window == 'undefined') {
  articleStore.HighlightStyleStr = await changeHighlightStyle(getHighlightStyleName(), true)
  articleStore.MarkdownThemeStr = await changeThemes(themes[getMarkdownThemeName()], true)
}//服务端添加主题样式文件
onBeforeMount(async () => {
  let highlightStyle = document.querySelector('#highlightStyle')
  let markdownTheme = document.querySelector('#markdownTheme')
  if (highlightStyle == null || markdownTheme == null) {
    await changeHighlightStyle(getHighlightStyleName())
    await changeThemes(themes[getMarkdownThemeName()])
  }
})//客户端渲染添加样式文件
onMounted(async () => {
  //
  if (user.token === '') {
    articleCommentStore.replyCommentText = '请先登陆'
  }
  await articleStore.init()
  // https://highlightjs.readthedocs.io/en/latest/line-numbers.html?highlight=line
  setTimeout(() => {
    createToc()
    if (route.hash) {
      const el: HTMLElement = document.querySelector(route.hash)
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
        })
      }
    } else {
      document.documentElement.scrollTop = 0
    }
  }, 200)
  await articleCommentStore.init(articleStore.articleField)
  if (route.hash.startsWith('#comment-')) {
    clog('goto comment:', route.hash)
    const el = document.querySelector(route.hash)
    if (el) {
      el.scrollIntoView({
        // behavior:"smooth"
      })
    }
  }
  await loadArticleCollectionState()

  watch(theme.global.name, async (val) => {
    if (val === 'dark') {
      await articleStore.changeThemeDark()
      await articleStore.changeHighlightStyleDark()
    } else {
      await articleStore.changeThemeLight()
      await articleStore.changeHighlightStyleLight()
    }
  })

  watch(toRef(articleCommentStore, 'page'), async (page) => {
    await articleCommentStore.loadComment(page)
    const el = document.querySelector('.d-article-comment-oder-btn')
    el.scrollIntoView()
  })
})

onUnmounted(() => {
  clog('onUnmounted')
  articleStore.$reset()
  articleCommentStore.$reset()
})
// todo 返回滚动位置
onBeforeRouteUpdate(async (to, from, next) => {
  if (to.hash) {
    if (to.path !== from.path) {
      next()
    }
  } else {
    next()
  }
})

const childCommentLimit = (comments): CommentContent[] => {
  if (comments.loadMore === undefined) {
    return comments.childComments.slice(0, 3)
  } else {
    return comments.childComments
  }
}

const onIntersect = (entries) => (gotoTitle.value = !!entries)
const createToc = () => {
  // @ts-ignore
  tocbot.init({
    tocSelector: '.js-toc',
    contentSelector: '.js-toc-content',
    headingSelector: 'h1, h2,h3,h4',
    scrollSmooth: true,
    scrollSmoothDuration: 500,
    scrollSmoothOffset: -70,
    headingsOffset: -20,
  })
}

const collectionGroupList = ref<Array<collectionGroupData>>() // 收藏分组列表
const collectionDialog = ref(false)
const selectCollectionGroup = ref<Array<number>>([])
const articleCollectionState = ref()
const collectionArticles = async () => {
  const { data: axiosResponse } = await useAxiosGetCollectionGroupList()
  if (axiosResponse.code === 0) {
    collectionGroupList.value = axiosResponse.data
    await loadArticleCollectionState()
    if (articleCollectionState.value.code === 0) {
      const state = articleCollectionState.value.data
      // selectCollectionGroup.value = state
      // clog(state)
      for (let i = collectionGroupList.value.length - 1; i >= 0; i--) {
        for (const iKey in state) {
          // clog("collectionGroupList.value[i].id",collectionGroupList.value[i].id)
          // clog("state[iKey].value[i].id",state[iKey])
          if (state[iKey] === collectionGroupList.value[i].id) {
            collectionGroupList.value[i].select = true
          }
        }
      }
    }
  }
}
const newCollectionGroupName = ref('')
const newCollectionGroup = async () => {
  let body: any = {
    groupName: newCollectionGroupName.value,
  }
  const { data: axiosResponse } = await useAxiosPostCreateCollectionGroup(body)
  if (axiosResponse.code === 0) {
    successMsg('创建成功')
    const { data: axiosResponse } = await useAxiosGetCollectionGroupList()
    if (axiosResponse.code === 0) {
      collectionGroupList.value = axiosResponse.data
      newCollectionGroupName.value = ''
    }
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const loadArticleCollectionState = async () => {
  clog('loadArticleCollectionState')
  const { data: articleCollectionStateData } = await useAxiosGetArticleCollectionState(aid)
  articleCollectionState.value = articleCollectionStateData
}
const addCollectionToGroup = async (groupId: string, select: boolean) => {
  let body: collectionData = {
    collectionType: collectionType.Article,
    sourceId: articleStore.articleField.id,
    groupId,
  }
  if (select) {
    const { data: axiosResponse } = await useAxiosPostAddCollectionToGroup(body)
    if (axiosResponse.code === 0) {
      // await loadArticleCollectionState()
      successMsg('收藏成功')
      collectionGroupList.value.find((value) => value.id === groupId).collectionNum++
    } else {
      warningMsg(axiosResponse.msg)
    }
  } else {
    const { data: axiosResponse } = await useAxiosCancelCollectionToGroup(body)
    if (axiosResponse.code === 0) {
      successMsg('取消收藏成功')
      collectionGroupList.value.find((value) => value.id === groupId).collectionNum--
    } else {
      errorMsg(axiosResponse.msg)
    }
  }
}

const subscribe = () => {
  followUser(articleStore.articleField.user.id)
  articleStore.follow = true
}

const unsubscribe = () => {
  unFollowUser(articleStore.articleField.user.id)
  articleStore.follow = false
}

const showDelBtn = (commentUserId: string, parentCommentUserId?: string) => {
  // if (articleStore.articleField.user.id === userStore.user.id) {
  //   return true
  // }
  const uid = user.user.id
  if (articleStore.articleField.user.id == uid) {
    return true
  }
  if (commentUserId == uid) {
    return true
  }
  if (parentCommentUserId != undefined) {
    return parentCommentUserId == uid
  }
}

const tocOverflow = ref('hidden')

onMounted(() => {
  const imgNodes: NodeListOf<HTMLImageElement> = document
    .querySelector('.markdown-body')
    .querySelectorAll('img')
  const interval = setInterval(() => {
    const bannerElement: HTMLImageElement = document.querySelector('.d-article-banner > img')
    if (bannerElement) {
      mediumZoom(bannerElement, {
        margin: 24,
        background: 'rgba(0,0,0,0.4)',
        scrollOffset: 0,
      })
      clearInterval(interval)
    }
  }, 1000)

  mediumZoom(imgNodes, {
    margin: 24,
    background: 'rgba(0,0,0,0.4)',
    scrollOffset: 0,
  })
  let t
  const autoOverflow = () => {
    clearTimeout(t)
    t = setTimeout(() => {
      let active = document.querySelector('.is-active-li')
      let listOf = document.querySelectorAll('.toc > div > ol > li')
      let parentElement = active.parentElement
      if (parentElement == null) {
        document.onscroll = null
        return
      }
      let viewCount = parentElement.childNodes.length + listOf.length
      if (viewCount > 15 && parentElement !== listOf[0].parentElement) {
        tocOverflow.value = 'auto'
      } else {
        listOf[0].scrollIntoView({
          behavior: 'smooth',
        })
        tocOverflow.value = 'hidden'
        document.onscroll = null
        setTimeout(() => {
          document.onscroll = () => {
            autoOverflow()
          }
        }, 1000)
      }
    }, 900)
  }
  // window.addEventListener('scroll', )
  if (document.documentElement.clientWidth > 1280) document.onscroll = autoOverflow
})
</script>

<style></style>

<style lang="sass" scoped>
//@import "../../assets/sass/mdTheme/cyanosis"
//@import "../../assets/sass/mdTheme/v-green"
//@import "../../assets/sass/mdTheme/arknights"
//@import "../../assets/sass/mdTheme/smart-blue.css"
//@import "../../assets/sass/mdTheme/juejin"
//@import "../../assets/sass/mdTheme/devui-blue"
//@import "../../assets/sass/mdTheme/geek-black"

.comment
  border-style: solid
  border-width: 1px
  border-color: rgba(136, 136, 136, 0.49)
</style>

<style lang="css" scoped>
:deep(.markdown-body pre code ul) {
  list-style-type: none;
  counter-reset: linenumber;
}

:deep(.markdown-body pre code ul li:before) {
  counter-increment: linenumber;
  content: counter(linenumber);
  margin-left: -20px;
  margin-right: 14px;
  color: v-bind('theme.global.name.value === "dark" ? "#9b9b9b" : "#626262"') !important;
}

:deep(.markdown-body p) {
  font-size: 20px !important;
}

.markdown-body {
  padding: 0 10px !important;
  background-repeat: initial !important;
}

.d-article-banner {
  margin-bottom: 5px;
}

:deep(.toc-list-item:hover) {
  color: #00c888;
}

/*.article-content p {*/
/*  font-size: 20px;*/
/*}*/

:deep(.toc::-webkit-scrollbar) {
  width: 0 !important;
}

:deep(.toc) {
  position: sticky;
  top: 10%;
  height: 100%;
  font-size: 17px;
  overflow: v-bind(tocOverflow) !important;
  /*overflow: hidden !important;*/
  /*overflow-y: auto !important;*/
  /*border-style: solid;*/
  /*border-width: 1px;*/
  /*border-color: rgba(136, 136, 136, 0.44);*/
}

:deep(.toc-list) {
  padding-left: 2em;
}

:deep(.toc > .toc-list li) {
  list-style: auto;
}

:deep(.side-toolbar1) {
  position: fixed;
  bottom: 30px;
  right: 0;
  /*width: 200px;*/
  padding: 10px;
}

:deep(.v-container) {
  max-width: 100%;
}

/*html {*/
/*  scroll-behavior: smooth!important;*/
/*}*/

/* 语法高亮 */
:deep(.hljs-container) {
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

:deep(code) {
  font-size: 18px !important;
}

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

<style>
.toc-link::before {
  background-color: v-bind('theme.global.name.value === "dark" ? "#2e2e2e" : "#eee"');
  /*content:' ';*/
  /*display:inline-block;*/
  /*height:inherit;*/
  /*left:0;*/
  /*margin-top:-1px;*/
  /*position:absolute;*/
  width: 4px;
}

.d-tip-error {
  /*background: #fcf1f1 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#351212" : "#fcf1f1"') !important;
  border-left-color: red !important;
  /*color: black!important;*/
}

.d-tip-success {
  background: v-bind('theme.global.name.value === "dark" ? "#09250d" : "#f0f8e5"') !important;
  border-left-color: #1aad19 !important;//使用v-bind切换样式
}

.d-tip-warning {
  /*background: #fcf2e9 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2c240a" : "#fcf2e9"') !important;
  border-left-color: #ec6800 !important;
  /*color: black!important;*/
}

.d-tip-info {
  /*background: #eef6fd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#162430" : "#eef6fd"') !important;
  border-left-color: #40c4ff !important;
  /*color: black!important;*/
}

.d-tip-share {
  /*background: #dddddd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2a2a2abc" : "#eeeeee"') !important;
  border-left-color: #8b968d !important;
  /*color: black!important;*/
}

/*.d-tip-error > p:first-child:before {*/
/*  content: "\F0156";*/
/*  font-size: 135%;*/
/*  color: red;*/
/*  font-weight: bold;*/
/*  margin-right: 5px;*/
/*  margin-left: -10px;*/
/*}*/
.d-tip-error > p:first-child:before {
  content: '\F0156';
  font-size: 135%;
  color: red;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-error > p:not(:first-child) {
  margin-left: 22px;
}

.d-tip-success p:first-child:before {
  content: '\F012C';
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "#41b883" : "#00c13c"') !important;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-warning p:first-child:before {
  content: '\F0205';
  font-size: 135%;
  position: center;
  height: 100%;
  color: #ff6800;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-info p:first-child:before {
  content: '\F064E';
  font-size: 135%;
  color: #40c4ff;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip-share p:first-child:before {
  content: '\F0065';
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "" : "#858585"') !important;
  font-weight: bold;
  margin-right: 5px;
  margin-left: -10px;
}

.d-tip > p:not(:first-child) {
  margin-left: 22px;
}
</style>

<!--<style>-->
<!--.img-select img {-->
<!--  width: 500px;-->
<!--  height: 300px;-->
<!--}-->

<!--.dialog-bg {-->
<!--  z-index: 9999;-->
<!--  /*display: none;*/-->
<!--  /*position: absolute;*/-->
<!--  /*top: 0;*/-->
<!--  /*bottom: 0;*/-->
<!--  /*left: 0;*/-->
<!--  /*right: 0;*/-->
<!--  background: rgba(0, 0, 0, 0.7)-->
<!--}-->

<!--.dialog-bg .img-box {-->
<!--  /*width: 1165px;*/-->
<!--  /*height: 650px;*/-->
<!--  /*position: absolute;*/-->
<!--  /*left: 50%;*/-->
<!--  /*top: 50%;*/-->
<!--  /*margin-left: -582px;*/-->
<!--  /*margin-top: -340px;*/-->
<!--}-->

<!--.dialog-bg .img-box img {-->
<!--  z-index: 9999;-->
<!--  position: absolute;-->
<!--  top: 895.263px;-->
<!--  left: 226.838px;-->
<!--  /*width: 100%;*/-->
<!--  /*height: 100%;*/-->
<!--  transform: scale(1.57314) translate3d(101.834px, 62.4784px, 0px);-->
<!--}-->

<!--</style>-->
