<template>
  <div>
    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <TransitionGroup v-else tag="div" name="list">
      <div
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
    </TransitionGroup>
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

<style scoped>
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
