<template>
  <div style="align-items: center; display: flex">
<!--    searchType: {{ searchType }}-->
    <v-autocomplete
      v-model="model"
      v-model:search="text"
      :items="sug"
      :loading="isLoading"
      @keyup.enter="query"
      hide-no-data
      flat
      clearable
      hide-details
      rounded
      hide-selected
      item-title="Description"
      item-value="API"
      variant="filled"
      :label="searchLabelText"
      placeholder="Search"
      prepend-inner-icon="mdi-magnify"
      return-object
    ></v-autocomplete>
    <v-btn
      v-if="searchType === 'question'"
      class="float-end ml-2"
      color="#4caf50"
      target="_blank"
      href="/question/howtoask"
      variant="text"
    >
      提问题
    </v-btn>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useRoute, useRouter } from '#app'
import {
  useAxiosGetArticleSearchSuggestion,
  useAxiosGetQuestionSearchSuggestion,
} from '~/composables/Api/search'

const Router = useRouter()
const route = useRoute()
const model = ref(null)
const text = ref('')
const sug = ref(null)
const searchLabelText = ref('')

const searchType = ref()
const isLoading = ref(false)
onMounted(async () => {
  watchEffect(() => {
    searchType.value = getSearchType()
  })
  watch(
    text,
    async () => {
      await debounceAjax(suggestion)
    },
    { immediate: true, deep: true }
  )
})
const getSearchType = () => {
  console.log(route)
  if (route.path.startsWith('/search')) {
    if (route.path.startsWith('/search/question')) {
      searchLabelText.value = '搜索问题'
      return 'question'
    } else if (route.path.startsWith('/search/article')) {
      searchLabelText.value = '搜索文章'
      return 'article'
    }
  } else if (route.path.startsWith('/question')) {
    searchLabelText.value = '搜索问题'
    return 'question'
  } else if (route.path.startsWith('/article')) {
    searchLabelText.value = '搜索文章'
    return 'article'
  }
  searchLabelText.value = '搜索文章'
  return 'article'
}
const suggestion = async () => {
  if (text.value === '') {
    return
  }
  isLoading.value = true
  if (searchType.value === 'article') {
    sug.value = (await useAxiosGetArticleSearchSuggestion(text.value)).data.data
  } else if (searchType.value === 'question') {
    sug.value = (await useAxiosGetQuestionSearchSuggestion(text.value)).data.data
  }
  isLoading.value = false
}
const query = () => {
  if (searchType.value === 'article') {
    Router.push({
      path:'/search/article',
      query: {
        s: text.value,
      },
    })
  } else if (searchType.value === 'question') {
    Router.push({
      path:'/search/question',
      query: {
        s: text.value,
      },
    })
  }
}
const debounce = (fun, delay) => {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}
let debounceAjax = debounce(suggestion, 800)
</script>
