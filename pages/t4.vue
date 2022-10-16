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

    <v-btn @click="defaultMsg('defaultMsg')">defaultMsg</v-btn>
    <v-btn @click="successMsg('successMsg')">successMsg</v-btn>
    <v-btn @click="infoMsg('infoMsg')">infoMsg</v-btn>
    <v-btn @click="errorMsg('errorMsg')">errorMsg</v-btn>
    <v-btn @click="warningMsg('warningMsg')">warningMsg</v-btn>
  </div>
</template>

<script setup lang="ts">

import {defaultMsg, successMsg, infoMsg, errorMsg, warningMsg} from '#imports'
import {shallowRef} from 'vue'
import CompA from './t4/a.vue'
import CompB from './t4/b.vue'

const current = shallowRef(CompA)
</script>

<style lang="scss">
@import "assets/sass/mdTheme/geek-black";
</style>