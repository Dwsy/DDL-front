<template>
  <div v-for="(question, index) in questionDataList">
    <nuxt-link :to="`/question/${question.id}`" target="_blank">
      <v-card class="my-2 px-1 pt-1" elevation="0" color="#00000000">
        <v-row style="font-size: 110%">
          <v-col cols="2">
            <v-row>
              <v-col>
                <div style="font-size: 10px; color: #3271ae">回答:{{ question.answerNum }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div style="font-size: 10px; color: #007b43">关注:{{ question.watchNum }}</div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div style="font-size: 10px; color: #ec6800">浏览{{ question.viewNum }}</div>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="ml-n16">
            <a target="_blank" :href="/question/ + question.id" class="text-subtitle-1">
              <v-icon
                color="#37b24d"
                size="small"
                v-if="question.questionState === QuestionState.RESOLVED"
                >mdi-check-decagram</v-icon
              >
              {{ question.title }}</a
            >
            <v-divider></v-divider>
            <div class="float-left">
              <div class="text-subtitle-2">
                {{ question.summary }}
              </div>
              <v-chip-group>
                <v-chip
                  v-for="tag in question.questionTags"
                  :key="tag.id"
                  :color="getRandomColor()"
                  size="small"
                >
                  <v-icon> mdi-language-{{ tag.name.toLocaleLowerCase() }}</v-icon>
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </div>
            <div class="text-end">
              <span
                class="text-grey mr-2"
                style="font-size: 16px"
                :title="dateFilter(question.createTime, 'YYYY/MM/DD hh:mm')"
                v-if="
                  dateFilter(question.createTime, 'YYYY-MM-DD hh:mm') !==
                  dateFilter(question.lastModifiedTime, 'YYYY-MM-DD hh:mm')
                "
              >
                修改于：{{ timeAgoFilter(question.lastModifiedTime) }}
              </span>

              <span style="font-size: 16px"> {{ timeAgoFilter(question.createTime) }}发起提问</span>
              <div>
                <span :style="{ color: QuestionStateColor[question.questionState] }">
                  {{ QuestionStateZh[question.questionState] }}
                </span>
              </div>
              <a target="_blank" :href="`/user/${question.user.id}`">
                <span>{{ question.user.nickname }}</span>
                <v-avatar>
                  <v-img :src="question.user.userInfo.avatar"></v-img>
                </v-avatar>
              </a>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </nuxt-link>

    <v-divider></v-divider>
  </div>
  <!--  <div v-if="questionDataList?.length === 0" class="text-h5 text-center">空</div>-->
  <!-- {{
                      tag.name === 'C++'
                        ? 'mdi-language-cpp'
                        : `mdi-language-${tag.name.toLocaleLowerCase()}`
       }} -->
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import {
  Group,
  QuestionData,
  QuestionField,
  QuestionState,
  QuestionStateColor,
  QuestionStateZh,
  QuestionTag,
} from '~/types/question'
import { dateFilter, getRandomColor, timeAgoFilter } from '~/composables/useTools'
import { User } from '~/types/user'

defineProps<{ questionDataList: QuestionField[] }>()
</script>

<style scoped></style>
