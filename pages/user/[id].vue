<template>
  <v-container>
    <div>
      <!--      userInfo: {{ userInfo }}-->
      <!--      {{ route.query.tab }}-->
      <v-divider></v-divider>
      <!--      {{ user }}-->
    </div>
    <v-row v-if="user">
      <v-col offset="1" cols="8">
        <v-card class="pa-4">
          <v-row>
            <v-col cols="2">
              <v-avatar size="150">
                <v-img :src="userInfo.avatar"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="6">
              <div class="ml-1">
                <span class="text-h4">{{ user.nickname }}</span>
                <div>Level：{{ user.level }}</div>
                <span>签名：{{ userInfo.sign }}</span>
                <div class="mt-4">UID:{{ user.id }}</div>
              </div>
            </v-col>
            <v-col>
              <div class="mx-6 mt-6 text-end">
                <v-btn v-if="userStore.user?.id === uid" to="/user/settings">
                  <div>编辑个人资料</div>
                </v-btn>
                <div v-else>
                  <v-btn v-if="!user.following" color="#42a5f5" @click="subscribe(user)">
                    <div style="color: white">关注</div>
                  </v-btn>
                  <v-btn v-else @click="unSubscribe(user)">
                    <div>取消关注</div>
                  </v-btn>
                  <v-btn
                    target="_blank"
                    :href="`/messages/chats/${user.id}`"
                    class="ml-2"
                    color="red"
                    variant="tonal"
                  >
                    私信
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card>
        <v-divider class="my-2"></v-divider>

        <v-card class="mt-1">
          <v-tabs v-model="tab" background-color="primary">
            <v-tab value="dynamic">动态</v-tab>
            <v-tab value="article">文章</v-tab>
            <v-tab value="thumb">点赞</v-tab>
            <v-tab value="question">问题</v-tab>
            <v-tab value="answer">回答</v-tab>
            <v-tab value="collect">收藏</v-tab>
            <v-tab value="follow">关注</v-tab>
          </v-tabs>
          <!--//todo double/mounted-->
          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="dynamic">
                <div
                  v-for="tweet in InfinityList"
                  @click.stop="navigateToTweet(tweet)"
                  class="cursor-pointer border-b"
                >
                  <div v-if="tweet.type === 2" class="ml-2 mt-1">
                    Reply:{{ tweet.parentTweetId }}
                  </div>
                  <TcomponentsTweetItem :tweet="tweet" compact></TcomponentsTweetItem>
                  <v-divider></v-divider>
                </div>
              </v-window-item>

              <v-window-item value="article">
                <!--                <List v-for="data in listContent " v-bind="data" :key="data.id"></List>-->
                <article-index-list
                  v-for="articleFieldData in userArticleList"
                  :key="articleFieldData.id"
                  v-bind="articleFieldData"
                ></article-index-list>
              </v-window-item>

              <v-window-item value="thumb">
                <v-tabs v-model="thumbType" background-color="primary">
                  <v-tab :value="UserActiveTypeEn.UP_Article">文章</v-tab>
                  <v-tab :value="UserActiveTypeEn.Thumb_Tweet">推文</v-tab>
                  <v-tab :value="UserActiveTypeEn.UP_Question_Answer">回答</v-tab>
                  <v-tab :value="UserActiveTypeEn.UP_Question">问题</v-tab>
                </v-tabs>
                <UserThumbCardList :user-thumb-active-list="userThumbList"></UserThumbCardList>
              </v-window-item>

              <v-window-item value="question">
                <QuestionAsked></QuestionAsked>
              </v-window-item>

              <v-window-item value="answer">
                <div v-for="answer in userAnswerList">
                  <v-card class="pa-4">
                    <p class="text-zinc-500 text-sm">
                      回答了问题 <span v-if="answer.accepted" class="text-green-500">被采纳</span>
                    </p>

                    <nuxt-link
                      target="_blank"
                      :href="`/question/${answer.questionFieldId}`"
                      class="text-lg"
                    >
                      {{ answer.questionTitle }}
                    </nuxt-link>
                    <div class="text-md">
                      <p>{{ answer.textPrue.substring(0, 70) }}</p>
                    </div>
                    <span> 回答时间{{ timeAgoFilter(answer.createTime) }} </span>
                    <v-divider></v-divider>
                  </v-card>
                </div>
              </v-window-item>

              <v-window-item value="collect">
                <Collection></Collection>
              </v-window-item>

              <v-window-item value="follow">
                <div>
                  <v-card>
                    <v-tabs v-model="followTab" background-color="primary">
                      <v-tab value="following">关注的用户</v-tab>
                      <v-tab value="follower">关注者</v-tab>
                    </v-tabs>

                    <v-card-text>
                      <v-window v-model="followTab">
                        <v-window-item value="following">
                          <v-card
                            v-for="user in userFollowingList"
                            :href="`/user/${user.id}`"
                            target="_blank"
                          >
                            <v-row class="ml-n8">
                              <v-col cols="1">
                                <v-avatar size="large" class="ml-8">
                                  <v-img :src="user.userInfo.avatar"></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="10">
                                <div>
                                  <span class="text-lg mx-1 mt-3">{{ user.nickname }}</span>
                                </div>
                                <span>Level : {{ user.level }}</span>
                                <span class="text-lg mx-1 mt-3 text-neutral-600">
                                  {{ user.userInfo.sign }}
                                </span>
                              </v-col>
                              <v-col cols="1"></v-col>
                            </v-row>
                            <v-divider class="mb-2"></v-divider>
                          </v-card>
                        </v-window-item>

                        <v-window-item value="follower">
                          <v-card
                            v-for="user in UserFollowerList"
                            :href="`/user/${user.id}`"
                            target="_blank"
                          >
                            <v-row class="ml-n8">
                              <v-col cols="1">
                                <v-avatar size="large" class="ml-8">
                                  <v-img :src="user.userInfo.avatar"></v-img>
                                </v-avatar>
                              </v-col>
                              <v-col cols="10">
                                <div>
                                  <span class="text-lg mx-1 mt-3">{{ user.nickname }}</span>
                                </div>
                                <span>Level : {{ user.level }}</span>
                                <span class="text-lg mx-1 mt-3 text-neutral-600">
                                  {{ user.userInfo.sign }}
                                </span>
                              </v-col>
                              <v-col cols="1"></v-col>
                            </v-row>
                            <v-divider class="mb-2"></v-divider>
                          </v-card>
                        </v-window-item>
                      </v-window>
                    </v-card-text>
                  </v-card>
                </div>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-row>
          <v-col offset="1" cols="11" class="pa-8">
            <!--            <span class="text-h6">关注了：1|</span>-->
            <!--            <span class="text-h6">关注者：2</span>-->
          </v-col>
          <v-col offset="1" cols="11" class="pa-8">
            <span :title="dateFilter(user.createTime)" class="text-h6"
              >{{ timeAgoFilter(user.createTime) }}加入</span
            >
          </v-col>
          <v-divider></v-divider>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-if="userNotFount">
      <v-col class="mt-16">
        <div class="text-h3 text-center">用户不存在</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import QuestionAsked from '~/components/user/questionCard/index.vue'
