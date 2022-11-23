<template>
  <div style="font-size: 18px">
    {{ message }}
  </div>
  <button v-if="url" @click="go()" class="d-cancel-btn mx-4 mt-1 px-3 py-1">立即跳转</button>

  <button @click="emits('cancel')" class="d-cancel-btn mt-1 px-3 py-1">取消跳转</button>
</template>

<script setup lang="ts">
// import {TYPE} from 'vue-toastification/src/ts/constants'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  // type: TYPE
  msg: string
  time: number
  url: string
}>()
const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'close-toast'): void
}>()
const message = ref()
let second = ref(props.time)
onMounted(() => {
  message.value = props.msg.replace('{{}}', second.value.toString())
  const interval = setInterval(() => {
    second.value--
    // console.log(second.value)
    message.value = props.msg.replace('{{}}', String(second.value))
  }, 1000)
  setTimeout(() => {
    clearInterval(interval)
    emits('close-toast')
  }, props.time * 1000)
})
const go = () => {
  window.location.href = props.url
}
</script>
<style scoped>
.d-cancel-btn {
  /* 文字颜色 */
  color: #ffffff;
  /* 清除背景色 */
  /*background: transparent;*/
  /* 边框样式、颜色、宽度 */
  background-color: #4d5aaf;
  /*border: 2px solid #000000;*/
  /* 给边框添加圆角 */
  border-radius: 6px;
  /* 字母转大写 */
  /*padding: 16px 32px;*/
  text-align: center;
  display: inline-block;
  font-size: 16px;
  /*margin: 4px 2px;*/
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
}

.d-cancel-btn:hover {
  background-color: #eb6101;
  color: white;
}
</style>
