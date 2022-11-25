<template>
  <v-menu v-model="emojiPickerMenu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <slot :activator="props"></slot>
    </template>

    <EmojiPicker :native="true" @select="onSelectEmoji" />
  </v-menu>
</template>

<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { ref } from 'vue'

const emojiPickerMenu = ref(false)
const emit = defineEmits(['addEmoji'])

function onSelectEmoji(emoji) {
  emit('addEmoji', emoji.i)
}

// http://img//
const sendImg = () => {}
</script>

<style></style>
