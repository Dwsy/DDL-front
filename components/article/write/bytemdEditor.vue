<template>
  <div class="main">
    <Editor :uploadImages="uploadImages" class="editor" :value="content" mode='split' :plugins="plugins"
            :locale='zhHans' @change="handleChange" placeholder="请输入。"/>
  </div>
</template>

<script setup lang="ts">
import 'bytemd/dist/index.css'
import 'highlight.js/styles/vs.css'
import 'juejin-markdown-themes/dist/devui-blue.min.css'
import {Editor} from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import gemoji from '@bytemd/plugin-gemoji'
import math from '@bytemd/plugin-math'
import breaks from '@bytemd/plugin-breaks'
import mermaid from '@bytemd/plugin-mermaid'
import {onMounted, reactive, ref, watch} from 'vue'
import {useAxiosPostUploadImg} from '~/composables/Api/article/manageArticle'
import {successMsg, warningMsg} from '~/composables/utils/toastification'

let props = defineProps({
  content: {
    type: String,
    default: '1'
  }
})
const emit = defineEmits(['changeText'])
// const content = ref('')
const bytemdZIndex = ref(0)
onMounted(() => {
  const bytemdElement = document.getElementsByClassName('bytemd')[0]
  let bytemdClassList = ref(bytemdElement.classList)
  let observer = new MutationObserver((e) => {
    if (bytemdElement.classList.contains('bytemd-fullscreen')) {
      bytemdZIndex.value = 9999
    } else {
      bytemdZIndex.value = 0
    }
  })
// 监听body元素的属性变化
  observer.observe(bytemdElement, {
    attributes: true
  })
// 更改body元素的class，会异步执行创建MutationObserver对象时传入的回调函数
  document.body.className = 'main'
// 控制台输出：
//    修改了body属性
//    change
  // watch(bytemdClassList, (value) => {
  //   console.log(value)
  // })
})


const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  gemoji(),
  math(),
  mermaid(),
  breaks(),
  footnotes(),
  frontmatter()
]

const handleChange = (text) => {
  emit('changeText', text)
  // props.content = v
}
// md 图片上传
const uploadImages = async (files) => {
  const response = await upload(files)
  return [
    {
      title: files.map((i) => i.name),
      url: 'https://' + response.data + '?imageslim'
    },
  ]
}
const upload = async (files) => {
  console.log(files)
  const {data: response} = await useAxiosPostUploadImg(files[0])
  if (response.code === 0) {
    successMsg('上传成功')
    return response
  } else {
    warningMsg(response.msg)
    return null
  }
  // const res = await $api.uploadArcImg(formData)
  // if (res.code !== 200) return message.error(res.msg)
  // return res.data
}
</script>

<style lang="scss" scoped>
::v-deep(.bytemd) {
  z-index: v-bind(bytemdZIndex);
  height: calc(100vh - 5rem) !important;
}
</style>