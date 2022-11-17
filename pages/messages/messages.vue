<template>

  <v-container fluid id="message" class="d-messages-box" style="">
    <v-row class="box">
      <!--      style="height: calc(100% - 66px)"-->
      <v-divider></v-divider>
      <v-col cols="2" class="d-messages-aside ml-n5 mr-2">

        <v-list>
          <v-list-subheader>消息中心</v-list-subheader>
          <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              :to="item.to"
              active-color="primary"
              rounded="xl"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>

      </v-col>

      <v-divider :vertical="true"></v-divider>
      <v-col xl="9" lg="9" md="10" sm="9" xs="12">
        <NuxtPage :key="$route.fullPath"/>
      </v-col>
      <v-col cols="1">
        3
      </v-col>
    </v-row>
  </v-container>


</template>

<script setup lang="ts">

import {useChatsStore} from '~/stores/messages/chatsStore'
import {onMounted, onUnmounted} from 'vue'
import {definePageMeta} from '#imports'
import {useLayout} from '~/stores/layout'


const chatsStore = useChatsStore()
const layout = useLayout()
let items = [
  {text: '回复我的', icon: 'mdi-reply', to: '/messages/reply'},
  {text: ' @ 我的', icon: 'mdi-at', to: '/messages/at'},
  {text: '受到的赞', icon: 'mdi-thumb-up-outline', to: '/messages/thumb'},
  {text: '系统通知', icon: 'mdi-message-cog-outline', to: '/messages/notifications'},
  {text: '私信列表', icon: 'mdi-message-badge-outline', to: '/messages/chats'},
]

onMounted(() => {
  layout.showFooter = false
  // console.log('11Messsage mounted')
})
onUnmounted(() => {
  layout.showFooter = true
})

</script>

<style>
/*.d-messages-box {*/
/*  height: 100%;*/
/*}*/

.d-messages-aside {
  /*left: 5%;*/
  /*!*z-index: 1004;*!*/
  /*!*transform: translateX(0%);*!*/
  /*position: fixed;*/
  /*!*height: calc((100% - 48px) - 0px);*!*/
  /*top: 7.5%;*/
  /*bottom: 0;*/
  /*width: 15%;*/
  /*max-width: 200px;*/
  /*height: 90%*/
}


</style>