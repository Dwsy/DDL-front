<template>
  <v-container>
    <div>
      <!--      userInfo: {{ userInfo }}-->
      {{ route.query.tab }}
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
              <v-window-item value="dynamic"> dynamic </v-window-item>

              <v-window-item value="article">
                <!--                <List v-for="data in listContent " v-bind="data" :key="data.id"></List>-->
                <article-index-list
                  v-for="articleFieldData in userArticleList"
                  :key="articleFieldData.id"
                  v-bind="articleFieldData"
                ></article-index-list>
              </v-window-item>

              <v-window-item value="thumb">
                thumb
                {{ userThumbList }}
              </v-window-item>

              <v-window-item value="question"> question </v-window-item>

              <v-window-item value="answer">
                answer
                <!--                <test></test>-->
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
                          following
                          {{ userFollowingList }}
                        </v-window-item>

                        <v-window-item value="follower">
                          follower
                          {{ UserFollowerList }}
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
            <span class="text-h6">关注了：1|</span>
            <span class="text-h6">关注者：2</span>
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
import { dateFilter, timeAgoFilter, useRoute } from '#imports'
import { user, UserInfo, useUserStore } from '~/stores/user'
import { onMounted, ref, watch, watchEffect } from 'vue'
import {
  useAxiosGetArticleListByUserId,
  useAxiosGetUserInfoByUid,
  UserActiveType,
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
const userThumbList = ref<articleListData[]>()
const userFollowingList = ref()
const UserFollowerList = ref()

onMounted(async () => {
  console.log('user id onMounted')
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
    // console.log('watch tab', newTab)
    await router.push({
      query: {
        tab: newTab,
      },
    })
  })

  watchEffect(async () => {
    console.log('watchEffect', tab.value)
    const newTab = tab.value

    if (newTab === 'article') {
      const { data: axiosResponse } = await useAxiosGetArticleListByUserId(Number(uid))
      if (axiosResponse.code === 0) {
        userArticleList.value = axiosResponse.data.content
      }
    }
    if (newTab === 'dynamic') {
      console.log('dynamic')
    }
    if (newTab === 'thumb') {
      // let params = {}
      const { data: response } = await userAxiosGetUserThumbActiveListByUserId(Number(uid), {
        type: UserActiveType.UP_Article,
      })
      if (response.code === 0) {
        console.log(response.data)
        userThumbList.value = response.data.content
      }
      console.log('thumb')
    }
    if (newTab === 'question') {
      console.log('question')
    }
    if (newTab === 'answer') {
      console.log('answer')
    }
    if (newTab === 'collect') {
      console.log('collect')
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

      // console.log('follow')
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
</script>

<style scoped></style>
