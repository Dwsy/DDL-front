<template>
  <div class="flex w-full items-center justify-start">
    <TweetItemActionsIcon :size="size" color="blue" @click.stop="clickCommentBtn()">
      <template v-slot:icon="{ classes }">
        <svg
          :class="classes"
          style="fill: currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path
              d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"
            ></path>
          </g>
        </svg>
      </template>

      <template v-slot:default>
        {{ props.tweet.childCommentNum }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <!--        <ReceiptRefundIcon :class="classes" />-->
        <svg
          :class="classes"
          style="fill: currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <g>
            <path
              d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"
            ></path>
          </g>
        </svg>
      </template>

      <template v-slot:default>
        <span :title="11201">{{ number2word(11201) }}</span>
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon :size="size" color="sky">
      <template v-slot:icon="{ classes }">
        <HeartIcon
          v-if="!tweet.up"
          :class="classes"
          @click.stop="infinityStore.upActionTweet(tweet.id, true, twType, tweet.replyUserTweetId)"
        />

        <HeartIconSolid
          v-else
          :class="classes"
          class="text-blue-400"
          @click.stop="infinityStore.upActionTweet(tweet.id, false, twType, tweet.replyUserTweetId)"
        />
      </template>

      <template v-slot:default>
        {{ tweet.upNum }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="sky" :size="size">
      <template v-slot:icon="{ classes }">
        <!--        <CloudArrowUpIcon :class="classes" />-->
        <svg :class="classes" style="fill: currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path
              d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"
            ></path>
          </g>
        </svg>
      </template>

      <template v-slot:default>
        <span :title="1234">{{ number2word(1234) }}</span>
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
import { number2word } from '~/utils/number2word'

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
