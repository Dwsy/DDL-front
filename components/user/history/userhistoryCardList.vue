<template>
  <v-card
    v-for="active in userHistoryDataList"
    target="_blank"
    :href="getHref(active)"
    class="pa-4 my-2"
  >
    <div class="text-bold text-lg">
      {{ active.title }}
    </div>
    <a target="_blank" :href="`/user/${active.user.id}`">
      <p class="">
        <v-avatar>
          <v-img :src="active.user.userInfo.avatar"></v-img>
        </v-avatar>
        <span>
          {{ active.user.nickname }}
        </span>
        <v-chip class="mb-1" :color="getColor(active)">
          {{ UserActiveTypeZh[active.userActiveType] }}
        </v-chip>
      </p>
    </a>
    <div></div>
    <v-divider></v-divider>
    <v-row style="max-height: 200px">
      <v-col cols="8">
        <p class="py-2 text-neutral-500">
          {{ active.summary }}
        </p></v-col
      >
      <v-col cols="4" class="">
        <v-img
          v-if="active.banner"
          :src="active.banner"
          class="rounded-lg"
          alt=""
          style="height: 195px"
        />
      </v-col>
    </v-row>
    {{ timeAgoFilter(active.createTime) }}
  </v-card>
</template>

<script setup lang="ts">
import { UserThumbActiveI, UserActiveTypeZh, UserActiveTypeEn } from '~/types/user/active'
import { timeAgoFilter } from '~/composables/useTools'
import { UserHistoryI } from '~/composables/Api/user/history'

defineProps<{
  userHistoryDataList: UserHistoryI[]
}>()
const getHref = (active: UserHistoryI) => {
  switch (active.userActiveType) {
    case UserActiveTypeEn.Browse_Article:
      return `/article/${active.id}`

    case UserActiveTypeEn.Browse_Infinity:
      return `/infinity/status/${active.id}`

    case UserActiveTypeEn.Browse_QA:
      return `/question/${active.id}`
  }
}
const getColor = (active: UserHistoryI) => {
  switch (active.userActiveType) {
    case UserActiveTypeEn.Browse_Article:
      return '#ec6800'

    case UserActiveTypeEn.Browse_Infinity:
      return '#419aff'

    case UserActiveTypeEn.Browse_QA:
      return '#316745'
  }
}
</script>

<style></style>
