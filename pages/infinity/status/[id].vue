<template>
  <client-only>
    <div>
      <MainSection title="Tweet" :loading="loading">
        <Head>
          <Title></Title>
        </Head>

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
import { definePageMeta, ref } from "#imports";
import { onBeforeMount, onBeforeUnmount, onMounted, watch } from "vue";

const user = useUserStore().user
const loading = ref(false)
const tweet = ref<InfinityI>()
// const { getTweetById } = useTweets()
// const { useAuthUser } = useAuth()
// const user = useAuthUser()
definePageMeta({
  keepalive: true,
})
watch(
  () => useRoute().fullPath,
  () => getTweet()
)

onMounted(() => {
  // document.documentElement.scrollTop = 0
  document.body.onscroll = useLoadingWin(loadingMore)
  getTweet()
})

function getId() {
  return String(useRoute().params.id)
}

const infinityStore = useInfinityStore()

async function getTweet() {
  const id = getId();
  if (id==undefined) {
    return
  }
  loading.value = true
  const { data: response } = await useAxiosGetInfinityById(id)
  if (response.code === 0) {
    infinityStore.commentDataList = response.data.childComments
    totalPages.value = response.data.childCommentTotalPages
    loading.value = false
    tweet.value = response.data
  } else {
    errorMsg(response.msg)
  }
}

const page = ref(1)
const totalPages = ref()
const getCommentsPage = async () => {
  const { data: axiosResponse } = await useAxiosGetInfinityCommentById(getId(), {
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

onBeforeUnmount(() => {
  document.body.onscroll = null
})
</script>