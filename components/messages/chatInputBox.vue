<template>
  <v-container class="mt-6">

    <v-textarea fluid placeholder="输入消息..." clearable v-model="chatsStore.sendMsg"
                clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                rows="4">
      <!--                auto-grow-->
    </v-textarea>
    {{ chatsStore.sendMsg }}
    <v-btn class="float-end mx-6 mb-4" color="primary" @click="chatsStore.sendMessage()">发送</v-btn>

  </v-container>
</template>

<script setup lang="ts">
import {useChatsStore} from '~/stores/messages/chatsStore'
import {ref} from 'vue'


const chatsStore = useChatsStore()
</script>

<style scoped>

</style>