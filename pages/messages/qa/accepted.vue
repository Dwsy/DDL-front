<template>
  <div id="reply-window">
    <v-row class="">
      <v-col>
        <!--        <div class="text-start ">-->
        <!--          <v-btn icon elevation="0" @click="qaAcceptedAnswerStore.loadQaAnswerNotifyList()">-->
        <!--            <v-icon>-->
        <!--              mdi-refresh-->
        <!--            </v-icon>-->
        <!--          </v-btn>-->
        <!--        </div>-->
        <v-list>
          <v-list-item
            v-for="(item, i) in qaAcceptedAnswerStore.notifyList"
            :key="item.id"
            :href="qaAcceptedAnswerStore.getGoToLink(item)"
            :value="item"
            active-color="pink"
            rounded="xl"
            target="_blank"
          >
            <!--            :href="qaAcceptedAnswerStore.getGoToLink(item)"-->
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
import { useQaAcceptedAnswerStore } from '~/stores/messages/questionAnswer/qaAcceptedAnswerStore'

definePageMeta({
  keepalive: false,
})

let qaAcceptedAnswerStore = useQaAcceptedAnswerStore()
onMounted(async () => {
  console.log('reply mounted')
  document.documentElement.scrollTop = 0
  await qaAcceptedAnswerStore.loadQaAcceptedAnswerStore()
  // document.body.onscroll =  useLoadingWin(loadingMore)
  document.body.onscroll = useLoadingWin(loadingMore)
})
onUnmounted(() => {
  qaAcceptedAnswerStore.page = 1
  qaAcceptedAnswerStore.totalPages = null
  // console.log('qaAnswerNotifyList unmounted')
})
// onActivated(() => {
//   console.log('qaAnswerNotifyList activated')
// })
// onDeactivated(() => {
//   console.log('qaAnswerNotifyList deactivated')
// })

const loadingMore = async () => {
  if (qaAcceptedAnswerStore.page >= qaAcceptedAnswerStore.totalPages) {
    if (qaAcceptedAnswerStore.notifyList.length > 15) {
      // alert.value = true
      document.body.onscroll = null
    }
    return
  }
  qaAcceptedAnswerStore.page++
  await qaAcceptedAnswerStore.loadQaAcceptedAnswerStore(true)
}
</script>

<style></style>
