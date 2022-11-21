<template>
  <div>
    <v-card class="my-2" elevation="0">
      <v-row style="font-size: 110%">
        <v-col cols="2">
          <v-row>
            <v-col>
              <div style="font-size: 10px; color: #3271ae">
                回答:{{ answerNum }}
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
                浏览{{ viewNum }}
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="ml-n16">
          <a target="_blank" :href="/question/ + id" class="text-subtitle-1">
            {{ title }}</a
          >
          <v-divider></v-divider>
          <v-row>
            <v-col cols="8">
              <v-chip-group class="mt-7">
                <v-chip
                    v-for="tag in questionTags"
                    :key="tag.id"
                    :color="getRandomColor()"
                    size="small"
                >
                  <v-icon>
                    {{
                    tag.name === "C++"
                    ? "mdi-language-cpp"
                    : `mdi-language-${tag.name.toLocaleLowerCase()}`
                    }}
                  </v-icon>
                  {{ tag.name }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col offset="1" class="mt-2">
              <v-row>
                <v-col>
                  <v-avatar size="small">
                    <v-img :src="user.userInfo.avatar"></v-img>
                  </v-avatar>
                  <span class="text-blue-accent-1" style="font-size: 10px">{{
                    user.nickname
                  }}</span>
                  <!--                  <div> {{ dateFilter(createTime, 'MM月DD') }}～发起提问</div>-->
                  <div>{{ timeAgoFilter(createTime) }}～发起提问</div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script setup lang="ts">
import {Group, QuestionData, QuestionTag} from '~/types/question'
import {
  dateFilter,
  getRandomColor,
  timeAgoFilter,
} from '~/composables/useTools'
import {User} from '~/types/user'

interface Props {
  id: string;
  createTime: number;
  user: User;
  title: string;
  questionState: string;
  allowAnswer: boolean;
  answerNum: number;
  viewNum: number;
  collectNum: number;
  upNum: number;
  downNum: number;
  summary: string;
  questionTags: Array<QuestionTag>;
  codeHighlightStyle: string;
  markDownTheme: string;
  codeHighlightStyleDark: string;
  markDownThemeDark: string;
  group: Group;
}

defineProps<Props>()
</script>

<style scoped></style>
