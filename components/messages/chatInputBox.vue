<template>
  <v-container>
    <client-only>
      <v-toolbar density="compact" multiple>
        <emoji-picker @addEmoji="addEmoji">
          <template v-slot="{ activator }">
            <v-btn v-bind="activator" icon size="small">
              <v-icon> mdi-sticker-emoji</v-icon>
              <v-tooltip activator="parent" location="top"> 表情</v-tooltip>
            </v-btn>
          </template>
        </emoji-picker>
        <input
          id="file"
          accept="image/gif,image/jpeg,image/jpg,image/png"
          style="display: none"
          type="file"
          v-on:change="changeImgFile($event)"
        />
        <v-btn icon size="small" @click="openChangeFile">
          <v-icon> mdi-wallpaper</v-icon>
          <v-tooltip activator="parent" location="top"> 发送图片</v-tooltip>
        </v-btn>
        <v-btn icon @click="changeInputMode()">
          <v-icon v-if="chatsStore.enableMdMode"> mdi-language-markdown</v-icon>
          <v-icon v-else> mdi-language-markdown-outline</v-icon>
          <v-tooltip activator="parent" location="top">
            {{ chatsStore.enableMdMode ? '关闭' : '开启' }}markdown模式
          </v-tooltip>
        </v-btn>

        <v-dialog :open-on-click="false" v-model="previewMd">
          <template v-slot:activator="{ props }">
            <v-btn
              v-if="chatsStore.enableMdMode"
              key="reply"
              class="ml-1"
              icon
              v-bind="props"
              @click="openPreviewDialog"
            >
              <v-tooltip activator="parent" location="top"> 预览markdown</v-tooltip>
              <v-icon> mdi-eye</v-icon>
            </v-btn>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card class="px-4" style="margin-left: 15%; width: 70%">
              <div
                v-hljs="{ addCopy: false }"
                class="markdown-body mt-3"
                v-html="previewMdFn()"
              ></div>
              <v-card-actions>
                <v-btn block color="primary" @click="previewMd = false">关闭</v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-toolbar>
    </client-only>

    <v-textarea
      v-model="chatsStore.msg"
      :placeholder="`输入${chatsStore.enableMdMode ? 'Markdown格式' : '纯文本格式'}消息...`"
      clear-icon="mdi-close-circle"
      clearable
      fluid
      prepend-inner-icon="mdi-comment"
      rows="4"
    >
    </v-textarea>
    <v-btn class="float-end mx-6 mb-4" color="primary" @click="chatsStore.sendMessage()"
      >发送
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useChatsStore } from '~/stores/messages/chatsStore'
import EmojiPicker from '~~/components/common/emojiPicker.vue'
import { onMounted, ref, watch } from 'vue'
import { defaultMsg, successMsg, warningMsg } from '~/composables/utils/toastification'
import { useAxiosPostUploadPicture } from '~/composables/Api/user/settings'
import { changeThemes, themes } from '~/constant/markdownThemeList'
import { changeHighlightStyle } from '~/constant/highlightStyleList'
import { marked } from 'marked'
import { useTheme } from 'vuetify'
import { FileType } from '~/types/other/file'

const theme = useTheme()
const imgFile = ref()
const chatsStore = useChatsStore()
const previewMd = ref(false)
onMounted(async () => {
  await changeThemes(themes['hydrogen'], false)
  await changeHighlightStyle('after')
  watch(imgFile, (val) => {
    clog(val)
    // if(val){
    //   chatsStore.sendImg(val)
    // }
  })
})
const openPreviewDialog = () => {
  if (chatsStore.enableMdMode) {
    if (chatsStore.msg) {
      previewMd.value = true
    } else {
      warningMsg('请输入先内容')
    }
  } else {
    warningMsg('请先开启markdown模式')
  }
}
const previewMdFn = () => {
  return marked.parse(chatsStore.msg)
}
const addEmoji = (emojiStr) => {
  chatsStore.msg += emojiStr
}
const openChangeFile = () => {
  const element: HTMLElement = document.querySelector('#file')
  element.click()
}
const changeImgFile = async (e) => {
  const file = e.target.files[0]
  const { data: response } = await useAxiosPostUploadPicture(file, FileType.chat_image)
  if (response.code === 0) {
    const url = 'http://' + response.data + '?imageMogr2'
    await chatsStore.sendImg(url)
  } else {
    warningMsg('发送失败')
  }
}

const changeInputMode = () => {
  chatsStore.enableMdMode = !chatsStore.enableMdMode
  if (chatsStore.enableMdMode) {
    successMsg('开启markdown模式')
  } else {
    defaultMsg('关闭markdown模式')
  }
}
</script>

<style scoped>
:deep(.markdown-body code, .markdown-body pre) {
  font-family: sans-serif !important;
}
</style>
