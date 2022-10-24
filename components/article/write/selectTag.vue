<template>
  <!--  -->
  <div>
    <v-autocomplete v-model="articleTagList" v-model:search="text" :items="sug" :loading="isLoading"
                    @keyup.enter="query" variant="underlined"
                    hint="搜索标签" hide-no-data flat clearable hide-details rounded
                    :readonly="readonly"
                    chips closable-chips multiple dense item-title="name" item-value="name"
                    label="搜索添加标签" prepend-inner-icon="mdi-magnify"
                    return-object>
    </v-autocomplete>
    <!--    fixme https://github.com/vuetifyjs/vuetify/pull/15871-->
    <div class="pt-2">
      <span v-show="!readonly" class="text-grey-darken-1">你还可以添加{{ 3 - articleTagList.length }}个标签</span>
      <!--      <span v-show="readonly" class="text-red-accent-2">最多可以添加三个标签</span>-->
      <span class="float-right TagNum">{{ `${articleTagList.length}/3` }}</span>
    </div>

    <!--    model{{ model }}-->
    <!--    sug{{ sug }}-->
    <!--    text{{ text }}-->
  </div>

</template>
<script setup lang="ts">
import {useRouter} from '#app'
import {useFetchGetSearchSuggestion} from '~/composables/Api/search'
import {onMounted, watch, ref, inject, watchEffect} from 'vue'
import {useAxiosGetTagSuggestion} from '~/composables/Api/article/manageArticle'
import {useFetchGetArticleTagList} from '~/composables/Api/article'
// import {ArticleTag} from '~/types/article'
// import {TagSuggestion} from '~/types/article/manageArticle'

const Router = useRouter()
// let model = ref(null)
const text = ref('')
const sug = ref([])
const isLoading = ref(false)
const {articleTagList} = inject('tagList')
const readonly = ref(false)
const TagNumColor = ref('')
onMounted(() => {
  // articleTagList.value =
  // console.log()
  watchEffect(() => {
    if (articleTagList.value.length >= 3) {
      readonly.value = true
      TagNumColor.value = 'red'
    } else {
      readonly.value = false
      TagNumColor.value = '#000'
      // console.log('f')
    }
  })
  watch(text, async () => {
    if (text.value === '') {
      sug.value = (await useFetchGetArticleTagList()).data
      isLoading.value = false
      //todo 推荐最近使用的标签
      return
    }
    await debounceAjax(suggestion)
  }, {immediate: true, deep: true})
})


const suggestion = async () => {
  if (text.value === '') {
    return
  }
  isLoading.value = true
  const response = await useAxiosGetTagSuggestion(text.value)
  // sug.value = []
  // response.data.data.forEach((item) => {
  //   sug.value.push(item.name)
  // })
  sug.value = response.data.data
  isLoading.value = false
}
const query = () => {
  Router.push('/search/article/' + text.value)
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
<style scoped>
.TagNum {
  color: v-bind(TagNumColor);
}
</style>

