<template>
  <template v-for="active in userThumbActiveList">
    <v-card target="_blank" :href="getHref(active)">
      <v-chip>
        {{ UserActiveTypeZh[active.userActiveType] }}
      </v-chip>
      <v-card-title>
        {{ active.title }}
      </v-card-title>
      <p>{{ timeAgoFilter(active.createTime) }}</p>
      <v-divider></v-divider>
      <p class="pa-3">{{ active.summary }}</p>
      <v-img v-if="active.banner" :src="active.banner" width="50%" class="rounded-xl"></v-img>
    </v-card>
    <v-divider></v-divider>
  </template>
</template>

<script setup lang="ts">
import { UserThumbActiveI, UserActiveTypeZh, UserActiveTypeEn } from '~/types/user/active'
import { timeAgoFilter } from '~/composables/useTools'

defineProps<{
  userThumbActiveList: UserThumbActiveI[]
}>()
const getHref = (active: UserThumbActiveI) => {
  switch (active.userActiveType) {
    case UserActiveTypeEn.UP_Article:
      return `/article/${active.id}`
      
    case UserActiveTypeEn.UP_Question:
      return `/question/${active.id}`
      
    case UserActiveTypeEn.UP_Question_Answer:
      return `/question/${active.id}`
      
    case UserActiveTypeEn.Thumb_Tweet:
      return `/infinity/status/${active.id}`
      
  }
}
</script>

<style></style>
