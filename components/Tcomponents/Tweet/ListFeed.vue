<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <!--    {{ props.tweetList }}-->
    <div
      v-else
      class="dark:hover:bg-dim-300 cursor-pointer border-b pb-4 hover:bg-gray-100"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="tweet in props.tweetList"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'

const { twitterBorderColor, defaultTransition } = useTailwindConfig()
import TweetItem from '~/components/Tcomponents/Tweet/Item/index.vue'
import { computed, PropType } from 'vue'
import { navigateTo } from '#app'
import { InfinityI } from '~/types/infinity'

const props = defineProps<{ tweetList: InfinityI[] }>()
const isEmptyArray = computed(() => props.tweetList.length === 0)

function redirect(tweet) {
  navigateTo(`/status/${tweet.id}`)
}
</script>
