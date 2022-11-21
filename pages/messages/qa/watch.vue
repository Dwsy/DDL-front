<template>
  <div id="reply-window">
    <v-row class="">
      <v-col>
        <v-tabs v-model="tab">
          <v-tab value="newAnswer">最新回答({{ newAnswerCount }})</v-tab>
          <v-tab value="acceptedAnswer"
          >被采纳回答({{ acceptedAnswerCount }})
          </v-tab
          >
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="newAnswer">
            <v-list>
              <v-list-item
                  v-for="(item, i) in qaWatchStore.qaWatchNotifyList"
                  :key="item.id"
                  :value="item"
                  active-color="pink"
                  rounded="xl"
                  :href="qaWatchStore.getGoToLink(item)"
                  target="_blank"
              >
                <template v-slot:prepend>
                  <v-badge
                      color="red"
                      :dot="true"
                      class="mr-3"
                      :model-value="item.notifyState === NotifyState.UNREAD"
                  >
                    <v-avatar size="x-large">
                      <v-img :src="item.formUserAvatar"></v-img>
                    </v-avatar>
                  </v-badge>
                </template>
                <v-list-item-title
                    v-text="item.formUserNickname"
                ></v-list-item-title>
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
          </v-window-item>
          <v-window-item value="acceptedAnswer">
            <v-list-item
                v-for="(item, i) in qaWatchStore.qaWatchNotifyList"
                :key="item.id"
                :value="item"
                active-color="pink"
                rounded="xl"
                :href="qaWatchStore.getGoToLink(item)"
                target="_blank"
            >
              <template v-slot:prepend>
                <v-badge
                    color="red"
                    :dot="true"
                    class="mr-3"
                    :model-value="item.notifyState === NotifyState.UNREAD"
                >
                  <v-avatar size="x-large">
                    <v-img :src="item.formUserAvatar"></v-img>
                  </v-avatar>
                </v-badge>
              </template>
              <v-list-item-title
                  v-text="item.formUserNickname"
              ></v-list-item-title>
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
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {dateFilter, definePageMeta, QaCommentType, useGet} from '#imports'
import {
  onActivated,
  onDeactivated,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue'
import {useLoadingWin} from '~/composables/useTools'
import {NotifyState, NotifyType, NotifyTypeEn} from '~/types/message'
import {useTheme} from 'vuetify'
import {useQaWatchStore} from '~/stores/messages/questionAnswer/qaWatchStrore'
import {QaWatchType} from '~/composables/Api/messages/qa/watch'
import {ResponseData} from '~/types/utils/axios'

definePageMeta({
  keepalive: false,
})
let theme = useTheme()
const tab = ref()
const type = ref(QaWatchType.new)
const qaWatchStore = useQaWatchStore()
const newAnswerCount = ref()
const acceptedAnswerCount = ref()
onMounted(async () => {
  const {data: newAnswerNumR} = await useGet<ResponseData<number>>(
      'message/notify/count/' + NotifyTypeEn.watch_answer
  )
  newAnswerCount.value = newAnswerNumR.data
  const {data: acceptedAnswerNumR} = await useGet<ResponseData<number>>(
      'message/notify/count/' + NotifyTypeEn.watch_accepted_question_answer
  )
  acceptedAnswerCount.value = acceptedAnswerNumR.data
  document.documentElement.scrollTop = 0
  await qaWatchStore.loadQaWatchNotifyList(type.value, false)
  document.body.onscroll = useLoadingWin(loadingMore)
  watch(tab, async (val) => {
    val === 'newAnswer'
        ? (type.value = QaWatchType.new)
        : val === 'acceptedAnswer'
            ? (type.value = QaWatchType.accepted)
            : (type.value = QaWatchType.new)
    qaWatchStore.page = 1
    qaWatchStore.totalPages = null
    await qaWatchStore.loadQaWatchNotifyList(type.value, false)
  })
})
onUnmounted(() => {
  qaWatchStore.page = 1
  qaWatchStore.totalPages = null
})
const loadingMore = async () => {
  if (qaWatchStore.page >= qaWatchStore.totalPages) {
    if (qaWatchStore.qaWatchNotifyList.length > 15) {
      document.body.onscroll = null
    }
    return
  }
  qaWatchStore.page++
  await qaWatchStore.loadQaWatchNotifyList(type.value, true)
}
</script>

<style scoped>
.d-qa-answer-comment {
  padding-left: 4px;
  background-color: v-bind(
      'theme.global.name.value === "dark" ? "#332d3b " : "#ffd6e7"'
  );
}
</style>
