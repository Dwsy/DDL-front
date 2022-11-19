<template>
  <client-only>
    <div style="height: 90%">
      <div style="height: 80%">
        <v-divider class="mb-4 "></v-divider>
        <v-row class="">
          <v-col cols="5" offset="5" class="mr-n4 ">
        <span style="font-weight: bold;font-size: 21px">
        {{ chatsStore.chatUserNickname }}</span>
          </v-col>
          <v-col cols="2">
            <v-btn color="blue" elevation="0" class="mb-1  mx-16">
              <span style="color: white">关注</span>
            </v-btn>
          </v-col>
        </v-row>


        <v-divider class="mb-4 mt-2"></v-divider>
        <div class="lite-chatbox">
          <div v-if="loading">
            <v-row class="my-n12">
              <v-col cols="12" class="text-center">
                <span style="font-size: 20px" class="mt-16">加载中...</span>
              </v-col>
            </v-row>
          </div>
          <div v-else v-for="(i,index) in chatsStore.chatRecord" :key="i.createTime">
            <div class="tips" v-intersect.once="loadMore" v-if="index + 1 % 10 === 1">
              <!--            <span> {{ index + 1 % 10 === 1 ? dateFilter(i.createTime, 'YYYY-MM-DD hh:mm') : ''  }}</span>-->
              <span> {{ index + 1 % 10 === 1 ? dateFilter(i.createTime) : '' }}</span>
            </div>
            <!--          toUserId:{{typeof i.toUserId  }}uid:{{typeof uid }}-->
            <div v-if="i.toUserId===uid">
              <div v-if="i.status===ChatRecordStatus.WITHDRAW">
                <div class="tips">
                  <span>撤回了一条消息</span>
                </div>
              </div>
              <div v-else class="cleft cmsg" v-intersect.once="(e)=>{readMsg(e,i);i.status=ChatRecordStatus.READ}">
                <v-row class="my-n12">
                  <v-col>
                    <v-avatar size="large">
                      <v-img :src="i.chatUserAvatar"></v-img>
                    </v-avatar>
                    <div class="content markdown-body" :id="i.id" style="font-size: 18px;max-width: 100%"
                         v-html="i.content"
                         v-hljs="{addCopy:true}"
                         v-if="i.chatType===ChatType.markdown">
                    </div>
                    <span class="content" :id="i.id" style="font-size: 18px" v-html="i.content" v-else>
                  </span>
                    <span class="d-read ml-1" v-if="i.status===ChatRecordStatus.READ">已读</span>
                    <span class="d-time mt-n5 mb-3">{{ timeAgoFilter(i.createTime) }}</span>
                  </v-col>

                </v-row>
              </div>
            </div>


            <div v-else class="cright cmsg">
              <v-row class="my-n12">
                <v-col>
                  <span class="d-unRade mr-1" v-if="i.status===ChatRecordStatus.UNREAD">送达</span>
                  <span class="d-read mr-1" v-if="i.status===ChatRecordStatus.READ">已送达</span>
                  <div class="md-content markdown-body" :id="i.id" style="font-size: 18px;max-width: 100%"
                       v-html="i.content"
                       v-hljs="{addCopy:true}"
                       v-if="i.chatType===ChatType.markdown">
                  </div>
                  <span class="content" :id="i.id" style="font-size: 18px" v-html="i.content" v-else>

                </span>
                  <template v-if="i.chatType===ChatType.markdown" style="position: sticky;bottom: 4%">
                    <v-avatar size="large">
                      <v-img :src="useUserStore().userInfo.avatar"></v-img>
                    </v-avatar>
                    <span class="d-time mt-n5 mb-3">{{ timeAgoFilter(i.createTime) }}</span>
                  </template>
                  <template v-else>
                    <v-avatar size="large">
                      <v-img :src="useUserStore().userInfo.avatar"></v-img>
                    </v-avatar>
                    <span class="d-time mt-n5 mb-3">{{ timeAgoFilter(i.createTime) }}</span>
                  </template>


                </v-col>
              </v-row>
            </div>
          </div>
        </div>

      </div>

      <chat-input-box>
      </chat-input-box>
    </div>

  </client-only>
</template>

<script setup lang="ts">
import {definePageMeta, isNumber} from '#imports'
import {defaultMsg, errorMsg, warningMsg} from '~/composables/utils/toastification'
import {useChatsStore, ChatRecordStatus, ChatType} from '~/stores/messages/chatsStore'
import {nextTick, onMounted, onUnmounted, onUpdated, ref, watch} from 'vue'
import {useRoute} from '#app'
import {useHead} from '#head'
import {useUserStore} from '~/stores/user'
import {dateFilter} from '#imports'
import {useTheme} from 'vuetify'
import ChatInputBox from '~/components/messages/chatInputBox.vue'
import {timeAgoFilter} from '~~/composables/useTools'
import mediumZoom from 'medium-zoom'

