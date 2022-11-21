<template>
  <div>
    <TweetItem :tweet="props.tweet"/>

    <TweetForm
        placeholder="Tweet your reply"
        :reply-to="props.tweet"
        :user="props.user"
        @on-success="handleFormSuccess"
    />

    <TweetListFeed :tweets="replies"/>
  </div>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {navigateTo} from '#app'
import TweetItem from '~/components/Tcomponents/Tweet/Item/index.vue'
import TweetForm from '~/components/Tcomponents/Tweet/Form/index.vue'
import TweetListFeed from '~/components/Tcomponents/Tweet/ListFeed.vue'

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
})

const replies = computed(() => props.tweet?.replies || [])

function handleFormSuccess(tweet) {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
</script>
