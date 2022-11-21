<template>
  <div class="home">
    显示的值{{ flag }}
    <button @click="changeHander">改变值</button>
  </div>
</template>
<!-- 只需要在script上添加setup -->
<script lang="ts" setup>
import {ref} from 'vue'

let flag = ref('开端-第一次循环')

let changeHander = (): void => {
  flag.value = '开端-第二次循环'
}
</script>
