<template>
  <v-container class="mt-6">

    <v-textarea fluid placeholder="评论点啥吧。" clearable v-model="sedMsg"
                clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                rows="4">
      <!--                auto-grow-->
    </v-textarea>
    <v-btn class="float-end mx-6 mb-4" color="primary" @click="chatsStore.sendMessage(sedMsg)">发送</v-btn>

  </v-container>
</template>

<script setup lang="ts">
import {useChatsStore} from '~/stores/messages/chatsStore'
import {ref} from 'vue'

const sedMsg = ref('123')
const chatsStore = useChatsStore()
</script>

<style scoped>

</style>