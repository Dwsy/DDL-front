<template>
  <div>

    <div class="lite-chatbox">

      <div v-for="i in chatsStore.chatRecord">
        <div v-if="i.toUserId===uid" class="cleft cmsg">
          <v-row>
            <v-col>
              <v-avatar size="large">
                <v-img :src="i.chatUserAvatar"></v-img>
              </v-avatar>
              <span class="content" style="font-size: 18px">{{ i.content }}</span>
              <span class="d-time">{{ dateFilter(i.createTime, 'hh:mm:ss') }}</span>
            </v-col>
          </v-row>
        </div>

        <div v-else class="cright cmsg">
          <v-row>
            <v-col>
              <v-avatar size="large">
                <v-img :src="i.chatUserAvatar"></v-img>
              </v-avatar>
              <span class="content" style="font-size: 18px">{{ i.content }}</span>
              <span class="d-time">{{ dateFilter(i.createTime, 'hh:mm:ss') }}</span>
            </v-col>
          </v-row>
        </div>
      </div>


    </div>
  </div>
</template>

<script setup lang="ts">
import {defaultMsg, definePageMeta, errorMsg, isNumber} from '#imports'
import {useChatsStore} from '~/stores/messages/chatsStore'
import {onMounted, ref} from 'vue'
import {useRoute} from '#app'
import {useHead} from '#head'
import {useUser} from '~/stores/user'

import {dateFilter} from '#imports'
// definePageMeta({
//   keepalive:true,
//   // pageTransition: AbstractRange
// })
useHead({
  title: '私信列表',
  link: [
    {rel: 'stylesheet', href: 'https://lab.morfans.cn/LiteWebChat_Frame/litewebchat.min.css'}
  ]
})
const route = useRoute()

const chatsStore = useChatsStore()

let uid = ref(0)

definePageMeta({
  keepalive: true
})
onMounted(async () => {
  let user = useUser()
  uid.value = user.user.id
  let userId = route.params.userId
  if (isNumber(userId)) {
    await chatsStore.pullHistoryMessage(userId)
  } else {
    errorMsg('路径错误')
  }
})

</script>

<style scoped>

.lite-chatbox .cleft .content {
  margin: 0 !important;
}

.lite-chatbox .cright .content {
  margin: 0 !important;
}

.d-time {
  color: #8b8b8b;
  font-size: 10px;
  display: block;
  line-height: 18px;
}

</style>