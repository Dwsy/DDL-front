<template>


  <div>
    {{ articleStore.contentHtml }}
  </div>
</template>

<script setup lang="ts">
import {useArticleStore} from '~/stores/article/articleStore'

let articleStore = useArticleStore()
articleStore.init(9)

</script>