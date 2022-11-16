<template>

  <v-menu
      v-model="emojiPickerMenu"
      :close-on-content-click="false"
  >
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon size="small">
        <v-icon>
          mdi-sticker-emoji
        </v-icon>
        <v-tooltip activator="parent" location="top">
          表情
        </v-tooltip>
      </v-btn>

    </template>

    <EmojiPicker :native="true" @select="onSelectEmoji"/>

  </v-menu>

</template>

<script setup lang="ts">
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import {ref} from 'vue'

const emojiPickerMenu = ref(false)
const emit = defineEmits(['addEmoji'])

function onSelectEmoji(emoji) {
  emit('addEmoji', emoji.i)
}

// http://img//
const sendImg = () => {

}
</script>

<style>

</style>