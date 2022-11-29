<template>
  <div>
    <TweetItem :tweet="props.tweet" />

    <TweetForm
      :reply-to="props.tweet"
      :user="props.user"
      placeholder="发表你的回复"
    />

    <DetailsListFeed />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { navigateTo } from '#app'
import TweetItem from '~/components/Tcomponents/Tweet/Item/index.vue'
import TweetForm from '~/components/Tcomponents/Tweet/Form/index.vue'
import DetailsListFeed from '~/components/Tcomponents/Tweet/DetailsListFeed.vue'
import { InfinityI } from '~/types/infinity'
import { User } from '~/types/user'
import { useInfinityStore } from '~/stores/infinity/infinityStore'

const infinityStore = useInfinityStore()
const props = defineProps<{
  tweet: InfinityI
  user: User | any
}>()

onMounted(() => {
  // console.log('props.tweet', props.tweet)
})

// const comments =[]
</script>