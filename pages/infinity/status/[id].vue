<template>
  <client-only>
    <div>
      <MainSection title="Tweet" :loading="loading">
        <Head>
          <Title></Title>
        </Head>
        {{count}}
        <v-btn @click="count++">++</v-btn>
        <TweetDetails :tweet="tweet" :user="user" />
      </MainSection>
    </div>
  </client-only>
</template>
<script setup lang="ts">
import { useRoute } from '#app'
import MainSection from '~/components/Tcomponents/MainSection.vue'
import TweetDetails from '~/components/Tcomponents/Tweet/Details.vue'
import { useAxiosGetInfinityById, useAxiosGetInfinityCommentById } from '~/composables/Api/infinity'
import { errorMsg } from '~/composables/utils/toastification'
import { useUserStore } from '~/stores/user'
import { InfinityI } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { useLoadingWin } from '~/composables/useTools'
import { definePageMeta, ref } from '#imports'
import { computed, onBeforeMount, onBeforeUnmount, onMounted, onUnmounted, watch, watchEffect } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import clear from 'clear-module'

const user = useUserStore().user
const loading = ref(false)
const tweet = ref<InfinityI>()
// const { getTweetById } = useTweets()
// const { useAuthUser } = useAuth()
// const user = useAuthUser()
definePageMeta({
  keepalive: true,
  key: 'status',
})
const count = ref(1)
// watch(
//   () => useRoute().fullPath,
//   () => getTweet()
// )
const getId = computed(() => {
  return String(useRoute().params.id)
})
watchEffect(() => {
  getTweet()
})

onMounted(() => {
  // document.documentElement.scrollTop = 0
  console.log('mounted status')
  document.body.onscroll = useLoadingWin(loadingMore)
  // getTweet()
})
onUnmounted(() => {
  console.log('onUnmounted status')
  document.body.onscroll = null
})


const infinityStore = useInfinityStore()

async function getTweet() {
  const id = getId.value
  if (id === undefined || id === 'undefined') {
    return
  }
  loading.value = true
  const { data: response } = await useAxiosGetInfinityById(id)
  if (response.code === 0) {
    infinityStore.commentDataList = response.data.childComments
    totalPages.value = response.data.childCommentTotalPages
    loading.value = false
    tweet.value = response.data
    let commentReplyMap: Object = response.data.childCommentReplyMap
    // console.log(commentReplyMap)
    Object.keys(commentReplyMap).forEach((key) => {
      infinityStore.commentReplyDataMap.set(key, commentReplyMap[key])
    })
    // commentReplyMap.for((val, key) => {
    //   infinityStore.commentReplyDataMap.set(key, val)
    // })
  } else {
    errorMsg(response.msg)
  }
}

const page = ref(1)
const totalPages = ref()
const getCommentsPage = async () => {
  const { data: axiosResponse } = await useAxiosGetInfinityCommentById(getId.value, {
    page: page.value,
  })
  if (axiosResponse.code === 0) {
    infinityStore.commentDataList.push(...axiosResponse.data.childComments.content)
    Object.keys(axiosResponse.data.commentReplyMap).forEach((key) => {
      infinityStore.commentReplyDataMap.set(key, axiosResponse.data.commentReplyMap[key])
    })
    totalPages.value = axiosResponse.data.childComments.totalPages
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const end = ref()
const loadingMore = async () => {
  if (page.value >= Number(totalPages.value)) {
    if (infinityStore.commentDataList.length > 8) {
      end.value = true
      document.body.onscroll = null
    }
    return
  }
  page.value += 1
  await getCommentsPage()
}

onBeforeUnmount(() => {
  document.body.onscroll = null
})
onBeforeRouteLeave((to, from, next) => {
  // console.log('onBeforeRouteLeave')
  infinityStore.commentReplyDataMap.clear()
  infinityStore.commentDataList=[]
  document.body.onscroll = null
  next()
})
</script>
