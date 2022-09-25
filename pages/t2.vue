<template>
  <h1>{{ c }}</h1>
  <h1>{{ stest.test }}</h1>
  <h1>{{ stest.count }}</h1>
  <v-btn @click="test()"></v-btn>
  <v-btn @click="stest.count++"></v-btn>
  text{{ text }}
  <v-text-field v-model="text"></v-text-field>
  <v-text-field v-model="stest.text"></v-text-field>
  stest.text {{ stest.text }}
</template>

<script setup lang="ts">
import {useStest} from '~/stores/storeTest'
import {ref} from 'vue'

let stest = useStest()
let c = stest.test
let text = ref(stest.text)
const test = () => {
  c.a++
  c.b++

}

</script>