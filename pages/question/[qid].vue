<!--//todo 拆-->

<template>
  <div class="mt-4">
    <Head>
      <Title>{{ title }}</Title>
      <Meta :content="title" name="description" />
      <Style id="highlightStyle" :children="questionStore.HighlightStyleStr" type="text/css" />
      <Style id="markdownTheme" :children="questionStore.MarkdownThemeStr" type="text/css" />
    </Head>
    <v-row>
      <v-col cols="10">
        <!--        <v-btn href="#answerId-1588022587668037632+#test"></v-btn>-->
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="1">
                <client-only>
                  <div class="d-question-aside text-center">
                    <v-btn
                      elevation="0"
                      icon="true"
                      variant="plain"
                      @click="
                        answerStore.action({
                          answerType: AnswerType.up,
                          questionFieldId: questionId,
                          actionAnswerOrCommentId: '-1',
                        })
                      "
                    >
                      <v-icon
                        :color="questionStore.support === AnswerType.up ? 'blue-lighten-2' : 'grey'"
                        >mdi-triangle
                      </v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个问题有用且描述清晰
                      </v-tooltip>
                    </v-btn>

                    <p>
                      {{ questionStore.filed.upNum - questionStore.filed.downNum }}
                    </p>
                    <v-btn
                      elevation="0"
                      icon="true"
                      variant="plain"
                      @click="
                        answerStore.action({
                          answerType: AnswerType.down,
                          questionFieldId: questionId,
                          actionAnswerOrCommentId: '-1',
                        })
                      "
                    >
                      <v-icon
                        :color="
                          questionStore.support === AnswerType.down ? 'blue-lighten-2' : 'grey'
                        "
                        class="mdi-rotate-180"
                        >mdi-triangle
                      </v-icon>
                      <v-tooltip activator="parent" location="right">
                        这个问题没有认真研究用或描述不清晰
                      </v-tooltip>
                    </v-btn>
                    <br />

                    <v-dialog v-model="collectionDialog" persistent>
                      <template v-slot:activator="{ props }">
                        <v-btn
                          class="mt-2"
                          elevation="0"
                          icon="true"
                          size="small"
                          @click="openCollectionDialog(1, questionId)"
                        >
                          <!--                               @click="openCollectionDialog(collectionType.Question,questionId)">-->
                          <v-icon class="text-grey">mdi-book-heart-outline</v-icon>
                          <v-tooltip activator="parent" location="right">
                            收藏并跟踪这个问题
                          </v-tooltip>
                        </v-btn>
                        <div v-if="questionStore.filed.collectNum > 0" class="text-grey">
                          {{ questionStore.filed.collectNum }}
                        </div>
                      </template>
                      <div style="margin-left: 25%">
                        <v-card class="text-center" style="width: 600px">
                          <v-card-title>
                            <span class="text-h6 ml-8">添加到收藏夹</span>
                          </v-card-title>

                          <div
                            v-for="group in collectionGroupList"
                            :key="group.id"
                            class="d-flex my-n6 px-4"
                          >
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
                            <v-btn color="red-darken-1" text @click="collectionDialog = false">
                              关闭
                            </v-btn>
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
              </v-col>
              <v-col cols="11">
                <div class="text-h5">{{ questionStore.filed?.title }}</div>

                <div class="mt-1">
                  <nuxt-link :href="`/user/${questionStore.filed.user.id}`" target="_blank">
                    <v-avatar>
                      <v-img :src="questionStore.filed.user.userInfo.avatar"></v-img>
                    </v-avatar>

                    <span class="text-blue ml-1 mr-4">{{ questionStore.filed.user.nickname }}</span>
                  </nuxt-link>
                  <!--                  <span>发起于：{{ dateFilter(questionStore.filed.createTime, 'YYYY年MM月DD日') }}</span>-->
                  <span>发起于：{{ timeAgoFilter(questionStore.filed.createTime) }}</span>
                  <span class="ml-4"
                    >修改：{{
                      dateFilter(questionStore.filed.lastModifiedTime, 'YYYY年MM月DD日')
                    }}</span
                  >
                  <div class="float-right">
                    <client-only>
                      <v-dialog v-model="invitationAnswer">
                        <template v-slot:activator="{ props }">
                          <v-btn color="primary" v-bind="props" variant="outlined">
                            邀请回答
                          </v-btn>
                        </template>

                        <v-card width="40%" class="mx-auto">
                          <v-card-title>邀请回答</v-card-title>

                          <v-row v-show="invitationTab === 'search'">
                            <v-col>
                              <v-text-field
                                v-model="invitationSearchText"
                                append-inner-icon="mdi-magnify"
                                class="mx-4"
                                label="搜索用户"
                                single-line
                                @click:append-inner="searchInvitationUser(invitationSearchText)"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-card>
                                <v-tabs v-model="invitationTab">
                                  <v-tab value="following">关注</v-tab>
                                  <v-tab value="recommended">推荐</v-tab>
                                  <v-tab value="search">搜索</v-tab>
                                </v-tabs>

                                <v-card-text>
                                  <v-window v-model="invitationTab">
                                    <v-window-item value="following">
                                      <v-list v-for="(u, index) in invitationFollowingUserList">
                                        <v-list-item>
                                          <nuxt-link :href="`/user/${u.id}`" target="_blank">
                                            <v-avatar>
                                              <v-img :src="u.userInfo.avatar"></v-img>
                                            </v-avatar>
                                            <span class="mx-3" v-text="u.nickname"></span>
                                          </nuxt-link>
                                          <v-chip
                                            v-for="tag in u.userTags"
                                            :key="tag.id"
                                            size="small"
                                          >
                                            <v-icon>
                                              mdi-language-{{ tag.name.toLocaleLowerCase() }}
                                            </v-icon>
                                            {{ tag.name }}
                                          </v-chip>
                                          <v-btn
                                            v-if="!u.invited"
                                            class="float-right"
                                            color="red"
                                            variant="tonal"
                                            @click="
                                              InvitationUserAnswerQuestion(
                                                {
                                                  questionId: questionId,
                                                  userId: u.id,
                                                  cancel: false,
                                                },
                                                index
                                              )
                                            "
                                          >
                                            邀请 {{ u.id }}
                                          </v-btn>
                                          <template v-else>
                                            <v-btn
                                              class="d-invited float-right"
                                              color="#3eb370"
                                              variant="tonal"
                                              @click="
                                                InvitationUserAnswerQuestion(
                                                  {
                                                    questionId: questionId,
                                                    userId: u.id,
                                                    cancel: true,
                                                  },
                                                  index
                                                )
                                              "
                                            >
                                              取消邀请{{ u.userId }}
                                            </v-btn>
                                          </template>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                      </v-list>
                                    </v-window-item>

                                    <v-window-item value="recommended">
                                      <v-list v-for="(u, index) in invitationRecommendedUserList">
                                        <v-list-item>
                                          <v-row>
                                            <v-col cols="12">
                                              <nuxt-link :href="`/user/${u.id}`" target="_blank">
                                                <v-avatar>
                                                  <v-img :src="u.userInfo.avatar"></v-img>
                                                </v-avatar>

                                                <span class="mx-3" v-text="u.nickname"></span>
                                              </nuxt-link>
                                              <v-chip
                                                v-for="tag in u.userTags"
                                                :key="tag.id"
                                                size="small"
                                              >
                                                <v-icon>
                                                  mdi-language-{{ tag.name.toLocaleLowerCase() }}
                                                </v-icon>
                                                {{ tag.name }}
                                              </v-chip>
                                              <v-btn
                                                v-if="!u.invited"
                                                class="float-right"
                                                color="red"
                                                variant="tonal"
                                                @click="
                                                  InvitationUserAnswerQuestion(
                                                    {
                                                      questionId: questionId,
                                                      userId: u.id,
                                                      cancel: false,
                                                    },
                                                    index
                                                  )
                                                "
                                              >
                                                邀请 {{ u.id }}
                                              </v-btn>
                                              <template v-else>
                                                <v-btn
                                                  class="d-invited float-right"
                                                  color="#3eb370"
                                                  variant="tonal"
                                                  @click="
                                                    InvitationUserAnswerQuestion(
                                                      {
                                                        questionId: questionId,
                                                        userId: u.id,
                                                        cancel: true,
                                                      },
                                                      index
                                                    )
                                                  "
                                                >
                                                  取消邀请{{ u.userId }}
                                                </v-btn>
                                              </template>
                                            </v-col>
                                          </v-row>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                      </v-list>
                                    </v-window-item>

                                    <v-window-item value="search">
                                      <v-list v-for="(u, index) in invitationSearchUserList">
                                        <v-list-item>
                                          <nuxt-link :href="`/user/${u.id}`" target="_blank">
                                            <v-avatar>
                                              <v-img :src="u.avatar"></v-img>
                                            </v-avatar>

                                            <span class="mx-3" v-text="u.userNickName"></span>
                                          </nuxt-link>
                                          <v-chip
                                            v-for="tag in u.userTags"
                                            :key="tag.id"
                                            size="small"
                                          >
                                            <v-icon>
                                              mdi-language-{{ tag.name.toLocaleLowerCase() }}
                                            </v-icon>
                                            {{ tag.name }}
                                          </v-chip>
                                          <v-btn
                                            v-if="!u.invited"
                                            class="float-right"
                                            color="red"
                                            variant="tonal"
                                            @click="
                                              InvitationUserAnswerQuestion(
                                                {
                                                  questionId: questionId,
                                                  userId: u.userId,
                                                  cancel: false,
                                                },
                                                index
                                              )
                                            "
                                          >
                                            邀请{{ u.userId }}
                                          </v-btn>
                                          <template v-else>
                                            <v-btn
                                              class="d-invited float-right"
                                              color="#3eb370"
                                              variant="tonal"
                                              @click="
                                                InvitationUserAnswerQuestion(
                                                  {
                                                    questionId: questionId,
                                                    userId: u.userId,
                                                    cancel: true,
                                                  },
                                                  index
                                                )
                                              "
                                            >
                                              取消邀请{{ u.userId }}
                                            </v-btn>
                                          </template>
                                        </v-list-item>
                                        <v-divider></v-divider>
                                      </v-list>
                                    </v-window-item>
                                  </v-window>
                                </v-card-text>
                              </v-card>
                            </v-col>
                          </v-row>
                          <v-card-actions class="justify-end">
                            <v-btn color="primary" @click="invitationAnswer = false">邀请</v-btn>
                            <v-btn color="primary" @click="invitationAnswer = false">关闭</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </client-only>

                    <template v-if="questionStore.filed.user.id !== userStore.user?.id">
                      <v-btn v-if="questionStore.follow" class="mx-4" color="pink lighten-3">
                        <span style="color: white" @click="unsubscribe()">已关注</span>
                      </v-btn>
                      <v-btn v-else class="mx-4" color="blue lighten-3" @click="subscribe()">
                        <span style="color: white">关注</span>
                      </v-btn>
                    </template>

                    <v-btn
                      v-else
                      :href="`/question/ask?id=${questionId}`"
                      class=""
                      color="#c42161"
                      target="_blank"
                      variant="outlined"
                    >
                      重新编辑
                    </v-btn>
                  </div>
                </div>

                <div
                  v-hljs="{ addCopy: true }"
                  class="markdown-body question-content"
                  v-html="questionStore.content"
                ></div>

                <v-chip-group class="mt-7">
                  <v-chip
                    v-for="tag in questionStore.filed.questionTags"
                    :key="tag.id"
                    size="small"
                  >
                    <v-icon> mdi-language-{{ tag.name.toLocaleLowerCase() }}</v-icon>
                    {{ tag.name }}
                  </v-chip>
                </v-chip-group>
                <v-divider class="my-3"></v-divider>
                <v-row class="">
                  <v-col>
                    <client-only>
                      <v-btn
                        key="answer"
                        color="#47885e"
                        variant="tonal"
                        @click="scrollIntoAnswer()"
                      >
                        <!--                        <v-tooltip activator="parent" location="top">-->
                        <!--                          回答问题-->
                        <!--                        </v-tooltip>-->
                        回答
                      </v-btn>
                      <v-dialog>
                        <template v-slot:activator="{ props }">
                          <v-btn
                            key="reply"
                            class="ml-4"
                            color="#00a3af"
                            v-bind="props"
                            variant="tonal"
                          >
                            <v-tooltip activator="parent" location="top">
                              询问问题其他细节或提出修改意见
                            </v-tooltip>
                            回复
                          </v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                          <v-card style="margin-left: 20%; width: 55%">
                            <v-toolbar
                              :title="`回复${questionStore.filed.user.nickname}询问其他细节或提出修改意见`"
                              color="#9d5b8b"
                              style="color: white"
                            ></v-toolbar>
                            <!--                                <v-card-text>-->
                            <!--                                  <div class="text-h2 pa-12">Hello world!</div>-->
                            <!--                                </v-card-text>-->
                            <v-form>
                              <v-textarea
                                v-model="replyCommentText"
                                clear-icon="mdi-close-circle"
                                clearable
                                fluid
                                placeholder=""
                                prepend-inner-icon="mdi-comment"
                                rows="4"
                              >
                                <!--                auto-grow-->
                              </v-textarea>
                            </v-form>
                            <v-card-actions class="justify-end">
                              <v-btn
                                append-icon="mdi-close"
                                class="mr-2"
                                color="#e2041b"
                                variant="outlined"
                                @click="isActive.value = false"
                                >关闭
                              </v-btn>
                              <v-btn
                                append-icon="mdi-reply"
                                color="#98d98e"
                                variant="outlined"
                                @click="commentQuestion(isActive)"
                                >回复
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
                      <v-btn
                        key="follow"
                        class="ml-4"
                        color="#ffbd2f"
                        variant="tonal"
                        @click="watchQuestion(questionStore.watch)"
                      >
                        {{ questionStore.watch ? '取消追踪' : '追踪' }}
                        <v-tooltip activator="parent" location="top">
                          关注跟踪这个问题，当有新的回答时会收到通知
                        </v-tooltip>
                      </v-btn>
                    </client-only>
                    <!--                    {{ questionStore.filed }}-->
                    <!--                    <v-divider class="my-2"></v-divider>-->

                    <v-card
                      v-if="questionStore.filed.questionCommentList.length > 0"
                      class="pa-5 mt-2"
                    >
                      <!--                            :theme="useCookie('theme')">-->
                      <TransitionGroup name="list" tag="div">
                        <template
                          v-for="comment in questionStore.filed.questionCommentList"
                          :key="comment.id"
                        >
                          <div>
                            <div class="float-left">
                              <a
                                :href="`/user/${comment.user.id}`"
                                class="text-blue"
                                target="_blank"
                              >
                                {{ comment.user.nickname }}：
                              </a>
                            </div>
                            <div v-if="comment.replyUserAnswerId === '0'">
                              {{ comment.textHtml }}
                            </div>
                            <div
                              v-else
                              v-html="atSrtGotoHome(comment.textHtml, comment.parentUserId)"
                            ></div>
                            <div>
                              <span class="text-subtitle-2 text-grey">
                                <!--                                {{ dateFilter(comment.createTime, 'YYYY年MM月DD hh:mm') }}-->
                                {{ timeAgoFilter(comment.createTime) }}
                              </span>
                              <v-btn
                                color="blue"
                                icon="true"
                                size="small"
                                variant="text"
                                @click="
                                  showCommentDialog(
                                    comment.user,
                                    comment.id,
                                    '0',
                                    AnswerType.comment
                                  )
                                "
                              >
                                <v-icon>mdi-reply</v-icon>
                              </v-btn>
                            </div>
                            <v-divider class="mt-1"></v-divider>
                          </div>
                        </template>
                      </TransitionGroup>
                    </v-card>
                  </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>

                <div>
                  <div class="pa-2 text-h6 answerNum">
                    {{ questionStore.filed.answerNum }}个回答
                  </div>
                </div>
                <v-row></v-row>
              </v-col>
            </v-row>
            <TransitionGroup name="list" tag="div">
              <template v-for="(answer, index) in answerStore.dataList" :key="answer.id">
                <v-row class="mt-4" :id="`answerId-${answer.id}`">
                  <v-col cols="1">
                    <client-only>
                      <div class="d-answer-aside text-center">
                        <v-btn
                          elevation="0"
                          icon="true"
                          variant="plain"
                          @click="
                            answerStore.action(
                              {
                                answerType: AnswerType.up,
                                questionFieldId: questionId,
                                actionAnswerOrCommentId: answer.id,
                              },
                              index
                            )
                          "
                        >
                          <v-icon :color="answerStore.getActionColor(AnswerType.up, index)"
                            >mdi-triangle
                          </v-icon>
                          <v-tooltip activator="parent" location="right"> 这个回答有用</v-tooltip>
                        </v-btn>
                        <!--                      {{ answer.userAction }}-->
                        <p>{{ answer.upNum - answer.downNum }}</p>
                        <v-btn
                          elevation="0"
                          icon="true"
                          variant="plain"
                          @click="
                            answerStore.action(
                              {
                                answerType: AnswerType.down,
                                questionFieldId: questionId,
                                actionAnswerOrCommentId: answer.id,
                              },
                              index
                            )
                          "
                        >
                          <v-icon
                            :color="answerStore.getActionColor(AnswerType.down, index)"
                            class="mdi-rotate-180"
                            >mdi-triangle
                          </v-icon>
                          <v-tooltip activator="parent" location="right"> 这个回答没有用</v-tooltip>
                        </v-btn>
                        <br />
                        <template v-if="answer.accepted">
                          <v-btn
                            v-if="questionStore.filed.user.id !== userStore.user?.id"
                            class="my-2"
                            elevation="0"
                            icon="true"
                          >
                            <v-icon class="" color="#00c13c" size="large"> mdi-check-bold</v-icon>
                            <v-tooltip activator="parent" location="right">
                              这个答案被提问者采纳在
                              {{ timeAgoFilter(answer.acceptedTime) }}
                            </v-tooltip>
                          </v-btn>
                          <v-btn
                            v-else
                            class="my-2"
                            elevation="0"
                            icon="true"
                            @click="acceptedAnswer(answer.id, false, index)"
                          >
                            <v-icon class="" color="#00c13c" size="large"> mdi-check-bold</v-icon>
                            <v-tooltip activator="parent" location="right"> 取消采纳</v-tooltip>
                          </v-btn>
                        </template>
                        <template v-else>
                          <v-btn
                            v-if="questionStore.filed.user.id === userStore.user?.id"
                            class="my-2"
                            elevation="0"
                            icon="true"
                            @click="acceptedAnswer(answer.id, true, index)"
                          >
                            <v-icon class="" size="large"> mdi-check-bold</v-icon>
                            <v-tooltip activator="parent" location="right"> 采纳这个回答</v-tooltip>
                          </v-btn>
                        </template>

                        <br />
                        <v-btn
                          class="mt-2"
                          elevation="0"
                          icon="true"
                          size="small"
                          @click="openCollectionDialog(3, answer.id)"
                        >
                          <!--                             @click="openCollectionDialog(collectionType.Answer,answer.id)">-->
                          <v-icon class="text-grey">mdi-book-heart-outline</v-icon>
                          <v-tooltip activator="parent" location="right"> 收藏这个回答</v-tooltip>
                        </v-btn>
                      </div>
                    </client-only>
                  </v-col>
                  <v-col cols="11">
                    <client-only>
                      <v-card class="pa-4">
                        <!--                    <v-row>-->
                        <!--                      <v-col>-->
                        <div
                          v-hljs="{ addCopy: true }"
                          class="markdown-body"
                          v-html="answer.textHtml"
                        ></div>
                        <!--                      <div v-html="answer.textHtml" class="markdown-body"></div>-->
                        <div class="mt-4">
                          <div class="float-left">
                            <v-dialog>
                              <template v-slot:activator="{ props }">
                                <v-btn
                                  key="reply"
                                  class="ml-1"
                                  color="#00a3af"
                                  v-bind="props"
                                  variant="tonal"
                                >
                                  <v-tooltip activator="parent" location="top">
                                    询问问题其他细节或提出修改意见。
                                  </v-tooltip>
                                  回复
                                </v-btn>
                              </template>
                              <template v-slot:default="{ isActive }">
                                <v-card style="margin-left: 20%; width: 55%">
                                  <v-toolbar
                                    :title="`回复${answer.user.nickname}询问其他细节或提出修改意见`"
                                    color="#9d5b8b"
                                    style="color: white"
                                  ></v-toolbar>
                                  <!--                                <v-card-text>-->
                                  <!--                                  <div class="text-h2 pa-12">Hello world!</div>-->
                                  <!--                                </v-card-text>-->
                                  <v-form>
                                    <v-textarea
                                      v-model="replyCommentText"
                                      clear-icon="mdi-close-circle"
                                      clearable
                                      fluid
                                      placeholder=""
                                      prepend-inner-icon="mdi-comment"
                                      rows="4"
                                    >
                                      <!--                auto-grow-->
                                    </v-textarea>
                                  </v-form>
                                  <v-card-actions class="justify-end">
                                    <v-btn
                                      append-icon="mdi-close"
                                      class="mr-2"
                                      color="#e2041b"
                                      variant="outlined"
                                      @click="isActive.value = false"
                                      >关闭
                                    </v-btn>
                                    <v-btn
                                      append-icon="mdi-reply"
                                      color="#92398e"
                                      variant="outlined"
                                      @click="commentAnswer(index, answer.id, isActive)"
                                      >回复
                                    </v-btn>
                                  </v-card-actions>
                                </v-card>
                              </template>
                            </v-dialog>
                            <!--                        <v-btn variant="outlined" color="#00a3af">-->
                            <!--                          <v-tooltip activator="parent" location="top">-->
                            <!--                            询问问题其他细节或提出修改意见-->
                            <!--                          </v-tooltip>-->
                            <!--                          回复-->
                            <!--                        </v-btn>-->
                            <!--                        <v-btn class="mx-4" variant="outlined" color="#b7282e">-->
                            <!--                          关注-->
                            <!--                          <v-tooltip activator="parent" location="top">-->
                            <!--                            关注跟踪这个问题，当有新的回答时会收到通知-->
                            <!--                          </v-tooltip>-->
                            <!--                        </v-btn>-->
                          </div>
                          <div class="text-end">
                            <nuxt-link :href="`/user/${answer.user.id}`" target="_blank">
                              <v-avatar>
                                <v-img :src="answer.user.userInfo.avatar"></v-img>
                              </v-avatar>
                              <span>{{ answer.user.nickname }}/</span>
                            </nuxt-link>

                            <span class="text-grey">{{ dateFilter(answer.createTime) }}</span>
                          </div>
                        </div>
                        <!--                      </v-col>-->
                        <!--                    </v-row>-->
                        <v-card v-if="answer.childQaAnswers?.length > 0" class="pa-5">
                          <TransitionGroup name="list" tag="div">
                            <template
                              v-for="childAnswer in answer.childQaAnswers"
                              :key="childAnswer.id"
                            >
                              <div>
                                <div class="float-left">
                                  <nuxt-link
                                    :href="`/user/${childAnswer.user.id}`"
                                    class="text-blue"
                                    target="_blank"
                                  >
                                    {{ childAnswer.user.nickname }}：
                                  </nuxt-link>
                                </div>
                                <div v-if="childAnswer.replyUserAnswerId === '0'">
                                  {{ childAnswer.textHtml }}
                                </div>
                                <div
                                  v-else
                                  v-html="
                                    atSrtGotoHome(childAnswer.textHtml, childAnswer.parentUserId)
                                  "
                                ></div>
                                <!--                        <div>-->
                                <!--                          <v-btn size="x-small" icon="mdi-thumb-up-outline" :icon="true" elevation="0"></v-btn>-->
                                <!--                          <v-btn size="x-small" icon="mdi-thumb-down-outline" :icon="true" elevation="0"></v-btn>-->
                                <!--                          <v-btn size="x-small" icon="mdi-reply-outline" :icon="true" elevation="0"></v-btn>-->
                                <!--                        </div>-->
                                <div>
                                  <span class="text-subtitle-2 text-grey">
                                    {{ timeAgoFilter(childAnswer.createTime) }}
                                    <!--                                    {{ timeAgoFilter(childAnswer.createTime, 'YYYY年MM月DD hh:mm') }}-->
                                  </span>
                                  <v-btn
                                    color="blue"
                                    icon="true"
                                    size="small"
                                    variant="text"
                                    @click="
                                      showCommentDialog(
                                        childAnswer.user,
                                        childAnswer.id,
                                        answer.id,
                                        AnswerType.answer_comment,
                                        index
                                      )
                                    "
                                  >
                                    <v-tooltip activator="parent" location="right">
                                      询问问题其他细节或提出修改意见
                                    </v-tooltip>
                                    <v-icon>mdi-reply</v-icon>
                                  </v-btn>
                                </div>
                                <v-divider class="mt-1"></v-divider>
                              </div>
                            </template>
                          </TransitionGroup>
                        </v-card>
                      </v-card>
                    </client-only>
                  </v-col>
                </v-row>
              </template>
            </TransitionGroup>
            <v-row>
              <v-col>
                <v-pagination
                  v-model="answerStore.pageParam.page"
                  :length="answerStore.totalPages"
                  class="my-4"
                  rounded="circle"
                  @update:modelValue="answerStore.loadAnswer(questionId, true)"
                >
                </v-pagination>
              </v-col>
            </v-row>
            <v-row>
              <v-col offset="1">
                <v-divider class="my-4"></v-divider>
                <v-row class="pa-4">
                  <v-col cols="2">
                    <div class="text-h5" id="answer">撰写回答</div>
                  </v-col>
                  <v-col offset="9">
                    <v-btn
                      v-if="showAnswerWindow"
                      class=""
                      color="#669651"
                      variant="tonal"
                      @click="answerQuestion()"
                    >
                      发送
                    </v-btn>
                    <v-btn
                      v-if="showAnswerWindow"
                      class="d-send-answer mt-n1 h-75"
                      color="#669651"
                      size="small"
                      style="display: none"
                      variant="outlined"
                      @click="answerQuestion()"
                    >
                      <p class="ml-4">发送回答</p>
                    </v-btn>
                  </v-col>
                </v-row>

                <AnswerBytemdEditor
                  v-if="showAnswerWindow"
                  :content="content"
                  style="margin-bottom: 100px"
                  @change-text="changeText"
                >
                </AnswerBytemdEditor>
                <div v-else class="pa-8 d-answer-tip-card">
                  <span class="text-h6 text-green">适合作为回答的</span>
                  <div class="d-answer-tip-recommend">
                    <p class="card-text mdi">经过验证的有效解决办法</p>
                    <p class="card-text mdi">自己的经验指引，对解决问题有帮助</p>
                    <p class="card-text mdi">
                      遵循
                      <span class="d-markdown-tip">
                        <nuxt-link href="/article/1" target="_blank">
                          《Markdown 语法排版》
                        </nuxt-link>
                        <v-icon class="mb-1" size="x-large"
                          >mdi-language-markdown-outline</v-icon
                        ></span
                      >
                      ，代码语义正确
                    </p>
                  </div>
                  <span class="text-h6 text-red">不该作为回答的</span>
                  <div class="d-answer-tip-inappropriate">
                    <p class="card-text mdi">询问内容细节或回复楼层</p>
                    <p class="card-text mdi">与题目无关的内容</p>
                    <p class="card-text mdi">“赞”“顶”“同问”“看手册”“解决了没”等毫无意义的内容</p>
                  </div>
                  <div class="my-3">
                    <v-btn color="#1aad19" size="large" variant="tonal" @click="showAnswerWin()"
                      >撰写解决方法
                    </v-btn>
                  </div>
                  <div class="d-answer-tip-comment">
                    <p class="card-text mdi">
                      询问细节、提出修改意见时，请使用每条内容下方的<span style="color: #12a9b5"
                        >“回复”</span
                      >功能
                    </p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col>
        Related
        <div v-for="i in 50">
          <p>{{ i }}</p>
        </div>
      </v-col>
      <client-only>
        <v-dialog v-model="commentDialog">
          <v-card style="margin-left: 20%; width: 55%">
            <v-toolbar
              :title="`回复${commentUser.nickname}询问其他细节或提出修改意见。`"
              color="#9d5b8b"
              style="color: white"
            ></v-toolbar>
            <v-form>
              <v-textarea
                v-model="replyCommentText"
                clear-icon="mdi-close-circle"
                clearable
                fluid
                placeholder=""
                prepend-inner-icon="mdi-comment"
                rows="4"
              >
              </v-textarea>
            </v-form>
            <v-card-actions class="justify-end">
              <v-btn
                append-icon="mdi-close"
                class="mr-2"
                color="#e2041b"
                variant="outlined"
                @click="commentDialog = false"
                >关闭
              </v-btn>
              <v-btn
                append-icon="mdi-reply"
                color="#98d98e"
                variant="outlined"
                @click="replyQuestionComment()"
                >回复
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </client-only>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useQuestionStore } from '~/stores/question/questionStore'
import { useCookie, useRoute, useRouter } from '#app'
import { atSrtGotoHome, dateFilter, timeAgoFilter } from '~/composables/useTools'
import { nextTick, onMounted, ref, toRaw, watch } from 'vue'
import { changeHighlightStyle } from '~/constant/highlightStyleList'
import { changeThemes, themes } from '~/constant/markdownThemeList'
import { useFetchGetQuestionContent, useFetchGetQuestionField } from '~/composables/Api/question'
import { useTheme } from 'vuetify'
import { useAnswerStore } from '~/stores/question/answerStore'
import { AnswerData, AnswerType, User0 } from '~/types/question/answer'
import { User, userData } from '~/types/user'
import AnswerBytemdEditor from '~/components/question/answerBytemdEditor.vue'
import {
  useAxiosCancelCollectionToGroup,
  useAxiosGetCollectionGroupList,
  useAxiosPostAddCollectionToGroup,
  useAxiosPostCreateCollectionGroup,
} from '~/composables/Api/article'
import { collectionData, collectionGroupData, collectionType } from '~/types/article'
import { errorMsg, successMsg, warningMsg } from '~/composables/utils/toastification'
import {
  followUser,
  unFollowUser,
  useAxiosGetFollowingList,
} from '~/composables/Api/user/following'
import { useLayout } from '~/stores/layout'
import { useUserStore } from '~/stores/user'
import { useGet, usePost } from '~/composables/useAxios'
import { ResponseData } from '~/types/utils/axios'
import {
  InvitationUserAnswerQuestionRB,
  userAxiosGetAcceptAnswer,
  userAxiosPostInvitationUserAnswerQuestion,
} from '~/composables/Api/question/answer'
import { clog } from '~/utils/clog'

