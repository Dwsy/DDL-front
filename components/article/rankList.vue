<template>
  <div style="position: relative; height: calc(85vh); width: 100%; overflow: auto">
    <template v-for="(articleData, rank) in data">
      <nuxt-link :href="`/article/${articleData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2" :style="{ color: getColor(rank) }">{{ rank + 1 }}</span
                >{{ articleData.title }}
              </div>
              <div class="text-neutral-500 summary">
                {{ articleData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ articleData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.commentNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-img :src="articleData.banner" cover :aspect-ratio="4 / 3"></v-img>
            </v-col>
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
    <template v-for="(articleData, rank) in data">
      <nuxt-link :href="`/article/${articleData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2">{{ rank + 1 }}</span
                >{{ articleData.title }}
              </div>
              <div class="text-neutral-500 summary">
                {{ articleData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ articleData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.commentNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-img :src="articleData.banner" cover :aspect-ratio="4 / 3"></v-img>
            </v-col>
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
    <template v-for="(articleData, rank) in data">
      <nuxt-link :href="`/article/${articleData.id}`" target="_blank">
        <v-list-item>
          <v-row>
            <v-col>
              <div class="text-lg">
                <span class="mr-2">{{ rank + 1 }}</span
                >{{ articleData.title }}
              </div>
              <div class="text-neutral-500 summary">
                {{ articleData.summary }}
              </div>
              <v-row align="end">
                <v-col cols="6" class="float-end">
                  <v-icon color="#e83929">mdi-fire</v-icon>{{ articleData.scoreCount }}
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-eye-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.viewNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-comment-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.commentNum }}</span>
                  <!--                      <v-btn icon="true">-->
                  <v-icon size="x-small">mdi-heart-outline</v-icon>
                  <!--                      </v-btn>-->
                  <span class="text-subtitle-2 mx-2">{{ articleData.collectNum }}</span>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="3">
              <v-img :src="articleData.banner" cover :aspect-ratio="4 / 3"></v-img>
            </v-col>
          </v-row>
        </v-list-item>
      </nuxt-link>
      <v-divider></v-divider>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ArticleRankDataI } from '~/composables/Api/article/rank'

defineProps<{
  data: ArticleRankDataI[]
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
  /* text-overflow: ellipsis; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