import { clog } from '~/utils/clog'
import { dateFilter, timeAgoFilter, useAxiosGetUserDynamic, useRoute } from '#imports'
import { user, UserInfo, useUserStore } from '~/stores/user'
import { onMounted, ref, watch, watchEffect } from 'vue'
import {
  useAxiosGetArticleListByUserId,
  useAxiosGetUserInfoByUid,
  userAxiosGetUserThumbActiveListByUserId,
} from '~/composables/Api/user'
import {
  followUser,
  unFollowUser,
  useAxiosGetFollowerList,
  useAxiosGetFollowingList,
} from '~/composables/Api/user/following'
import { articleListData } from '~/types/article'
import Collection from '~~/components/user/collection.vue'
import { useRouter } from '#app'
import { warningMsg } from '~/composables/utils/toastification'
import { userData } from '~/types/user'
import { InfinityI, InfinityType } from '~/types/infinity'
import { UserActiveTypeEn, UserThumbActiveI } from '~/types/user/active'
import {
  useAxiosGetUserQuestionPageById,
  userAxiosGetUserAnswerPageByUserId,
} from '~/composables/Api/user/qa'
import { QuestionState } from '~/types/question'
import { UserAnswerI } from '~/types/question/answer'
import A from '~/pages/messages/chats/a.vue'