const theme = useTheme()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const questionId = String(route.params.qid)
const questionStore = useQuestionStore()
const answerStore = useAnswerStore()
const responseData = await useFetchGetQuestionField(questionId, true)
const content = ref('')
const replyCommentText = ref('')
const commentDialog = ref(false)

const changeText = async (text) => {
  content.value = text
}
const commentUser = ref<userData>()
const commentParentAnswerId = ref('')
const commentCommentId = ref('')
const commentAnswerType = ref<AnswerType>()
const commentAnswerIndex = ref(0)
const collectionDialog = ref(false)
const invitationSearchText = ref()

const invitationSearchUserList = ref<User0[]>()
const invitationRecommendedUserList = ref<User0[]>()
const invitationFollowingUserList = ref<User0[]>()
const invitationAnswer = ref()
const invitationTab = ref()
/* const invitedBtn: Element = ref() */
let layout = useLayout()
layout.showFooter = true
if (responseData.code === 0) {
  questionStore.filed = responseData.data
  const contentResponseData = await useFetchGetQuestionContent(questionId)
  if (contentResponseData.code === 0) {
    questionStore.content = contentResponseData.data
  }
  questionStore.cookieThemeState = useCookie('theme')
} else {
  clog(responseData.msg)
}
questionStore.init(questionId)
const title = ref(questionStore.filed.title)
const showAnswerWindow = ref(false)
if (typeof window == 'undefined') {
  questionStore.HighlightStyleStr = await changeHighlightStyle(
    questionStore.getHighlightStyleName(),
    true
  )
  questionStore.MarkdownThemeStr = await changeThemes(
    themes[questionStore.getMarkdownThemeName()],
    true
  )
}

