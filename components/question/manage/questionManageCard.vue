<template>
  <div v-for="question in ListContent">
    <v-card class="my-2 px-1 pt-1" elevation="0" color="#00000000">
      <v-row style="font-size: 110%">
        <v-col cols="2">
          <v-row>
            <v-col>
              <div style="font-size: 10px; color: #3271ae">
                回答:{{ question.answerNum }}
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div style="font-size: 10px; color: #007b43">关注:9999</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div style="font-size: 10px; color: #ec6800">
                浏览{{ question.viewNum }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="ml-n16">
          <a
              target="_blank"
              :href="/question/ + question.id"
              class="text-subtitle-1"
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
                <v-icon>
                  mdi-language-{{ tag.name.toLocaleLowerCase() }}
                </v-icon>
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
          </div>
          <div class="text-end">
            <span
                class="mr-2 text-grey"
                style="font-size: 16px"
                :title="dateFilter(question.createTime, 'YYYY/MM/DD hh:mm')"
                v-if="
                dateFilter(question.createTime, 'YYYY-MM-DD hh:mm') !==
                dateFilter(question.lastModifiedTime, 'YYYY-MM-DD hh:mm')
              "
            >
              修改于：{{ timeAgoFilter(question.lastModifiedTime) }}
            </span>

            <span style="font-size: 16px">
              {{ timeAgoFilter(question.createTime) }}发起提问</span
            >
            <div>
              <span
                  :style="{ color: QuestionStateColor[question.questionState] }"
              >
                {{ QuestionStateZh[question.questionState] }}
              </span>
              <v-btn
                  variant="tonal"
                  class="mx-2"
                  color="#028760"
                  :href="`/question/ask?id=${question.id}`"
                  target="_blank"
              >
                编辑
              </v-btn>
              <v-btn variant="tonal" color="red"> 删除</v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-divider></v-divider>
  </div>
  <div v-if="ListContent?.length === 0" class="text-center text-h5">空</div>
</template>

<script setup lang="ts">
import {inject, onMounted, Ref} from 'vue'
import {
  QuestionField,
  QuestionStateColor,
  QuestionStateZh,
} from '~/types/question'
import {
  dateFilter,
  getRandomColor,
  timeAgoFilter,
} from '~/composables/useTools'

const ListContent = inject<Ref<Array<QuestionField>>>(
    'QuestionFieldManageList'
)
</script>

<style scoped></style>
