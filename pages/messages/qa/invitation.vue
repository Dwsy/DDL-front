<template>
  <div id="reply-window">
    <v-row class="">
      <v-col>
        <!--        <div class="text-start ">-->
        <!--          <v-btn icon elevation="0" @click="qaInvitationAnswerStore.loadQaAnswerNotifyList()">-->
        <!--            <v-icon>-->
        <!--              mdi-refresh-->
        <!--            </v-icon>-->
        <!--          </v-btn>-->
        <!--        </div>-->
        <v-list>
          <v-list-item
            v-for="(item, i) in qaInvitationAnswerStore.qaInvitationAnswerNotifyList"
            :key="item.id"
            :href="qaInvitationAnswerStore.getGoToLink(item)"
            :value="item"
            active-color="pink"
            rounded="xl"
            target="_blank"
          >
            <!--            :href="qaInvitationAnswerStore.getGoToLink(item)"-->
            <!--            target="_blank"-->
            <template v-slot:prepend>
              <v-badge
                :dot="true"
                :model-value="item.notifyState === NotifyState.UNREAD"
                class="mr-3"
                color="red"
              >
                <v-avatar size="x-large">
                  <v-img :src="item.formUserAvatar"></v-img>
                </v-avatar>
              </v-badge>
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
            <span>{{ timeAgoFilter(item.createTime) }}</span>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta, dateFilter, timeAgoFilter } from '#imports'
import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'
import { useLoadingWin } from '~/composables/useTools'
import { NotifyState, NotifyType } from '~/types/message'
import { useQaInvitationAnswerStore } from '~/stores/messages/questionAnswer/qaInvitationAnswerStore'

definePageMeta({
  keepalive: false,
})

let qaInvitationAnswerStore = useQaInvitationAnswerStore()
onMounted(async () => {
  console.log('reply mounted')
  document.documentElement.scrollTop = 0
  await qaInvitationAnswerStore.loadQaInvitationAnswerNotifyList()
  // document.body.onscroll =  useLoadingWin(loadingMore)
  document.body.onscroll = useLoadingWin(loadingMore)
})
onUnmounted(() => {
  qaInvitationAnswerStore.page = 1
  qaInvitationAnswerStore.totalPages = null
  // console.log('qaAnswerNotifyList unmounted')
})
// onActivated(() => {
//   console.log('qaAnswerNotifyList activated')
// })
// onDeactivated(() => {
//   console.log('qaAnswerNotifyList deactivated')
// })

const loadingMore = async () => {
  console.log(123)
  if (qaInvitationAnswerStore.page >= qaInvitationAnswerStore.totalPages) {
    if (qaInvitationAnswerStore.qaInvitationAnswerNotifyList.length > 15) {
      // alert.value = true
      document.body.onscroll = null
    }
    return
  }
  qaInvitationAnswerStore.page++
  await qaInvitationAnswerStore.loadQaInvitationAnswerNotifyList(true)
}
</script>

<style></style>
