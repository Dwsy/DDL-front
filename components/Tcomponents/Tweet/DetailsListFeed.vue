<template>
  <div>
    <!--    {{replyDialog}}-->
    <client-only>
      <v-dialog v-model="replyDialog">
        <!--        :reply-to="props.tweet"-->
        <!--        :user="props.user"-->
        <!--        @on-success="handleFormSuccess"-->
        <v-card class="mx-auto w-5/12">
          <v-toolbar
            :title="`回复@：${infinityStore.replyInfinityData.user.nickname}`"
            color="#228be6"
            style="color: white"
          ></v-toolbar>
          <DialogFrom  placeholder="~~~" />
        </v-card>
      </v-dialog>
    </client-only>

    <div v-if="isEmptyArray" class="p-4">
      <p class="text-center text-gray-500">No tweets 😢</p>
    </div>
    <div
      v-else
      class="cursor-pointer border-b pb-4"
      :class="[twitterBorderColor, defaultTransition]"
      v-for="tweet in useInfinityStore().commentDataList"
      :key="tweet.id"
    >
      <TweetItem :tweet="tweet" compact />
    </div>
    <div v-if="infinityStore.end" class="p-4">
      <p class="text-center text-gray-500">倒头了 😢</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'
import DialogFrom from '~/components/Tcomponents/Tweet/Form/dialogFrom.vue'

const { twitterBorderColor, defaultTransition } = useTailwindConfig()
import TweetItem from '~/components/Tcomponents/Tweet/Item/index.vue'
import { computed, inject, PropType, provide, ref, toRefs } from 'vue'
import { navigateTo } from '#app'
import { User } from '~/types/user'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { Ref } from "@vue/runtime-core";
// const props = defineProps<{ commentsList: InfinityI[] }>()
const infinityStore = useInfinityStore()
const isEmptyArray = computed(() => infinityStore.commentDataList.length === 0)
const replyDialog = ref(false)
provide('replyDialog', replyDialog)
function redirect(tweet) {
  navigateTo(`/infinity/status/${tweet.id}`)
}
</script>