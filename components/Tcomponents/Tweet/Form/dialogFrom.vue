<template>
  <div >
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else >
<!--      <TweetItem v-if="props.replyTo && props.showReply" :tweet="props.replyTo" hideActions />-->
      <TweetFormInput
        :placeholder="props.placeholder"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import UISpinner from '~/components/Tcomponents/UI/Spinner'
import TweetItem from '~/components/Tcomponents/Tweet/Item'
import TweetFormInput from '~/components/Tcomponents/Tweet/Form/DialogInput.vue'

const emits = defineEmits(['onSuccess'])
const loading = ref(false)
// const { postTweet } = useTweets()

const props = defineProps({
  // user: {
  //   type: Object,
  //   required: true,
  // },
  placeholder: {
    type: String,
    default: "有什么新鲜事。",
  },
  replyTo: {
    type: Object,
    default: null,
  },
  showReply: {
    type: Boolean,
    default: false,
  },
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
