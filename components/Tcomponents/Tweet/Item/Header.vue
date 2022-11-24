<template>
  <div class="flex p-4">
    <div>
      <v-avatar size="50">
        <v-img :src="author.userInfo.avatar"></v-img>
      </v-avatar>
    </div>    <div class="ml-3">
    <span class="font-medium text-gray-800 dark:text-white">{{ author.nickname }}</span>
    <span class="text-gray-400 text-sm">·</span>
    <span class="text-gray-400 text-sm dark:text-white">{{
        timeAgoFilter(props.tweet.createTime)
      }}</span>
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
import { timeAgoFilter } from '#imports'

const props = defineProps<{ tweet: InfinityI }>()

const author = props.tweet.user
// const replyToTweetUrl = computed(() => `/status/${props.tweet?.replyTo?.id}`);
const replyToTweetUrl = 'computed(() => `/status/${props.tweet?.replyTo?.id}`);'
</script>