const theme = useTheme()
definePageMeta({
  keepalive: false,
  // pageTransition: AbstractRange
})
// definePageMeta({
//   pageTransition: {
//     mode: 'out-in'
//   },
// })
useHead({
  title: '私信列表:',
  // link: [
  //   {rel: 'stylesheet', href: 'https://lab.morfans.cn/LiteWebChat_Frame/litewebchat.min.css'}
  // ]
})
const route = useRoute()

const chatsStore = useChatsStore()

const uid = ref('')

const loading = ref(true)

const toBubbleColor = ref({
  back: '#f0f0f0',
  font: '#000000'
})

const formBubbleColor = ref({
  back: '#f1a6c0',
  font: '#ffffff'
})

definePageMeta({
  keepalive: false
})
onMounted(async () => {
  //todo css统一管理
  if (theme.global.name.value == 'dark') {
    toBubbleColor.value = {
      back: '#303030',
      font: '#ffffff'
    }
    formBubbleColor.value = {
      back: '#430053',
      font: '#ffffff'
    }
  }
  watch(theme.global.name, (val) => {
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

  let user = useUserStore()
  //todo 拦截器
  if (user.token === '') {
    warningMsg('请先登录')
    return
  }
  uid.value = user.user.id
  let userId = String(route.params.userId)
  chatsStore.chatRecord = []
  if (isNumber(userId)) {
    await chatsStore.pullLastMessage(true, userId)
    loading.value = false
    document.title = '私信:' + chatsStore.chatRecord[0].chatUserNickname
    chatsStore.load = false
    await chatsStore.scrollBottom()
    setTimeout(() => {
      let chatbox = document.querySelector('.lite-chatbox')
      chatbox.scrollTop = chatbox.scrollHeight //当前div的滚轮始终保持最下面
      mediumZoomFn()
    }, 500)

  } else {
    errorMsg('路径错误')
  }
  watch(chatsStore.chatRecord, (val) => {
    setTimeout(() => {
      mediumZoomFn()
    }, 500)
  })
  // chatsStore.connectWsChannel()
})
onMounted(() => {
  console.log('window onMounted')
  chatsStore.totalPages = 1
  chatsStore.chatRecord = []
  chatsStore.load = true
})
const loadMore = async (entries) => {
  if (!chatsStore.load) {
    await chatsStore.pullLastMessage(false)
  }
  mediumZoomFn()
}

const readMsg = async (e, msg) => {
  if (e) {
    if (msg.status === ChatRecordStatus.UNREAD) {
      await chatsStore.readMsg(msg.id)
    }
  }
}
onMounted(() => {

})
const alreadyMediumZoomChatIdList = ref<string[]>([])
const mediumZoomFn = () => {
  const imgNodes: NodeListOf<HTMLImageElement> = document
      .querySelector('.lite-chatbox')
      .querySelectorAll('.d-chat-img')
  imgNodes.forEach((imgNode) => {

    if (!alreadyMediumZoomChatIdList.value.includes(imgNode.parentElement.id)) {
      alreadyMediumZoomChatIdList.value.push(imgNode.parentElement.id)
      mediumZoom(imgNode, {
        background: 'rgba(0,0,0,0.8)'
      })
      console.log('mediumZoom:', imgNode.parentElement.id)
    }
  })
  // mediumZoom(imgNodes, {
  //   margin: 24,
  //   background: 'rgba(0,0,0,0.4)',
  //   scrollOffset: 0,
  // })
}
</script>

<style scoped>
@import "assets/css/pkg.css";

.d-chats-box-head {

  line-height: 2;
  margin: auto;
  border-radius: 5px;
  background: rgba(255, 255, 255, .3);
  box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
  overflow: hidden;

}


/*.box {*/
/*  height: 100%;*/
/*}*/

.md-content {
  display: inline-block;
  /*border: 1px solid rgb(246, 245, 247) !important;*/
  /*position: relative;*/
  /*line-height: 1.75;*/
  /*width: auto;*/
  text-align: start;
  /*margin: 0 !important;*/
  /*background: v-bind('toBubbleColor.back') !important;*/
  color: v-bind('toBubbleColor.font') !important;
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

.d-unRade {
  color: #e9546b;
  font-size: 12px;
  line-height: 18px;
}

.d-read {
  color: #8b8b8b;
  font-size: 12px;
  line-height: 18px;
}


.lite-chatbox::-webkit-scrollbar {
  width: 5px;
  height: 6px;
}

.lite-chatbox {
  max-height: 540px;
  height: 540px;
  line-height: 95px;
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

<style scoped>
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
</style>