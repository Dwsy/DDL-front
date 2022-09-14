<template>
  <div class="ma-4 pa-4">


      <v-card-text>
        <v-autocomplete
            v-model="model"
            v-model:search="text"
            :items="sug"
            :loading="isLoading"
            hide-no-data
            flat clearable hide-details
            hide-selected
            item-title="Description"
            item-value="API"
            label="搜索"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            return-object
        ></v-autocomplete>
      </v-card-text>






    <pre>{{ JSON.stringify(entries, null, 2) }}</pre>
  </div>
</template>
<script setup>
import {onMounted, watch} from 'vue'
let model =ref(null)
let text = ref('')
let sug = ref(null)
let isLoading = ref(false)
const search = async () => {
  isLoading.value = true
  sug.value = (await useAxiosGetSearchSuggestion(text.value)).data

  console.log(sug)
  isLoading.value = false
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
let debounceAjax = debounce(search, 800)
onMounted(() => {
  watch(text, async () => {
    await debounceAjax(search)
  }, {immediate: true, deep: true})
})
</script>