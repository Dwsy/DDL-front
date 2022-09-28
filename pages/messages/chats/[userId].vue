<template>
  <div style="height: 100%">
    <div style="height: 70%">
      <v-divider class="mb-4 "></v-divider>
      <v-row>
        <v-col cols="5" offset="5" class="mr-n4">
        <span style="font-weight: bold;font-size: 21px">
        {{ chatsStore.chatUserNickname }}</span>
        </v-col>
        <v-col cols="2">
          <v-btn color="blue" elevation="0" class="mb-1 mx-16">
            <span style="color: white">关注</span>
          </v-btn>
        </v-col>
      </v-row>


      <v-divider class="mb-4 mt-2"></v-divider>
      <div class="lite-chatbox" v-if="chatsStore.chatRecord">
        <div v-for="(i,index) in chatsStore.chatRecord" :key="i.createTime">
          index:{{ index }}
          <div class="tips" v-intersect.once="loadMore" v-if="index + 1 % 10 === 1">
            <span> {{ index + 1 % 10 === 1 ? dateFilter(i.createTime, 'YYYY-MM-DD hh:mm') : '' }}</span>
          </div>

          <div v-if="i.toUserId===uid" class="cleft cmsg">
            <v-row class="my-n16">
              <v-col>
                <v-avatar size="large">
                  <v-img :src="i.chatUserAvatar"></v-img>
                </v-avatar>
                <span class="content" style="font-size: 18px" v-html="i.content"></span>
                <span class="d-time mt-n5">{{ dateFilter(i.createTime, 'hh:mm:ss') }}</span>
              </v-col>
            </v-row>
          </div>

          <div v-else class="cright cmsg">
            <v-row>
              <v-col>
                <span class="content" style="font-size: 18px" v-html="i.content"></span>
                <v-avatar size="large">
                  <v-img :src="useUser().userInfo.avatar"></v-img>
                </v-avatar>
                <span class="d-time mt-n5">{{ dateFilter(i.createTime, 'hh:mm:ss') }}</span>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
      <div v-else>
        <v-row class="my-n12">
          <v-col cols="12" class="text-center">
            <span style="font-size: 18px">加载中...</span>
          </v-col>
        </v-row>
      </div>
    </div>

    <chat-input-box>
    </chat-input-box>
  </div>

</template>

<script setup lang="ts">
import {defaultMsg, definePageMeta, errorMsg, isNumber} from '#imports'
import {useChatsStore} from '~/stores/messages/chatsStore'
import {nextTick, onMounted, ref, watch} from 'vue'
import {useRoute} from '#app'
import {useHead} from '#head'
import {useUser} from '~/stores/user'

import {dateFilter} from '#imports'
import {useTheme} from 'vuetify'
import ChatInputBox from '~/components/messages/chatInputBox.vue'
import {GetHistoryMessageParam} from '~/composables/Api/messages/chats'
// definePageMeta({
//   keepalive:true,
//   // pageTransition: AbstractRange
// })
useHead({
  title: '私信列表:',
  link: [
    {rel: 'stylesheet', href: 'https://lab.morfans.cn/LiteWebChat_Frame/litewebchat.min.css'}
  ]
})
const route = useRoute()

const chatsStore = useChatsStore()

const uid = ref(0)
const toBubbleColor = ref({
  back: '#f0f0f0',
  font: '#000000'
})

const formBubbleColor = ref({
  back: '#f1a6c0',
  font: '#ffffff'
})

// definePageMeta({
//   keepalive: true
// })
onMounted(async () => {
  //todo css统一管理
  if (useTheme().global.name.value == 'dark') {
    toBubbleColor.value = {
      back: '#303030',
      font: '#ffffff'
    }
    formBubbleColor.value = {
      back: '#430053',
      font: '#ffffff'
    }
  }

  watch(useTheme().global.name, (val) => {
    if (val === 'dark') {
      toBubbleColor.value = {
        back: '#303030',
        font: '#ffffff'
      }
      formBubbleColor.value = {
        back: '#430053',
        font: '#ffffff'
      }
    } else {
      toBubbleColor.value = {
        back: '#f0f0f0',
        font: '#000000'
      }
      formBubbleColor.value = {
        back: '#f1a6c0',
        font: '#ffffff'
      }
    }
  })
  let user = useUser()
  uid.value = user.user.id
  let userId = route.params.userId
  chatsStore.chatRecord = undefined
  if (isNumber(userId)) {
    await chatsStore.pullLastMessage(userId)
  } else {
    errorMsg('路径错误')
  }
  await chatsStore.scrollBottom()
  document.title = '私信列表:' + chatsStore.chatRecord[0].chatUserNickname
})

const loadMore = async (entries) => {
  await chatsStore.pullLastMessage()
  console.log('loadMore', entries)
}

</script>

<style>
.box {
  height: 100%;
}

.lite-chatbox .cleft .content {
  max-width: 45%;
  width: auto;
  margin: 0 !important;
  background: v-bind('toBubbleColor.back') !important;
  color: v-bind('toBubbleColor.font') !important;
}

.lite-chatbox .cright .content {
  max-width: 45%;
  width: auto;
  margin: 0 !important;
  background: v-bind('formBubbleColor.back') !important;
  color: v-bind('formBubbleColor.font') !important;
}

.d-time {
  color: #8b8b8b;
  font-size: 10px;
  display: block;
  line-height: 18px;
}


.lite-chatbox::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}

.lite-chatbox {
  max-height: 600px;
  height: 100%;
  line-height: 100px;
  overflow: auto;
  overflow-x: hidden;
}

.lite-chatbox .content a {
  color: #2a77ff;
}

.lite-chatbox .tips span {
  font-size: 16px;
  display: inline !important;
}

</style>
