<template>
  <div class="flex w-full items-center justify-around">
    <TweetItemActionsIcon :size="size" color="blue" @on-click="emits('onCommentClick')">
      <template v-slot:icon="{ classes }">
        <ChatBubbleBottomCenterIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ props.tweet.repliesCount }}
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

    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <HeartIcon :class="classes" />
      </template>

      <template v-if="showStats" v-slot:default>
        {{ generateRandomNumber() }}
      </template>
    </TweetItemActionsIcon>

    <TweetItemActionsIcon color="blue" :size="size">
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
import { computed } from 'vue'

const emits = defineEmits(['onCommentClick'])

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})

const showStats = computed(() => props.compact)
const size = computed(() => (props.compact ? 5 : 8))

function generateRandomNumber() {
  return Math.floor(Math.random() * 100)
}
</script>