const userStore = useUserStore()
let userInfo = ref<UserInfo>()
let user = ref<userData>()
const route = useRoute()
const router = useRouter()
const uid = String(route.params.id)
const userNotFount = ref(false)
const tab = ref(route.query.tab || 'dynamic')
const followTab = ref('following')
const userArticleList = ref<articleListData[]>()
const userThumbList = ref<UserThumbActiveI[]>()
const userAnswerList = ref<UserAnswerI[]>()
const thumbType = ref<UserActiveTypeEn>(UserActiveTypeEn.UP_Article)
const userFollowingList = ref<userData[]>()
const UserFollowerList = ref<userData[]>()

const InfinityList = ref<InfinityI[]>()
onMounted(async () => {
  clog('user id onMounted')
  setTimeout(async () => {
    const { data: axiosResponse } = await useAxiosGetUserInfoByUid(uid)
    if (axiosResponse.code === 0) {
      userInfo.value = axiosResponse.data.userInfo
      user.value = axiosResponse.data
    }
    if (axiosResponse.code === 103) {
      warningMsg('用户不存在')
      userNotFount.value = true
    }
  }, 200)
  watch(tab, async (newTab) => {
    // clog('watch tab', newTab)
    await router.push({
      query: {
        tab: newTab,
      },
    })
  })

  watchEffect(async () => {
    clog('watchEffect', tab.value)
    const newTab = tab.value

    if (newTab === 'article') {
      const { data: axiosResponse } = await useAxiosGetArticleListByUserId(uid)
      if (axiosResponse.code === 0) {
        userArticleList.value = axiosResponse.data.content
      }
    }
    if (newTab === 'dynamic') {
      const { data: UserDynamicR } = await useAxiosGetUserDynamic(uid, {
        order: '',
        page: 1,
        size: 10,
      })
      if (UserDynamicR.code == 0) {
        clog('UserDynamicR', UserDynamicR.data.content)
        InfinityList.value = UserDynamicR.data.content
      }
      clog('dynamic')
    }
    if (newTab === 'thumb') {
      // let params = {}
      const { data: response } = await userAxiosGetUserThumbActiveListByUserId(uid, {
        type: thumbType.value,
      })
      if (response.code === 0) {
        clog(response.data)
        userThumbList.value = response.data.content
      } else {
        warningMsg('获取点赞列表失败')
      }
      clog('thumb')
    }
    if (newTab === 'question') {
    }
    if (newTab === 'answer') {
      const { data: answerR } = await userAxiosGetUserAnswerPageByUserId(uid, {
        page: 1,
        order: '',
      })
      if (answerR.code === 0) {
        userAnswerList.value = answerR.data.content
      } else {
        warningMsg('获取回答列表失败')
      }
      clog('answer')
    }
    if (newTab === 'collect') {
      clog('collect')
    }
    if (newTab === 'follow') {
      const newFollowTab = followTab.value
      if (newFollowTab === 'following') {
        const { data: response } = await useAxiosGetFollowingList()
        if (response.code === 0) {
          userFollowingList.value = response.data.content
        } else {
          warningMsg(response.msg)
        }
      }
      if (newFollowTab === 'follower') {
        const { data: response } = await useAxiosGetFollowerList()
        if (response.code === 0) {
          UserFollowerList.value = response.data.content
        } else {
          warningMsg(response.msg)
        }
      }

      // clog('follow')
    }
  })
})

const subscribe = (user: userData) => {
  followUser(user.id)
  user.following = !user.following
}

const unSubscribe = (user: userData) => {
  unFollowUser(user.id)
  user.following = !user.following
}

const navigateToTweet = (tweet: InfinityI) => {
  navigateTo(`/infinity/status/${getTweetGotoId(tweet)}`)
}

const getTweetGotoId = (tweet: InfinityI): string => {
  switch (tweet.type) {
    case InfinityType.Tweet:
      return tweet.id
    case InfinityType.TweetCommentOrReply:
      return tweet.parentTweetId
    case InfinityType.Article:
      return tweet.id
    case InfinityType.Question:
      return tweet.id
    case InfinityType.Answer:
      return tweet.id
  }
}
</script>

<style scoped></style>
