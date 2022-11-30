<template>
  <client-only>
    <div>
      <MainSection title="Tweet" :loading="infinityStatusStore.loading">
        <Head>
          <Title></Title>
        </Head>
        <!--        {{count}}-->
        <!--        <v-btn @click="count++">++</v-btn>-->
        <TweetDetails :tweet="infinityStatusStore.tweet" :user="user" />
      </MainSection>
    </div>
  </client-only>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { onBeforeRouteUpdate, useRoute } from '#app'
import MainSection from '~/components/Tcomponents/MainSection.vue'
import TweetDetails from '~/components/Tcomponents/Tweet/Details.vue'
import { useUserStore } from '~/stores/user'
import { useLoadingWin } from '~/composables/useTools'
import { definePageMeta } from '#imports'
import { onBeforeMount, onUnmounted } from 'vue'
import { useInfinityStatusStore } from '~/stores/infinity/infinityStatusStore'

definePageMeta({
  keepalive: true,
  key: 'status',
})

const user = useUserStore().user

const infinityStatusStore = useInfinityStatusStore()
onBeforeRouteUpdate((to, from, next) => {
  if (to.path.startsWith('/infinity/status')) {
    infinityStatusStore.id = String(to.params.id)
    clog('String(useRoute()', useRoute())
    infinityStatusStore.getTweet()
  } else {
    infinityStatusStore.commentReplyDataMap.clear()
    infinityStatusStore.commentDataList = []
  }
  next()
})
onBeforeMount(async () => {
  infinityStatusStore.id = String(useRoute().params.id)
  await infinityStatusStore.getTweet()
  document.body.onscroll = useLoadingWin(infinityStatusStore.loadingMore)
})
onUnmounted(() => {
  document.body.onscroll = null
})

// onBeforeUnmount(() => {
// })
// onBeforeRouteLeave((to, from, next) => {
//   next()
// })
</script>
