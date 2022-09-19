<template>
  <div >





   <v-autocomplete
       v-model="model"
       v-model:search="text"
       :items="sug"
       :loading="isLoading"
       @keyup.enter="query"
       hide-no-data
       flat clearable hide-details
       rounded
       hide-selected
       item-title="Description"
       item-value="API"
       label="搜索"
       placeholder="Search"
       prepend-inner-icon="mdi-magnify"
       return-object
   ></v-autocomplete>



  </div>
</template>
<script setup>
import {onMounted, watch} from 'vue'
import {useRouter} from '#app'
import {useFethGetSearchSuggestion} from '~/composables/Api/search'
let Router=  useRouter()
let model =ref(null)
let text = ref('')
let sug = ref(null)
let isLoading = ref(false)
const suggestion = async () => {
  isLoading.value = true
  sug.value = (await useFethGetSearchSuggestion(text.value)).data
  isLoading.value = false
}
const query =  ()=>{
  Router.push("/search/article/"+text.value)
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
onMounted(() => {
  watch(text, async () => {
    await debounceAjax()
  }, {immediate: true, deep: true})
})
</script>