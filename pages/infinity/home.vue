<template>
  <div>
    <MainSection title="主页" :loading="loading">
      <Head>
        <Title>Infinity主页</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm @on-success="handleFormSuccess" placeholder="有什么新鲜事。" />
      </div>

      <TweetListFeed :tweetList="infinityStore.InfinityDataList" />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import TweetForm from '~/components/Tcomponents/Tweet/Form/index.vue'
import TweetListFeed from '~/components/Tcomponents/Tweet/ListFeed.vue'
import { navigateTo, onBeforeRouteUpdate } from '#app'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { useLoadingWin } from '~/composables/useTools'
import { definePageMeta } from '#imports'
import useTailwindConfig from '~/composables/useTailwindConfig'
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import MainSection from '~/components/Tcomponents/MainSection.vue'
const { twitterBorderColor } = useTailwindConfig()

// const {getTweets} = useTweets()
const infinityStore = useInfinityStore()
const loading = ref(false)
definePageMeta({
  keepalive: true,
  key: 'infinity',
})
onBeforeMount(async () => {
  loading.value = true
  await infinityStore.loadInfinityData()
  loading.value = false
})
onMounted(() => {
  clog('index mounted')
  // clog(indexTop.value)
  document.documentElement.scrollTop = 0
  document.body.onscroll = useLoadingWin(infinityStore.loadingMore)
})
onBeforeRouteUpdate(() => {
  console.log('index beforeRouteUpdate')
})

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
  document.body.onscroll = useLoadingWin(infinityStore.loadingMore)
})
onBeforeUnmount(() => {
  document.body.onscroll = null
})

function handleFormSuccess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>
