<template>
  <v-menu v-model="emojiPickerMenu" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props"> mdi-sticker-emoji </v-icon>
    </template>
    <client-only>
      <EmojiPicker :native="true" @select="onSelectEmoji" />
    </client-only>
  </v-menu>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import { ref } from 'vue'

const emojiPickerMenu = ref(false)
const emit = defineEmits(['addEmoji'])

function onSelectEmoji(emoji) {
  emit('addEmoji', emoji.t)
}
</script>

<style></style>
