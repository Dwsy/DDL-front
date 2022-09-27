<template>
  <keep-alive>
    <div>
      <v-row class="mt-6">
        <v-col cols="3">
          <v-list density="compact">
            <!--          <v-list-subheader>消息中心</v-list-subheader>-->
            <v-list-item
                v-for="(item, i) in chatsStore.chatsList"
                :key="item.id"
                :value="item"
                :to="`/messages/chats/${item.chatUserId}`"
                active-color="pink"
                rounded="xl"
            >
              <template v-slot:prepend>
                <v-avatar size="x-large">
                  <v-img :src="item.chatUserAvatar"></v-img>
                </v-avatar>
              </template>
              <v-list-item-subtitle v-text="item.chatUserNickname"></v-list-item-subtitle>
              <v-list-item-title v-text="item.content"></v-list-item-title>
            </v-list-item>
          </v-list>

        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <keep-alive>
            <NuxtPage :key="$route.fullPath"/>
          </keep-alive>
        </v-col>
        <v-divider vertical></v-divider>
        <!--        <v-col cols="1">-->
        <!--          3-->
        <!--        </v-col>-->
      </v-row>
    </div>
  </keep-alive>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted} from 'vue'
import {useChatsStore} from '~/stores/messages/chatsStore'
import {definePageMeta} from '#imports'
import {useHead} from '#head'

useHead({
  title: '私信列表',
  link: [
    {rel: 'stylesheet', href: 'https://lab.morfans.cn/LiteWebChat_Frame/litewebchat.min.css'}
  ]
})
definePageMeta({
  keepalive: true
})
const chatsStore = useChatsStore()
onMounted(async () => {
  console.log('onMounted')
  await chatsStore.loadChatsList()
})

onUnmounted(() => {
  console.log('onUnmounted')
})


</script>

<style>

</style>