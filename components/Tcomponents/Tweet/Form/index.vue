<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <!--      <TweetItem v-if="props.replyTo && props.showReply" :tweet="props.replyTo" hideActions />-->
      <TweetFormInput
        :placeholder="props.placeholder"
        @onSubmit="handleFormSubmit"
        :reply-to="props.replyTo"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UISpinner from '~/components/Tcomponents/UI/Spinner'
import TweetItem from '~/components/Tcomponents/Tweet/Item'
import TweetFormInput from '~/components/Tcomponents/Tweet/Form/Input.vue'
import { InfinityI } from '~/types/infinity'

const emits = defineEmits(['onSuccess'])
const loading = ref(true)
// const { postTweet } = useTweets()

const props = defineProps<{
  placeholder: string
  replyTo?: InfinityI
  showReply?: boolean
}>()
onMounted(() => {
  loading.value = false
})

async function handleFormSubmit(data) {
  // loading.value = true
  // try {
  //     const response = await postTweet({
  //         text: data.text,
  //         mediaFiles: data.mediaFiles,
  //         replyTo: props.replyTo?.id
  //     })
  //
  //     emits('onSuccess', response.tweet)
  // } catch (error) {
  //     console.log(error)
  // } finally {
  //     loading.value = false
  // }
}
</script>
