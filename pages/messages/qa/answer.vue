<template>
  <div id="reply-window">
    <v-row class="">
      <v-col>
        <!--        <div class="text-start ">-->
        <!--          <v-btn icon elevation="0" @click="qaAnswerStore.loadQaAnswerNotifyList()">-->
        <!--            <v-icon>-->
        <!--              mdi-refresh-->
        <!--            </v-icon>-->
        <!--          </v-btn>-->
        <!--        </div>-->
        <v-list>
          <v-list-item
            v-for="(item, i) in qaAnswerStore.qaAnswerNotifyList"
            :key="item.id"
            :href="qaAnswerStore.getGoToLink(item)"
            :value="item"
            active-color="pink"
            rounded="xl"
            target="_blank"
          >
            <!--            :href="qaAnswerStore.getGoToLink(item)"-->
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
            <span>{{ dateFilter(item.createTime) }}</span>
            <v-divider></v-divider>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { definePageMeta, dateFilter } from '#imports'
import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue'
import { useLoadingWin } from '~/composables/useTools'
import { NotifyState, NotifyType } from '~/types/message'
import { useQaAnswerStore } from '~/stores/messages/questionAnswer/qaAnswerStore'

definePageMeta({
  keepalive: false,
})

let qaAnswerStore = useQaAnswerStore()
onMounted(async () => {
  clog('reply mounted')
  document.documentElement.scrollTop = 0
  await qaAnswerStore.loadQaAnswerNotifyList()
  // document.body.onscroll =  useLoadingWin(loadingMore)
  document.body.onscroll = useLoadingWin(loadingMore)
})
onUnmounted(() => {
  qaAnswerStore.page = 1
  qaAnswerStore.totalPages = null
  clog('qaAnswerNotifyList unmounted')
})
onActivated(() => {
  clog('qaAnswerNotifyList activated')
})
onDeactivated(() => {
  clog('qaAnswerNotifyList deactivated')
})

const loadingWin = async () => {
  //文档内容实际高度（包括超出视窗的溢出部分）
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
  //滚动条滚动距离
  let scrollTop =
    window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  //窗口可视范围高度
  let clientHeight =
    window.innerHeight ||
    Math.min(document.documentElement.clientHeight, document.body.clientHeight)
  if (clientHeight + scrollTop + 100 >= scrollHeight) {
    await loadingMore()
  }
}

const loadingMore = async () => {
  clog(123)
  if (qaAnswerStore.page >= qaAnswerStore.totalPages) {
    if (qaAnswerStore.qaAnswerNotifyList.length > 15) {
      // alert.value = true
      document.body.onscroll = null
    }
    return
  }
  qaAnswerStore.page++
  await qaAnswerStore.loadQaAnswerNotifyList(true)
}
</script>

<style></style>
