<template>
  <div id="thumb-window">
    <v-row class="ml-5">
      <v-col>
        <div class="text-start ">
          <v-btn icon elevation="0" @click="replyStore.loadReplyNotifyList()">
            <v-icon>
              mdi-refresh
            </v-icon>
          </v-btn>
        </div>
        <v-list>
          <v-list-item
              v-for="(item, i) in replyStore.replyNotifyList"
              :key="item.id"
              :value="item"
              :src="replyStore.getGoToLink(item)"
              active-color="pink"
              rounded="xl"
              :to="replyStore.getGoToLink(item)"
          >
            <!--            :href="replyStore.getGoToLink(item)"-->
            <!--            target="_blank"-->
            <template v-slot:prepend>
              <!--              <v-badge color="red"-->
              <!--                       :model-value="chatsStore.chatWsMsgUnreadNum.get(item.chatUserId)> 0"-->
              <!--                       :content="chatsStore.chatWsMsgUnreadNum.get(item.chatUserId)">-->
              <v-avatar size="x-large">
                <v-img :src="item.formUserAvatar"></v-img>
              </v-avatar>
              <!--              </v-badge>-->
            </template>

            <v-list-item-title v-text="item.formUserNickname"></v-list-item-title>
            <!--            <v-list-item-subtitle v-text="item.toContent"></v-list-item-subtitle>-->
            <div>
              <span class="text-grey">
                {{ NotifyType[item.notifyType] }}
              </span>
              {{ item.toContent }}
              <div>
                {{ item.formContent }}
              </div>
            </div>
            <v-divider></v-divider>


          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {definePageMeta} from '#imports'
import {onMounted} from 'vue'
import {useReplyStore, NotifyType} from '~/stores/reply/replyStrore'

definePageMeta({
  keepalive: true,
})

let replyStore = useReplyStore()

onMounted(async () => {
  await replyStore.loadReplyNotifyList()
})
</script>

<style>

</style>