onMounted(async () => {
  await questionStore.getUserToQuestionAction(questionId)
  await answerStore.loadAnswer(questionId)
  watch(theme.global.name, async (val) => {
    if (val === 'dark') {
      await questionStore.changeThemeDark()
      await questionStore.changeHighlightStyleDark()
    } else {
      await questionStore.changeThemeLight()
      await questionStore.changeHighlightStyleLight()
    }
  })
  // #answerId-1588022587668037632-#test
  let h = route.hash
  if (h) {
    if (h.indexOf('+') > 0) {
      let hash = h.split('+')
      document.querySelector(`${hash[0]} ${hash[1]}`).scrollIntoView()
    }
  }
  watch(invitationAnswer, async (val) => {
    if (val) {
      const { data: response } = await useAxiosGetFollowingList()
      if (response.code === 0) {
        invitationFollowingUserList.value = response.data.content
      } else {
        warningMsg(response.msg)
      }
    }
  })

  watch(invitationTab, async (val) => {
    if (val == 'recommended') {
      const { data: response } = await usePost<ResponseData<User[]>>('user/tag/user', {
        tagIds: questionStore.filed.questionTags.map((t) => t.id),
      })
      invitationRecommendedUserList.value = response.data
    }
  })
})

const collectionGroupList = ref<Array<collectionGroupData>>() // 收藏分组列表
const collectionType = ref<collectionType>()
const collectionSourceId = ref('')

