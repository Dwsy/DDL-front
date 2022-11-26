<template>
  <div class="flex w-full items-center justify-start">

    <TweetItemActionsIcon :size="size" color="blue" @click.stop="emits('onCommentClick')">
      <template v-slot:icon="{ classes }">
        <ChatBubbleBottomCenterIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ props.tweet.childCommentNum }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <ReceiptRefundIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon :size="size" color="sky">
      <template v-slot:icon="{ classes }">
        <HeartIcon
          v-if="!tweet.up"
          :class="classes"
          @click.stop="infinityStore.upActionTweet(tweet.id, true)"
        />
        <HeartIconSolid
          v-else
          :class="classes"
          class="text-blue-400"
          @click.stop="infinityStore.upActionTweet(tweet.id, false)"
        />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ tweet.upNum }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="sky" :size="size">
      <template v-slot:icon="{ classes }">
        <CloudArrowUpIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>
  </div>
</template>
<script setup lang="ts">
import TweetItemActionsIcon from '~/components/Tcomponents/Tweet/Item/Actions/Icon.vue'

import {
  ChatBubbleBottomCenterIcon,
  ReceiptRefundIcon,
  HeartIcon,
  CloudArrowUpIcon,
} from '@heroicons/vue/24/outline/esm/index.js'
import {
  HeartIcon as HeartIconSolid,
  ReceiptRefundIcon as ReceiptRefundIconSolid,
  ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterIconIconSolid,
} from '@heroicons/vue/24/solid/esm/index.js'
import { computed } from 'vue'
import { InfinityI } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'

const infinityStore = useInfinityStore()
const emits = defineEmits(['onCommentClick'])

const x = () => {}
const props = defineProps<{
  tweet: InfinityI
  compact: boolean
}>()

const showStats = computed(() => props.compact)
const size = computed(() => (props.compact ? 5 : 8))

function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}
</script>