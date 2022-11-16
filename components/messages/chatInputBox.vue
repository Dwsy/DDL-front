<template>
  <v-container>


    <client-only>
      <v-toolbar density="compact" multiple>
        <emoji-picker @addEmoji="addEmoji"></emoji-picker>
        <input type="file" id="file" style="display:none;" v-on:change="changeImgFile($event)"
               accept="image/gif,image/jpeg,image/jpg,image/png">
        <v-btn icon size="small" @click="openChangeFile">
          <v-icon>
            mdi-wallpaper
          </v-icon>
          <v-tooltip activator="parent" location="top">
            发送图片
          </v-tooltip>
        </v-btn>
        <v-btn icon @click="chatsStore.enableMdMode=!chatsStore.enableMdMode">
          <v-icon v-if="chatsStore.enableMdMode">
            mdi-language-markdown
          </v-icon>
          <v-icon v-else>
            mdi-language-markdown-outline
          </v-icon>
          <v-tooltip activator="parent" location="top">
            {{ chatsStore.enableMdMode ? '关闭' : '开启' }}markdown模式
          </v-tooltip>
        </v-btn>
      </v-toolbar>
    </client-only>


    <v-textarea fluid placeholder="输入消息..." clearable v-model="chatsStore.msg"
                clear-icon="mdi-close-circle" prepend-inner-icon="mdi-comment"
                rows="4">
    </v-textarea>
    <v-btn class="float-end mx-6 mb-4" color="primary" @click="chatsStore.sendMessage()">发送</v-btn>

  </v-container>
</template>

<script setup lang="ts">
import {useChatsStore} from '~/stores/messages/chatsStore'
import EmojiPicker from '~~/components/common/emojiPicker.vue'
import {onMounted, ref, watch} from 'vue'
import {defaultMsg, successMsg, warningMsg} from '~/composables/utils/toastification'
import {useAxiosPostUploadAvatar} from '~/composables/Api/user/settings'
import mediumZoom from 'medium-zoom'
import {changeThemes, themes} from '~/constant/markdownThemeList'
import {changeHighlightStyle} from '~/constant/highlightStyleList'

const imgFile = ref()
const chatsStore = useChatsStore()

onMounted(async () => {
  await changeThemes(themes['hydrogen'], false)
  await changeHighlightStyle('github')
  watch(imgFile, (val) => {
    console.log(val)
    // if(val){
    //   chatsStore.sendImg(val)
    // }
  })
})
const addEmoji = (emojiStr) => {
  chatsStore.msg += emojiStr
}
const openChangeFile = () => {
  const element: HTMLElement = document.querySelector('#file')
  element.click()
}
const changeImgFile = async (e) => {
  const file = e.target.files[0]
  const {data: response} = await useAxiosPostUploadAvatar(file)
  if (response.code === 0) {
    const url = 'http://' + response.data + '?imageMogr2'
    await chatsStore.sendImg(url)
  } else {
    warningMsg('发送失败')
  }
}


</script>

<style scoped>

</style>