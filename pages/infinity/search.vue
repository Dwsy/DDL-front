<template>
  <div>
    <MainSection title="Search" :loading="loading">
      <Head>
        <Title>Search</Title>
      </Head>

      <TweetListFeed :tweets="searchTweets" />
    </MainSection>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
const { getTweets: getTweetsComposable } = useTweets()

const loading = ref(false)
const searchTweets = ref([])
const searchQuery = useRoute().query.q

watch(
  () => useRoute().fullPath,
  () => getTweets()
)

onBeforeMount(() => {
  getTweets()
})

async function getTweets() {
  loading.value = true
  try {
    const { tweets } = await getTweetsComposable({
      query: searchQuery,
    })

    searchTweets.value = tweets
  } catch (error) {
    clog(error)
  } finally {
    loading.value = false
  }
}
</script>