const openCollectionDialog = async (type: collectionType, sourceId: string) => {
  collectionDialog.value = true
  collectionType.value = type
  collectionSourceId.value = sourceId
  const { data: axiosResponse } = await useAxiosGetCollectionGroupList()
  if (axiosResponse.code === 0) {
    collectionGroupList.value = axiosResponse.data
    // await loadArticleCollectionState()
    // if (articleCollectionState.value.code === 0) {
    //   const state = articleCollectionState.value.data
    //   // selectCollectionGroup.value = state
    //   // clog(state)
    //   for (let i = collectionGroupList.value.length - 1; i >= 0; i--) {
    //     for (const iKey in state) {
    //       // clog("collectionGroupList.value[i].id",collectionGroupList.value[i].id)
    //       // clog("state[iKey].value[i].id",state[iKey])
    //       if (state[iKey] === collectionGroupList.value[i].id) {
    //         collectionGroupList.value[i].select = true
    //       }
    //     }
    //   }
    // }
  }
}
const addCollectionToGroup = async (groupId: string, select: boolean) => {
  let body: collectionData = {
    collectionType: collectionType.value,
    sourceId: collectionSourceId.value,
    groupId,
  }
  if (select) {
    const { data: axiosResponse } = await useAxiosPostAddCollectionToGroup(body)
    if (axiosResponse.code === 0) {
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

const subscribe = () => {
  followUser(questionStore.filed.user.id)
  questionStore.follow = true
}

const unsubscribe = () => {
  unFollowUser(questionStore.filed.user.id)
  questionStore.follow = false
}


const showCommentDialog = (
  user: User,
  CommentId: string,
  ParentAnswerId: string,
  answerType: AnswerType,
  index: number
) => {
  commentDialog.value = true
  commentUser.value = user
  commentParentAnswerId.value = ParentAnswerId
  commentCommentId.value = CommentId
  commentAnswerType.value = answerType
  commentAnswerIndex.value = index
}

const showAnswerWin = async () => {
  showAnswerWindow.value = true
  await nextTick()
  let element = document.querySelector('#answer')
  element.scrollIntoView({
    behavior: 'smooth',
  })
}

const searchInvitationUser = async (query: string) => {
  const { data: axiosResponse } = await useGet<ResponseData<User0[]>>(
    `search/user/invitation-user/${query}`,
    {
      page: 1,
      questionId,
    }
  )
  if (axiosResponse.code === 0) {
    invitationSearchUserList.value = axiosResponse.data.content
    invitationTab.value = 'search'
    //fixme
  } else {
    warningMsg(axiosResponse.msg)
  }
}

const InvitationUserAnswerQuestion = async (body: InvitationUserAnswerQuestionRB, index) => {
  const { data: axiosResponse } = await userAxiosPostInvitationUserAnswerQuestion(body)
  if (axiosResponse.code == 0) {
    if (body.cancel) {
      invitationSearchUserList.value[index].invited = false
      successMsg('取消邀请成功')
    } else {
      invitationSearchUserList.value[index].invited = true
      successMsg('邀请成功')
    }
  } else {
    warningMsg(axiosResponse.msg)
  }
}

const scrollIntoAnswer = () => {
  let element = document.querySelector('#answer')
  element.scrollIntoView({
    behavior: 'smooth',
  })
}
const acceptedAnswer = async (answerId: string, accept: boolean, index?: number) => {
  const { data: response } = await userAxiosGetAcceptAnswer(answerId, accept)

  if (response.code === 0 && response.data) {
    if (accept) {
      successMsg('采纳答案成功')
    } else {
      successMsg('取消采纳答案成功')
    }
    answerStore.dataList[index].accepted = accept
  } else {
    warningMsg('操作失败')
  }
}

const watchQuestion = async (cancel = false) => {
  if (cancel) {
    const { data: axiosResponse } = await usePost<ResponseData<boolean>>(
      'qa/question/unwatch/' + questionId
    )
    if (axiosResponse.code == 0 && axiosResponse.data) {
      questionStore.watch = false
      successMsg('取消追踪成功')
    } else {
      warningMsg(axiosResponse.msg)
    }
  } else {
    const { data: response } = await usePost<ResponseData<boolean>>(
      'qa/question/watch/' + questionId
    )
    if (response.code == 0 && response.data) {
      questionStore.watch = true
      successMsg('追踪问题成功')
    } else {
      warningMsg(response.msg)
    }
  }
}

const commentQuestion = (isActive) => {
  clog('commentQuestion')
  const handle = (ret: AnswerData) => {
    isActive.value = false
    complementRet(ret)
    questionStore.filed.questionCommentList.unshift(ret)
    replyCommentText.value = ''
  }
  answerStore.answerOrCommentQuestion(
    {
      mdText: replyCommentText.value,
      parentAnswerId: '0',
      questionId: questionId,
      answerType: AnswerType.comment,
    },
    handle
  )
}

const replyQuestionComment = () => {
  clog('replyQuestionComment')
  const handle = (ret: AnswerData) => {
    commentDialog.value = false
    complementRet(ret)
    if (commentAnswerType.value === AnswerType.comment) {
      questionStore.filed.questionCommentList.unshift(ret)
    } else if (commentAnswerType.value === AnswerType.answer_comment) {
      answerStore.dataList[commentAnswerIndex.value].childQaAnswers.unshift(ret)
    }

    replyCommentText.value = ''
  }
  answerStore.answerOrCommentQuestion(
    {
      mdText: replyCommentText.value,
      parentAnswerId: commentParentAnswerId.value,
      questionId: questionId,
      answerType: commentAnswerType.value,
      replyUserAnswerId: commentCommentId.value, //todo name
      replyUserId: commentUser.value.id,
    },
    handle
  )
}

const commentAnswer = (index, answerId, isActive) => {
  clog('commentAnswer')
  const handle = (ret: AnswerData) => {
    complementRet(ret)
    answerStore.dataList[index].childQaAnswers.unshift(ret)
    isActive.value = false
    replyCommentText.value = ''
  }
  answerStore.answerOrCommentQuestion(
    {
      mdText: replyCommentText.value,
      parentAnswerId: answerId,
      questionId: questionId,
      answerType: AnswerType.answer_comment,
    },
    handle
  )
}
const answerQuestion = () => {
  const handle = (ret: AnswerData) => {
    complementRet(ret)
    ret.childQaAnswers = []
    answerStore.dataList.push(ret)
    content.value = ''
  }
  answerStore.answerOrCommentQuestion(
    {
      parentAnswerId: '0',
      questionId: questionId,
      answerType: AnswerType.answer,
      // replyUserAnswerId: ,
      // replyUserId: '',
      mdText: content.value,
    },
    handle
  )
}

const complementRet = (ret: AnswerData) => {
  ret.user.userInfo = userStore.userInfo
  ret.user.id = userStore.user.id
  ret.user.nickname = userStore.user.nickname
  clog('ret.user', ret.user)
}
</script>

<style scoped>
:deep(.markdown-body pre code ul li:before) {
  counter-increment: linenumber;
  content: counter(linenumber);
  margin-left: -20px;
  margin-right: 14px;
  color: v-bind('theme.global.name.value === "dark" ? "#9b9b9b" : "#626262"') !important;
}

:deep(.markdown-body pre code ul) {
  list-style-type: none;
  counter-reset: linenumber;
}

:deep(.markdown-body pre code ul li) {
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
</style>

<style scoped>
.d-answer-tip-card {
  font-size: 18px;
  border: 2px solid #1aad19;
  border-radius: 10px;
  padding: 15px;
}

.d-answer-tip-recommend {
  list-style: none;
}

.d-answer-tip-inappropriate {
  list-style: none;
}

.d-answer-tip-recommend p:before {
  content: '\F012C';
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "#41b883" : "#00c13c"') !important;
  font-weight: bold;
  margin-right: 3px;
}

.d-answer-tip-inappropriate p:before {
  content: '\F0156';
  font-size: 135%;
  color: red;
  font-weight: bold;
  margin-right: 3px;
}

.d-answer-tip-comment p:before {
  content: '\F064E';
  font-size: 135%;
  color: #40c4ff;
  font-weight: bold;
  margin-right: 5px;
}

:deep(.d-tip-error) {
  /*background: #fcf1f1 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#351212" : "#fcf1f1"') !important;
  border-left-color: red !important;
  /*color: black!important;*/
}

:deep(.d-tip-success) {
  /*background: #f0f8e5 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#09250d" : "#f0f8e5"') !important;
  border-left-color: #1aad19 !important;
  /*color: black!important;*/
}

:deep(.d-tip-warning) {
  /*background: #fcf2e9 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2c240a" : "#fcf2e9"') !important;
  border-left-color: #ec6800 !important;
  /*color: black!important;*/
}

:deep(.d-tip-info) {
  /*background: #eef6fd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#162430" : "#eef6fd"') !important;
  border-left-color: #40c4ff !important;
  /*color: black!important;*/
}

:deep(.d-tip-share) {
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

.d-markdown-tip {
  border-bottom-color: #c2185b;
  border-bottom-width: 2px;
  border-bottom-style: dotted;
}
</style>

<style>
.d-question-aside {
  position: sticky;
  top: 17%;
}

.d-answer-aside {
  position: sticky;
  top: 12%;
}
</style>
