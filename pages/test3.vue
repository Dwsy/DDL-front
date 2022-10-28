<template>
  <v-select prepend-icon="mdi-code-tags"
            label="代码高亮风格Base16" class="mx-2 mt-5"
            :items="HighlightStyleBase16NameList"
            :item-title="item => x(item )" :item-value="123"
            variant="underlined" v-model="highlightStyle"
  ></v-select>
</template>

<script setup lang="ts">
import {
  changeHighlightStyle,
  HighlightStyleNameList,
  HighlightStyleBase16NameList
} from '~~/constant/highlightStyleList'
import {ref} from 'vue'

const x = (item) => {
  console.log(item)
  return '123'
}
const highlightStyle = ref()
</script>

<style scoped>

</style>