<template>
  <div>

    <v-card elevation="1" outlined transition="scroll-y-transition">
      <!--    <v-card elevation="1" outlined transition="scroll-y-transition" :theme="theme">-->
      <v-row no-gutters>
        <v-col class="pl-2" cols="4">
          <div class="text-subtitle-1">
            <v-avatar class=" mr-2 ma-1">
              <v-img :src="user.userInfo.avatar"></v-img>
            </v-avatar>
            <!--              <v-icon color="blue darken-2" size="small" class="pb-1">mdi-account-circle</v-icon>-->
            <!--            {{ user.nickname }} | <span class="text-subtitle-2">{{ dateFilter(createTime, 'YYYY-MM-DD') }}</span>-->
            {{ user.nickname }} | <span class="text-subtitle-2">{{ timeAgoFilter(createTime) }}</span>
            <nuxt-link v-for="tag in articleTags" :to="`/article/tag/${tag.id}`">
                <span class="text-subtitle-2 link"> /
                  {{ tag.name }}
                </span>
            </nuxt-link>
          </div>
        </v-col>
      </v-row>
      <v-divider class="mx-3"></v-divider>

      <v-card target="_blank" :href="`/article/${id}`">
        <!--      <v-card target="_blank" :href="`/article/${id}`" :theme="theme">-->
        <v-row>
          <v-col cols="8">
            <v-row>
              <v-col>
                <v-row class="h-75">
                  <v-col>
                    <v-card-title>{{ title }}</v-card-title>
                    <v-card-text class="overflow-hidden ml-3 mb-n6"
                                 style="max-height: 75px;font-size: 19px;line-height:25px;color: #86909c">{{ summary }}
                    </v-card-text>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" class="ml-8 mt-4">
                    <!--                      <v-btn icon="true">-->
                    <v-icon size="x-small">mdi-eye-outline</v-icon>
                    <!--                      </v-btn>-->
                    <span class="text-subtitle-2 mx-1">{{ viewNum }}</span>
                    <!--                      <v-btn icon="true">-->
                    <v-icon size="x-small">mdi-comment-outline</v-icon>
                    <!--                      </v-btn>-->
                    <span class="text-subtitle-2 mx-1">{{ commentNum }}</span>
                    <!--                      <v-btn icon="true">-->
                    <v-icon size="x-small">mdi-heart-outline</v-icon>
                    <!--                      </v-btn>-->
                    <span class="text-subtitle-2 mx-1">{{ collectNum }}</span>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <!--              <v-img :src="imgList[Math.ceil(Math.random()*imgList.length)-1]" transition="slide-y-reverse-transition"-->
            <v-img :src="banner||imgList[Math.ceil(Math.random()*imgList.length)-1]"
                   transition="slide-y-reverse-transition" :aspect-ratio="16 / 6" :cover="true"
            ></v-img>

          </v-col>
        </v-row>
      </v-card>
    </v-card>

    <v-divider class="my-2"></v-divider>
  </div>
</template>
<script setup lang=ts>
import {dateFilter, useCookie} from '#imports'
import {articleListData} from '~/types/article'
import {onMounted, ref, watch} from 'vue'
import {useTheme} from 'vuetify'
import {timeAgoFilter} from '~/composables/useTools'

const cookieThemeState = useCookie('theme')
const theme = ref(cookieThemeState.value)
const themeInstance = useTheme()
//todo 优化
onMounted(() => {
  watch(themeInstance.global.name, (val) => {
    theme.value = val
  })
})
//todo 改用pinia
// import { articleListData } from '~~/types/article';
let imgList = ['https://tva1.sinaimg.cn/large/005NWBIgly1go817vkbb4j30vl0jencd.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1go8137lfsdj30rx0rw0up.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1gomphp0l22j31hc0u0wiq.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1go8137joftj30pc0oe75u.jpg',
  'https://tva1.sinaimg.cn/large/005NWBIgly1go8137mdujj30k70k70x2.jpg',
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
  commentNum: number
}


export interface UserInfo {
  id: string;
  avatar: string;
  sign: string;
  gender: string;
  birth?: any;
}

export interface User {
  id: string;
  nickname: string;
  userInfo: UserInfo;
  level: number;
}

export interface ArticleTag {
  id: string;
  name: string;
  articleNum: number;
  tagInfo: string;
}

export interface ArticleGroup {
  id: string;
  name: string;
  info: string;
  articleNum: number;
}


</script>

<style scoped>

</style> 