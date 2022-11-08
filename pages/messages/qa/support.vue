<template>
  <div id="reply-window">
    <v-row class="ml-5">
      <v-col>

        <v-tabs
            v-model="tab"
        >
          <v-tab value="all">全部</v-tab>
          <v-tab value="question">问题支持</v-tab>
          <v-tab value="answer">答案支持</v-tab>
        </v-tabs>


        <v-window v-model="tab">
          <v-window-item value="all">
            <v-list>
              <v-list-item
                  v-for="(item, i) in qaSupportStore.qaSupportNotifyList"
                  :key="item.id"
                  :value="item"
                  active-color="pink"
                  rounded="xl"
                  :href="qaSupportStore.getGoToLink(item)"
                  target="_blank"
              >
                <template v-slot:prepend>
                  <v-badge color="red" :dot="true" class="mr-3"
                           :model-value="item.notifyState===NotifyState.UNREAD">
                    <v-avatar size="x-large">
                      <v-img :src="item.formUserAvatar"></v-img>
                    </v-avatar>
                  </v-badge>
                </template>
                <v-list-item-title v-text="item.formUserNickname"></v-list-item-title>
                <div>
              <span class="text-grey">
                {{ NotifyType[item.notifyType] }}
              </span>
                  <span> {{ item.toContent }}</span>
                  <v-divider></v-divider>
                  <!--                  <div class="d-qa-answer-comment">{{ item.formContent }}</div>-->
                </div>
                <span class="text-grey">{{ dateFilter(item.createTime) }}</span>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-window-item>

          <v-window-item value="question">
            <v-list>
              <v-list-item
                  v-for="(item, i) in qaSupportStore.qaSupportNotifyList"
                  :key="item.id"
                  :value="item"
                  active-color="pink"
                  rounded="xl"
                  :href="qaSupportStore.getGoToLink(item)"
                  target="_blank"
              >
                <template v-slot:prepend>
                  <v-badge color="red" :dot="true" class="mr-3"
                           :model-value="item.notifyState===NotifyState.UNREAD">
                    <v-avatar size="x-large">
                      <v-img :src="item.formUserAvatar"></v-img>
                    </v-avatar>
                  </v-badge>
                </template>
                <v-list-item-title v-text="item.formUserNickname"></v-list-item-title>
                <div>
              <span class="text-grey">
<!--                {{item.notifyType}}-->
                {{ NotifyType[item.notifyType] }}
              </span>
                  <span> {{ item.toContent }}</span>
                  <v-divider></v-divider>
                  <!--                  <div class="d-qa-answer-comment">{{ item.formContent }}</div>-->
                </div>
                <span class="text-grey">{{ dateFilter(item.createTime) }}</span>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-window-item>

          <v-window-item value="answer">
            <v-list>
              <v-list-item
                  v-for="(item, i) in qaSupportStore.qaSupportNotifyList"
                  :key="item.id"
                  :value="item"
                  active-color="pink"
                  rounded="xl"
                  :href="qaSupportStore.getGoToLink(item)"
                  target="_blank"
              >
                <template v-slot:prepend>
                  <v-badge color="red" :dot="true" class="mr-3"
                           :model-value="item.notifyState===NotifyState.UNREAD">
                    <v-avatar size="x-large">
                      <v-img :src="item.formUserAvatar"></v-img>
                    </v-avatar>
                  </v-badge>
                </template>
                <v-list-item-title v-text="item.formUserNickname"></v-list-item-title>
                <div>
              <span class="text-grey">
                {{ NotifyType[item.notifyType] }}
              </span>
                  <span> {{ item.toContent }}</span>
                  <v-divider></v-divider>
                  <!--                  <div class="d-qa-answer-comment">{{ item.formContent }}</div>-->
                </div>
                <span class="text-grey">{{ dateFilter(item.createTime) }}</span>
                <v-divider></v-divider>
              </v-list-item>
            </v-list>
          </v-window-item>
        </v-window>


      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {dateFilter, definePageMeta, QaCommentType} from '#imports'
import {onActivated, onDeactivated, onMounted, onUnmounted, ref, watch} from 'vue'
import {useLoadingWin} from '~/composables/useTools'
import {NotifyState, NotifyType} from '~/types/message'
import {useTheme} from 'vuetify'
import {useQaSupportStore} from '~/stores/messages/qaSupportStrore'
import {QaSupportType} from '~/composables/Api/messages/qa/support'

definePageMeta({
  keepalive: false,
})

let theme = useTheme()
const tab = ref()
const type = ref(QaSupportType.all)
// let replyStore = useReplyStore()
let qaSupportStore = useQaSupportStore()
onMounted(async () => {
  console.log('reply mounted')
  document.documentElement.scrollTop = 0
  await qaSupportStore.loadQaSupportNotifyList(type.value, false)
  // document.body.onscroll =  useLoadingWin(loadingMore)
  document.body.onscroll = useLoadingWin(loadingMore)
  watch(tab, async (val) => {

    val === 'all' ? type.value = QaSupportType.all : val === 'question' ? type.value = QaSupportType.question : type.value = QaSupportType.answer
    qaSupportStore.page = 1
    qaSupportStore.totalPages = null
    await qaSupportStore.loadQaSupportNotifyList(type.value, false)
  })
})
onUnmounted(() => {
  qaSupportStore.page = 1
  qaSupportStore.totalPages = null
  console.log('replyNotifyList unmounted')
})
onActivated(() => {
  console.log('replyNotifyList activated')
})
onDeactivated(() => {
  console.log('replyNotifyList deactivated')
})


const loadingMore = async () => {
  if (qaSupportStore.page >= qaSupportStore.totalPages) {
    if (qaSupportStore.qaSupportNotifyList.length > 15) {
      // alert.value = true
      document.body.onscroll = null
    }
    return
  }
  qaSupportStore.page++
  await qaSupportStore.loadQaSupportNotifyList(type.value, true)
}
</script>

<style scoped>
.d-qa-answer-comment {
  padding-left: 4px;
  background-color: v-bind('theme.global.name.value === "dark" ? "#332d3b " : "#ffd6e7"');
}
</style>