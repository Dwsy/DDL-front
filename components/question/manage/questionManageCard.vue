<template>
  <div v-for="(question, index) in ListContent">
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
              <div style="font-size: 10px; color: #007b43">关注:9999</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div style="font-size: 10px; color: #ec6800">浏览{{ question.viewNum }}</div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="ml-n16">
          <a
            target="_blank"
            :href="/question/ + question.id"
            v-if="showViewBtn(question)"
            class="text-subtitle-1"
          >
            {{ question.title }}</a
          >
          <p v-else class="text-subtitle-1">
            {{ question.title }}
          </p>
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
              <v-btn
                variant="tonal"
                class="mx-2"
                color="#028760"
                :href="`/question/ask?id=${question.id}`"
                target="_blank"
              >
                编辑
              </v-btn>
              <v-btn
                class="mr-2"
                variant="tonal"
                color="red"
                @click="openDelQuestionDialog(question, index)"
              >
                删除
              </v-btn>
              <v-btn
                variant="tonal"
                color="#9d5b8b"
                :to="`/question/${question.id}`"
                target="_blank"
                v-if="showViewBtn(question)"
              >
                查看
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-divider></v-divider>
  </div>
  <v-dialog v-model="delDialog">
    <template v-slot:default="{ isActive }">
      <v-card max-width="30%" class="mx-auto">
        <v-toolbar title="删除问题确认"></v-toolbar>
        <v-card-text>
          <div class="text-h6 px-12">{{ delField.title }}</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn color="#2a6e3f" variant="tonal" @click="isActive.value = false">取消</v-btn>
          <v-btn color="#c12c1f" variant="tonal" @click="delQuestion()">删除</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <div v-if="ListContent?.length === 0" class="text-h5 text-center">空</div>
</template>

<script setup lang="ts">
import { inject, ref, Ref } from 'vue'
import { QuestionField, QuestionState, QuestionStateColor, QuestionStateZh } from '~/types/question'
import { dateFilter, getRandomColor, timeAgoFilter } from '~/composables/useTools'
import { useAxiosDelQuestionById } from '~/composables/Api/question/manageQuestion'

const ListContent = inject<Ref<Array<QuestionField>>>('QuestionFieldManageList')

const delDialog = ref(false)
const delField = ref<QuestionField>()
const delFieldIndex = ref<number>()

const openDelQuestionDialog = (questionField: QuestionField, index: number) => {
  delField.value = questionField
  delFieldIndex.value = index
  delDialog.value = true
}

const delQuestion = async () => {
  const { data: response } = await useAxiosDelQuestionById(delField.value?.id)
  if (response.code === 0) {
    if (response.data) {
      ListContent.value.splice(delFieldIndex.value, 1)
      delDialog.value = false
    } else {
      errorMsg('删除失败')
    }
  } else {
    errorMsg(response.msg)
  }
}
const showStatus = ['ASK', 'RESOLVED', 'HAVE_ANSWER', 'UNRESOLVED']
const showViewBtn = (question: QuestionField) => {
  // console.log(showStatus)
  console.log(question.questionState)
  return showStatus.indexOf(question.questionState) != -1
}
</script>

<style scoped></style>
