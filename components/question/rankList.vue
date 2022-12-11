<template>
  <div style="position: relative; height: calc(85vh); width: 100%; overflow: auto">
    <template v-for="(questionData, rank) in data">
      <nuxt-link :href="`/question/${questionData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2" :style="{ color: getColor(rank) }">{{ rank + 1 }}</span
                >{{ questionData.title }}
              </div>
              <div class="text-neutral-500 summary" :title="questionData.summary">
                {{ questionData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ questionData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.answerNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <!--            <v-col cols="3">-->
            <!--              <v-img :src="questionData.banner" cover :aspect-ratio="4 / 3"></v-img>-->
            <!--            </v-col>-->
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
    1//
    <template v-for="(questionData, rank) in data">
      <nuxt-link :href="`/article/${questionData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2">{{ rank + 1 }}</span
                >{{ questionData.title }}
              </div>
              <div class="text-neutral-500 summary">
                {{ questionData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ questionData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.answerNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <!--            <v-col cols="3">-->
            <!--              <v-img :src="questionData.banner" cover :aspect-ratio="4 / 3"></v-img>-->
            <!--            </v-col>-->
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
    <template v-for="(questionData, rank) in data">
      <nuxt-link :href="`/article/${questionData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2">{{ rank + 1 }}</span
                >{{ questionData.title }}
              </div>
              <div class="text-neutral-500 summary">
                {{ questionData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ questionData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.answerNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <!--            <v-col cols="3">-->
            <!--              <v-img :src="questionData.banner" cover :aspect-ratio="4 / 3"></v-img>-->
            <!--            </v-col>-->
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
    <template v-for="(questionData, rank) in data">
      <nuxt-link :href="`/article/${questionData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2">{{ rank + 1 }}</span
                >{{ questionData.title }}
              </div>
              <div class="text-neutral-500 summary">
                {{ questionData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ questionData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.answerNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ questionData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <!--            <v-col cols="3">-->
            <!--              <v-img :src="questionData.banner" cover :aspect-ratio="4 / 3"></v-img>-->
            <!--            </v-col>-->
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
    123
  </div>
</template>

<script setup lang="ts">
import { QuestionRankDataI } from '~/composables/Api/question/rank'
import { definePageMeta } from '#imports'

defineProps<{
  data: QuestionRankDataI[]
}>()

function getColor(num) {
  if (num === 0) {
    return 'red'
  } else if (num === 1) {
    return 'orange'
  } else if (num === 2) {
    return '#cd00e8'
  }
}
</script>

<style scoped>
.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
