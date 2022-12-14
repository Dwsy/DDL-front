<template>
  <client-only>
    <v-container fluid id="message" class="d-messages-box" style="">
      <v-row class="box">
        <!--      style="height: calc(100% - 66px)"-->

        <v-col class="d-messages-aside" cols="2">
          <v-list>
            <v-card-title>消息中心</v-card-title>
            <template v-for="(item, i) in items" :key="i">
              <template v-if="item.subtitle">
                <v-list-subheader> {{ item.text }}消息</v-list-subheader>
                <v-divider class="mr-10 ml-3"></v-divider>
              </template>

              <v-list-item
                v-else
                :value="item"
                :to="item.to"
                active-color="primary"
                rounded="xl"
                @click="changeTitle(item.text)"
              >
                <template v-slot:prepend>
                  <v-badge
                    :content="item.unreadCount"
                    :model-value="!!item.unreadCount"
                    color="red"
                    class="mr-3"
                    :floating="true"
                  >
                    <v-icon :icon="item.icon"></v-icon>
                  </v-badge>
                </template>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item>
            </template>
          </v-list>
        </v-col>

        <v-divider :vertical="true"></v-divider>
        <v-col xl="9" lg="9" md="10" sm="9" xs="12" cols="10" class="d-messages-child">
          <NuxtPage />
        </v-col>
        <!--      <v-col cols="1">-->
        <!--        3-->
        <!--      </v-col>-->
      </v-row>
    </v-container>
  </client-only>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { inject, onMounted, onUnmounted, provide, reactive, ref } from 'vue'
import { definePageMeta } from '#imports'
import { warningMsg } from '~/composables/utils/toastification'
import { useLayout } from '~/stores/layout'
import { CountType, unreadNotifyI, useAxiosGetUnreadMessageCount } from '~/composables/Api/messages'
import { onBeforeRouteLeave } from 'vue-router'

definePageMeta({
  keepalive: false,
  // pageTransition: {
  //   name: 'slide-x-reverse-transition',
  //   mode: 'in-out',
  // },
  key: 'messages',
})
const unReadCount = ref<unreadNotifyI>()
// const chatsStore = useChatsStore()
const layout = useLayout()

interface items {
  text?: string
  icon?: string
  to?: string
  unreadCount?: number
  subtitle?: boolean
}

let items = ref<items[]>([
  {
    text: '文章',
    subtitle: true,
  },
  {
    text: '回复我的',
    icon: 'mdi-reply',
    to: '/messages/article/reply',
    unreadCount: null,
  },
  {
    text: '受到的赞',
    icon: 'mdi-thumb-up-outline',
    to: '/messages/article/thumb',
    unreadCount: null,
  },
  {
    text: '问答',
    subtitle: true,
  },
  {
    text: '问题回答',
    icon: 'mdi-chat-question-outline',
    to: '/messages/qa/answer',
    unreadCount: null,
  },
  {
    text: '问答回复',
    icon: 'mdi-lightbulb-question-outline',
    to: '/messages/qa/comment',
    unreadCount: null,
  },
  {
    text: '问答支持',
    icon: 'mdi-triangle-outline',
    to: '/messages/qa/support',
    unreadCount: null,
  },
  {
    text: '被采纳',
    icon: 'mdi-human-greeting-variant',
    to: '/messages/qa/accepted',
    unreadCount: null,
  },
  {
    text: '跟踪问题',
    icon: 'mdi-eye',
    to: '/messages/qa/watch',
    unreadCount: null,
  },
  {
    text: '邀请回答',
    icon: 'mdi-human-greeting-variant',
    to: '/messages/qa/invitation',
    unreadCount: null,
  },
  {
    text: '圈子',
    subtitle: true,
  },
  {
    text: '受到的赞',
    icon: 'mdi-human-greeting-variant',
    to: '/messages/infinity/thumb',
    unreadCount: null,
  },
  {
    text: '受到的回复',
    icon: 'mdi-human-greeting-variant',
    to: '/messages/infinity/reply',
    unreadCount: null,
  },
  {
    text: '其他',
    subtitle: true,
  },
  {
    text: '系统通知',
    icon: 'mdi-message-cog-outline',
    to: '/messages/notifications',
    unreadCount: null,
  },
  {
    text: '私信列表',
    icon: 'mdi-message-badge-outline',
    to: '/messages/chats',
    unreadCount: null,
  },
  {
    text: ' @ 我的',
    icon: 'mdi-at',
    to: '/messages/at',
    unreadCount: null,
  },
])
onMounted(async () => {
  layout.showFooter = false
  // clog('11Messsage mounted')

  const { data: axiosResponse } = await useAxiosGetUnreadMessageCount(CountType.Detail)

  if (axiosResponse.code == 0) {
    const unreadNotify = axiosResponse.data

    provide('unreadNotify', unreadNotify)
    //article
    items.value[1].unreadCount = unreadNotify.unreadNotifyReplyCommentCount || 0
    items.value[2].unreadCount = unreadNotify.unreadNotifyArticleOrCommentThumbCount || 0
    //qa
    items.value[4].unreadCount = unreadNotify.unreadNotifyAnswerCount || 0
    items.value[5].unreadCount =
      unreadNotify.unreadNotifyAnswerCommentCount + unreadNotify.unreadNotifyQuestionCommentCount ||
      0
    items.value[6].unreadCount = unreadNotify.unreadNotifyQuestionOrAnswerThumbCount || 0
    items.value[7].unreadCount = unreadNotify.unreadAcceptedAnswerCount || 0
    items.value[8].unreadCount =
      unreadNotify.unreadWatchAnswer + unreadNotify.unreadWatchAcceptedQuestionAnswer || 0
    items.value[9].unreadCount = unreadNotify.unreadInvitationAnswerCount || 0
    //infinity
    items.value[11].unreadCount = unreadNotify.unreadTweetThumb || 0
    items.value[12].unreadCount = unreadNotify.unreadTweetComment || 0
    //other
    items.value[15].unreadCount = unreadNotify.unreadPrivateMessageCount || 0
  } else {
    warningMsg('获取未读消息数量失败')
  }
})
onUnmounted(() => {
  layout.showFooter = true
})
const changeTitle = (title) => {
  document.title = '消息中：' + title
}
onBeforeRouteLeave((to, from) => {
  clog('leave')
  clog('to', to)
  clog('from', from)
  layout.getUnreadCount()
})
</script>

<style scoped>
/*.d-messages-box {*/
/*  height: 100%;*/
/*}*/

/*.d-messages-child {*/
/*  margin-left: 200px;*/
/*}*/

/*@media (min-width: 1930px) {*/
/*  .d-messages-child {*/
/*    margin-left: 250px;*/
/*  }*/
/*}*/

.d-messages-aside {
  flex: 0 0 13.7% !important;
  /*left: 300px;*/
  /*top: 8%;*/
  /*bottom: 0;*/
  /*width: 230px;*/
  /*height: 100%;*/
  /*max-width: 200px;height:90%*/
}

#message > div > div.v-col.v-col-2.d-messages-aside > div {
  position: sticky;
  top: 8%;
  /*left: 300px;*/
  /*top: 8%;*/
  /*bottom: 0;*/
  /*width: 230px;*/
  /*height: 100%;*/
  /*max-width: 200px;height:90%*/
}
</style>
