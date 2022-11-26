<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <div
      v-else
      class="cursor-pointer border-b pb-4"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="tweet in infinityStore.InfinityDataList"
      :key="tweet.id"
      @click="redirect(tweet)"
    >

<!--      <nuxt-link :to="`/infinity/status/${tweet.id}`">-->
        <TweetItem :tweet="tweet" compact />
<!--      </nuxt-link>-->
    </div>
    <div v-if="infinityStore.end" class="p-4">
      <p class="text-center text-gray-500">倒头了 😢</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'

const { twitterBorderColor, defaultTransition } = useTailwindConfig()
import TweetItem from '~/components/Tcomponents/Tweet/Item/index.vue'
import { computed, PropType, ref, toRefs } from 'vue'
import { navigateTo } from '#app'
import { InfinityI } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'

// const props = defineProps<{ tweetList: InfinityI[] }>()
const infinityStore = useInfinityStore()
const isEmptyArray = computed(() => infinityStore.InfinityDataList.length === 0)

function redirect(tweet) {
  navigateTo(`/infinity/status/${tweet.id}`)
}
</script>