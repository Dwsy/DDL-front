<template>
  <div>
    {{ totalPages }}/{{ page }}
    <MainSection title="Tweet" :loading="loading">
      <Head>
        <Title></Title>
      </Head>

      <TweetDetails :tweet="tweet" :user="user" />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from '#app'
import MainSection from '~/components/Tcomponents/MainSection.vue'
import TweetDetails from '~/components/Tcomponents/Tweet/Details.vue'
import { useAxiosGetInfinityById, useAxiosGetInfinityCommentById } from '~/composables/Api/infinity'
import { errorMsg } from '~/composables/utils/toastification'
import { useUserStore } from '~/stores/user'
import { InfinityI } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { useLoadingWin } from '~/composables/useTools'

const user = useUserStore().user
const loading = ref(false)
const tweet = ref<InfinityI>()
// const { getTweetById } = useTweets()
// const { useAuthUser } = useAuth()
// const user = useAuthUser()

watch(
  () => useRoute().fullPath,
  () => getTweet()
)

onBeforeMount(() => {
  getTweet()
})
onMounted(() => {
  // document.documentElement.scrollTop = 0
  document.body.onscroll = useLoadingWin(loadingMore)
})

function getTweetIdFromRoute() {
  return String(useRoute().params.id)
}

const infinityStore = useInfinityStore()

async function getTweet() {
  loading.value = true

  loading.value = false

  const { data: response } = await useAxiosGetInfinityById(getTweetIdFromRoute())
  if (response.code === 0) {
    infinityStore.commentDataList = response.data.childComments
    totalPages.value = response.data.childCommentTotalPages

    tweet.value = response.data
  } else {
    errorMsg(response.msg)
  }
}

const page = ref(1)
const totalPages = ref()
const getCommentsPage = async () => {
  const { data: axiosResponse } = await useAxiosGetInfinityCommentById(getTweetIdFromRoute(), {
    page: page.value,
  })
  if (axiosResponse.code === 0) {
    infinityStore.commentDataList.push(...axiosResponse.data.content)
    totalPages.value = axiosResponse.data.totalPages
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

onBeforeMount(() => {
  // getTweet()
})
onBeforeUnmount(() => {
  document.body.onscroll = null
})
</script>