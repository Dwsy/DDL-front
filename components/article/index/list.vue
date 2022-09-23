<template>
  <div>

      <v-card elevation="1" hover outlined transition="scroll-y-transition">
        <v-row no-gutters>
          <v-col class="px-4" cols="4">
            <div class="text-subtitle-1">
              <v-icon color="blue darken-2" size="small" class="pb-1">mdi-account-circle</v-icon>
              {{user.nickname}} | <span class="text-subtitle-2">{{dateFilter(createTime,"YYYY-MM-DD")}}</span>
              <nuxt-link v-for="tag in articleTags" :to="`/article/tag/${tag.id}`">
                <span class="text-subtitle-2 link" to="/tag"> /
                  {{tag.name}}
                </span>
              </nuxt-link>
            </div>
          </v-col>
        </v-row>
        <v-divider class="mx-3"></v-divider>

        <v-card :to="`/article/${id}`" >
          <v-row>
            <v-col cols="8">
              <v-row>
                <v-col>
                  <v-card-title>{{title}}</v-card-title>
                  <v-card-text>{{summary}}</v-card-text>
                </v-col>
              </v-row>
            </v-col>
            <v-col offset="2">
              <v-img :src="imgList[0]" transition="slide-y-reverse-transition" max-height="150" class="my-n3" :aspect-ratio="1"></v-img>
            </v-col>
          </v-row>
        </v-card>
      </v-card>

    <v-divider class="my-2"></v-divider>
  </div>
</template>
<script setup lang=ts >
import {dateFilter} from "#imports";
// import { articleListData } from '~~/types/article';
let imgList = ["https://tva1.sinaimg.cn/large/005NWBIgly1go817vkbb4j30vl0jencd.jpg",
  "https://tva1.sinaimg.cn/large/005NWBIgly1go8137lfsdj30rx0rw0up.jpg",
  "https://tva1.sinaimg.cn/large/005NWBIgly1gomphp0l22j31hc0u0wiq.jpg",
  "https://tva1.sinaimg.cn/large/005NWBIgly1go8137joftj30pc0oe75u.jpg",
  "https://tva1.sinaimg.cn/large/005NWBIgly1go8137mdujj30k70k70x2.jpg",
]

defineProps<articleListData>()


</script>

<script lang="ts">

export interface articleListData {
  banner: string;
  summary: string;
  articleState: string;
  title: string;
  user: User;
  allowComment: boolean;
  viewNum: number;
  collectNum: number;
  articleTags: ArticleTag[];
  articleGroup: ArticleGroup;
  id: string;
  createTime: String;
}
export interface UserInfo {
  id: number;
  avatar: string;
  sign: string;
  gender: string;
  birth?: any;
}

export interface User {
  id: number;
  nickname: string;
  userInfo: UserInfo;
  level: number;
}

export interface ArticleTag {
  id: number;
  name: string;
  articleNum: number;
  tagInfo: string;
}

export interface ArticleGroup {
  id: number;
  name: string;
  info: string;
  articleNum: number;
}


</script>

<style scoped>

</style> 