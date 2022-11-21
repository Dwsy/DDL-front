<template>
  <div id="chats-window">
    <v-row style="height: 100%">
      <v-col cols="3">
        <v-list>
          <v-list-item
            v-for="(item, i) in chatsStore.chatsList"
            :key="item.id"
            :to="`/messages/chats/${item.chatUserId}`"
            :value="item"
            active-color="pink"
            rounded="xl"
          >
            <template v-slot:prepend>
              <v-badge
                :content="chatsStore.chatMsgUnreadNum.get(item.chatUserId)"
                :model-value="
                  chatsStore.chatMsgUnreadNum.get(item.chatUserId) > 0
                "
                color="red"
              >
                <v-avatar size="x-large">
                  <v-img :src="item.chatUserAvatar"></v-img>
                </v-avatar>
              </v-badge>
            </template>
            <v-list-item-subtitle
              class="ml-1"
              v-text="item.chatUserNickname"
            ></v-list-item-subtitle>
            <v-list-item-title
              class="ml-1"
              v-text="item.content"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
        <div class="text-end">
          <v-btn
            elevation="0"
            icon
            size="small"
            @click="chatsStore.loadChatsList()"
          >
            <v-icon> mdi-refresh </v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-divider :vertical="true"></v-divider>
      <v-col cols="9">
        <NuxtPage />
      </v-col>
      <v-divider :vertical="true"></v-divider>
      <!--        <v-col cols="1">-->
      <!--          3-->
      <!--        </v-col>-->
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useChatsStore } from "~/stores/messages/chatsStore";
import { definePageMeta } from "#imports";
import { useHead } from "#head";

definePageMeta({
  key: "chats",
  keepalive: false,
  pageTransition: false,
});
useHead({
  title: "私信列表",
  link: [
    {
      rel: "stylesheet",
      href: "https://lab.morfans.cn/LiteWebChat_Frame/litewebchat.min.css",
    },
  ],
});

const chatsStore = useChatsStore();
onMounted(async () => {
  console.log("chatsStore onMounted");
  await chatsStore.loadChatsList();
});

onUnmounted(() => {
  console.log("onUnmounted");
});
</script>

<style>
#chats-window {
  /*max-height: 800px;*/
  max-height: calc(100vh - 10rem);
}

@media (min-width: 2300px) {
  #chats-window {
    /*max-height: 800px;*/
    max-height: calc(100vh - 5rem) !important;
  }
}
</style>
