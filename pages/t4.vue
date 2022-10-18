<template>

  <div>


    <label><input type="radio" v-model="current" :value="CompA"/> A</label>
    <label><input type="radio" v-model="current" :value="CompB"/> B</label>
    <KeepAlive>
      <component :is="current"></component>
    </KeepAlive>
    <br/>

    <nuxt-link to="/t4/a">
      <v-btn>a</v-btn>
    </nuxt-link>
    <nuxt-link to="/t4/b">
      <v-btn>b</v-btn>
    </nuxt-link>
    <nuxt-loading-indicator></nuxt-loading-indicator>
    11111
    <keep-alive>

      <nuxt-page/>
    </keep-alive>


    <v-btn @click="test()" color="red">test</v-btn>
    <v-btn @click="defaultMsg('defaultMsg')">defaultMsg</v-btn>
    <v-btn @click="successMsg('successMsg')">successMsg</v-btn>
    <v-btn @click="infoMsg('infoMsg')">infoMsg</v-btn>
    <v-btn @click="errorMsg('errorMsg')">errorMsg</v-btn>
    <v-btn @click="warningMsg('warningMsg')">warningMsg</v-btn>
  </div>
</template>

<script setup lang="tsx">

import {defaultMsg, errorMsg, infoMsg, successMsg, warningMsg} from '#imports'
import {shallowRef} from 'vue'
import {TYPE} from 'vue-toastification/src/ts/constants'
import CompA from './t4/a.vue'
import CompB from './t4/b.vue'
import {useToast} from 'vue-toastification'
import {useRouter} from '#app'
import {VBtn} from 'vuetify/components/VBtn'
import {ComponentToastMsg} from '~/composables/utils/toastification'
import JumpPrompt from '~~/components/article/creator/content/article/Toast/jumpPrompt.vue'

let toast = useToast()

const current = shallowRef(CompA)
const test = () => {

  const timeout = setTimeout(() => {
    useRouter().push('/article/9')
  }, 5000)

  ComponentToastMsg('test', TYPE.SUCCESS, JumpPrompt, timeout)
  // const vNode: JSX.Element = (
  //     <div>
  //       更新成功5秒后跳转到文章
  //       <buton>取消</buton>
  //     </div>
  // )
  //
  // tsxToastMsg('test', TYPE.SUCCESS, vNode)
}
</script>

<style lang="scss">
@import "assets/sass/mdTheme/geek-black";
</style>