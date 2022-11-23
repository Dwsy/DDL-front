<template>
  <div class="flex p-4">
    <div>
      <img :src="author.userInfo.avatar" alt="" class="h-10 w-10 rounded-full" />
    </div>

    <div class="ml-3">
      <span class="font-medium text-gray-800 dark:text-white">{{ author.nickname }}</span>

      <!--      <span class="ml-3 text-sm font-medium text-gray-400">-->
      <!--        <nuxt-link to="#">-->
      <!--          {{ author.handle }}-->
      <!--        </nuxt-link>-->
      <!--        . {{ props.tweet.postedAtHuman }}-->
      <!--      </span>-->

      <!--      <p v-if="props.tweet.replyTo" class="text-sm">-->
      <!--        <span class="text-gray-500"> Replying to </span>-->

      <!--        <nuxt-link :to="replyToTweetUrl" class="text-blue-400">-->
      <!--          {{ props.tweet.replyTo.author.handle }}-->
      <!--        </nuxt-link>-->
      <!--      </p>-->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { InfinityI } from '~/types/infinity'

const props = defineProps<{ tweet: InfinityI }>()

const author = props.tweet.user
// const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`);
const replyToTweetUrl = 'computed(() => `/status/${props.tweet?.replyTo?.id}`);'
</script>
