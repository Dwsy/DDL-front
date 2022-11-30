<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <!--      <TweetItem v-if="props.replyTo && props.showReply" :tweet="props.replyTo" hideActions />-->
      <TweetFormInput :placeholder="props.placeholder" :reply-to="props.replyTo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import UISpinner from '~~/components/Tcomponents/UI/Spinner.vue'
// import TweetItem from '~/components/Tcomponents/Tweet/Item'
import { onMounted, ref } from 'vue'
import TweetFormInput from '~/components/Tcomponents/Tweet/Form/Input.vue'
import { InfinityI } from '~/types/infinity'

const loading = ref(true)

const props = defineProps<{
  placeholder: string
  replyTo?: InfinityI
  showReply?: boolean
}>()
onMounted(() => {
  loading.value = false
})

</script>
