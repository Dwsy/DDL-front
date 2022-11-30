<template>
  <div class="flex w-full items-center justify-start">
    <TweetItemActionsIcon :size="size" color="blue" @click.stop="clickCommentBtn()">
      <template v-slot:icon="{ classes }">
        <ChatBubbleBottomCenterIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{ props.tweet.childCommentNum }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <ReceiptRefundIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon :size="size" color="sky">
      <template v-slot:icon="{ classes }">
        <HeartIcon
          v-if="!tweet.up"
          :class="classes"
          @click.stop="infinityStore.upActionTweet(tweet.id, true, twType,tweet.replyUserTweetId)"
        />
        <HeartIconSolid
          v-else
          :class="classes"
          class="text-blue-400"
          @click.stop="infinityStore.upActionTweet(tweet.id, false, twType,tweet.replyUserTweetId)"
        />
      </template>

      <template v-slot:default>
        {{ tweet.upNum }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="sky" :size="size">
      <template v-slot:icon="{ classes }">
        <CloudArrowUpIcon :class="classes" />
      </template>

      <template v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import TweetItemActionsIcon from '~/components/Tcomponents/Tweet/Item/Actions/Icon.vue'

import {
  ChatBubbleBottomCenterIcon,
  CloudArrowUpIcon,
  HeartIcon,
  ReceiptRefundIcon,
} from '@heroicons/vue/24/outline/esm/index.js'
import { HeartIcon as HeartIconSolid } from '@heroicons/vue/24/solid/esm/index.js'
import { computed } from 'vue'
import { InfinityI, TwShowStatus } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'

const infinityStore = useInfinityStore()
const emits = defineEmits(['onCommentClick'])

const x = () => {}
const props = defineProps<{
  tweet: InfinityI
  compact: boolean
  twType: TwShowStatus
}>()

// const showStats = computed(() => props.compact)
// const showStats = computed(() => true)
const size = computed(() => (props.compact ? 5 : 6))
const clickCommentBtn = () => {
  if (props.twType != TwShowStatus.status) {
    emits('onCommentClick')
  } else {
    const inputElement: HTMLInputElement = document.querySelector(
      '.d-tw-status-input .v-field__input'
    )
    inputElement.focus()
  }
}
function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}
</script>