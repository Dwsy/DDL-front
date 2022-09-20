<template>
  {{paramId}}
</template>
  
<script setup lang=ts >
let paramId = useRoute().params.id
let Router=  useRouter()
if (paramId==undefined) {
  Router.push('/article')
}else{
  Router.push('/paramId')
}
</script>
  
<style scoped>

</style>