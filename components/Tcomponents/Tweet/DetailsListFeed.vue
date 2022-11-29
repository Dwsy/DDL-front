<template>
  <div>
    <!--    {{replyDialog}}-->
    <client-only>
      <v-dialog v-model="replyDialog">
        <!--        :reply-to="props.tweet"-->
        <!--        :user="props.user"-->
        <!--        @on-success="handleFormSuccess"-->
        <v-card class="mx-auto w-5/12">
          <v-toolbar
            :title="`回复@：${infinityStore.replyInfinityData.user.nickname}`"
            color="#228be6"
            style="color: white"
          ></v-toolbar>
          <DialogFrom placeholder="~~~" />
        </v-card>
      </v-dialog>
    </client-only>
    <v-divider></v-divider>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <div
      v-else
      class="cursor-pointer border-b pb-4"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="(tweet, index) in infinityStore?.commentDataList"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet" compact :time-line="hasReply(tweet.id)" />
      <template v-if="hasReply(tweet.id)" v-for="(reply, rIndex) in getReply(tweet.id)">
        <!--        {{ test(tweet.id) }}-->
        <!--        {{ rIndex + 1 !== getReply(tweet.id).length }}-->
        <!--        {{ rIndex + 1 }}//{{ getReply(tweet.id).length }}-->
        <TweetItem
          :tweet="reply"
          compact
          :time-line="rIndex + 1 !== getReply(tweet.id).length"
          :time-line-height="rIndex + 1 !== getReply(tweet.id).length ? '100%' : ''"
        ></TweetItem>
      </template>
    </div>
    <div v-if="infinityStore.end" class="p-4">
      <p class="text-center text-gray-500">倒头了 😢</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'
import DialogFrom from '~/components/Tcomponents/Tweet/Form/dialogFrom.vue'

const theme = useTheme()
const { twitterBorderColor, defaultTransition } = useTailwindConfig()
import TweetItem from '~/components/Tcomponents/Tweet/Item/index.vue'
import { computed, inject, PropType, provide, ref, toRefs } from 'vue'
import { navigateTo } from '#app'
import { User } from '~/types/user'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { Ref } from '@vue/runtime-core'
import { useTheme } from 'vuetify'
// const props = defineProps<{ commentsList: InfinityI[] }>()
const infinityStore = useInfinityStore()
const isEmptyArray = computed(() => infinityStore.commentDataList.length === 0)
const replyDialog = ref(false)
provide('replyDialog', replyDialog)

function redirect(tweet) {
  navigateTo(`/infinity/status/${tweet.id}`)
}

const hasReply = (id: string) => {
  if (infinityStore.commentReplyDataMap.has(id)) {
    return true
  }
}
const getReply = (id: string) => {
  return infinityStore.commentReplyDataMap.get(id)
}

const getMapSize = (map: Map<string, any>) => {
  console.log(map.size)
  return map.size
}
</script>

<style scoped>
:deep(.d-tw-timeLine) {
  width: 2px;
  background-color: v-bind(
    'theme.global.name.value === "dark" ? "rgb(66, 83, 100)" : "rgb(207, 217, 222)"'
  ) !important;
  height: 100%;
  /*height: calc(100% - 52px);*/
  margin-left: 26px;
  /*margin-top: 1px;*/
}
</style>
