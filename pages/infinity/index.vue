<template>
  <div>
    <MainSection title="主页" :loading="loading">
      <Head>
        <Title>Infinity主页</Title>
      </Head>

      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </div>

      <TweetListFeed :tweetList="infinityStore.InfinityDataList" />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'
import { ref, onBeforeMount } from 'vue'
import MainSection from '~/components/Tcomponents/MainSection.vue'

const { twitterBorderColor } = useTailwindConfig()
import TweetForm from '~/components/Tcomponents/Tweet/Form/index.vue'
import TweetListFeed from '~/components/Tcomponents/Tweet/ListFeed.vue'
import { navigateTo } from '#app'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
// const {getTweets} = useTweets()
const infinityStore = useInfinityStore()
const loading = ref(false)
// const homeTweets = ref([])
// const {useAuthUser} = useAuth()
const homeTweets = [
  {
    mediaFiles: [
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
      'https://picsum.photos/300/300',
    ],
    text: 'test',
    postedAtHuman: 'postedAtHuman',
    author: {
      name: 'name',
      handle: 'handle',
      profileImage: 'https://picsum.photos/300/300',
    },
  },
]
const user = {
  id: 1,
  name: 'John Doe',
  username: 'johndoe',
  profileImage: 'https://picsum.photos/300/300',
  replyTo: {
    id: 2,
    name: 'dwsy',
    username: 'ddy',
    profileImage: 'https://picsum.photos/300/300',
  },
  repliesCount: 21,
}

onBeforeMount(async () => {
  loading.value = true
  await infinityStore.loadInfinityData()
  loading.value = false
})

function handleFormSuccess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>
