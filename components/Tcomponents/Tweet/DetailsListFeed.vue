<template>
  <div>
    <!--    {{replyDialog}}-->
    <client-only>
      <v-dialog v-model="infinityStatusStore.replyDialog" width="45%">
        <!--        :reply-to="props.tweet"-->
        <!--        :user="props.user"-->
        <!--        @on-success="handleFormSuccess"-->
        <v-card >
          <v-toolbar
            :title="`回复@：${infinityStatusStore.replyInfinityData.user.nickname}`"
            color="#228be6"
            style="color: white"
          ></v-toolbar>
          <DialogFrom placeholder="~~~"/>
        </v-card>
      </v-dialog>
    </client-only>
    <v-divider></v-divider>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <TransitionGroup v-else tag="div" name="list">
    <div
      class="cursor-pointer border-b pb-4"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="(tweet, index) in infinityStatusStore?.commentDataList"
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
    </TransitionGroup>
    <div v-if="infinityStatusStore.end" class="p-4">
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
import { computed, provide, ref } from 'vue'
import { navigateTo } from '#app'
import { useTheme } from 'vuetify'
import { useInfinityStatusStore } from '~/stores/infinity/infinityStatusStore'

const infinityStatusStore = useInfinityStatusStore()
const isEmptyArray = computed(() => infinityStatusStore.commentDataList.length === 0)


function redirect(tweet) {
  navigateTo(`/infinity/status/${tweet.id}`)
}

const hasReply = (id: string) => {
  if (infinityStatusStore.commentReplyDataMap.has(id)) {
    return true
  }
}
const getReply = (id: string) => {
  return infinityStatusStore.commentReplyDataMap.get(id)
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
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}

</style>
