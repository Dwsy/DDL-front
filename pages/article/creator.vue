<template>
  <div class="mt-4">
    <v-row>
      <v-col class="ml-6 d-creator-aside" cols="2">
        <v-card>
          <!--          {{ userStore.userInfo }}-->
          <div class="ml-4 mt-4">
            <v-avatar size=80>
              <v-img :src="userStore?.userInfo?.avatar"></v-img>
            </v-avatar>
            <span class="text-h6 pl-4">{{ userStore.user.nickname }}</span>
          </div>
          <v-divider class="mt-1"></v-divider>

          <div class="text-center">
            <v-btn class="w-75 mt-2 mb-2 text-white text-subtitle-2"
                   color="#1d9bf0" target="_blank" href="/article/editor/draft?new=true">
              写文章
            </v-btn>
          </div>
          <v-divider></v-divider>

          <v-list v-model:opened="open">
            <v-list-item prepend-icon="mdi-home" exact
                         title="首页" to="/article/creator/home/">

            </v-list-item>

            <v-list-group value="test">
              <template v-slot:activator="{ props }">
                <v-list-item
                    v-bind="props"
                    prepend-icon="mdi-format-list-bulleted-square"
                    title="内容管理"
                ></v-list-item>
              </template>

              <v-list-item
                  title="文章管理" to="/article/creator/content/article?state=all"
              ></v-list-item>
              <v-divider class="ml-6"></v-divider>
              <v-list-item
                  title="专栏管理"
              ></v-list-item>
              <v-divider class="ml-6"></v-divider>
              <v-list-item
                  title="文章管理"
              ></v-list-item>
              <!--              <v-list-group value="Admin">-->
              <!--                <template v-slot:activator="{ props }">-->
              <!--                  <v-list-item-->
              <!--                      v-bind="props"-->
              <!--                      title="Admin"-->
              <!--                  ></v-list-item>-->
              <!--                </template>-->

              <!--                <v-list-item-->
              <!--                    v-for="([title, icon], i) in admins"-->
              <!--                    :key="i"-->
              <!--                    :title="title"-->
              <!--                    :prepend-icon="icon"-->
              <!--                    :value="title"-->
              <!--                ></v-list-item>-->
              <!--              </v-list-group>-->

              <!--              <v-list-group value="Actions">-->
              <!--                <template v-slot:activator="{ props }">-->
              <!--                  <v-list-item-->
              <!--                      v-bind="props"-->
              <!--                      title="Actions"-->
              <!--                  ></v-list-item>-->
              <!--                </template>-->

              <!--                <v-list-item-->
              <!--                    v-for="([title, icon], i) in cruds"-->
              <!--                    :key="i"-->
              <!--                    :value="title"-->
              <!--                    :title="title"-->
              <!--                    :prepend-icon="icon"-->
              <!--                ></v-list-item>-->
              <!--              </v-list-group>-->
            </v-list-group>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="8" style="margin-left: 20%;">
        <nuxt-page :key="$route.fullPath"></nuxt-page>
      </v-col>

      <v-col>
        3
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from '~/stores/user'
import {ref} from 'vue'
import {useLayout} from '~/stores/layout'
import {definePageMeta} from '#imports'

definePageMeta(
    {
      // layout: false
    }
)
useLayout().showFooter = false
const userStore = useUserStore()
const test = ref(true)
</script>
<script lang="ts">
export default {
  data: () => ({
    open: ['Users'],
    admins: [
      ['Management', 'mdi-account-multiple-outline'],
      ['Settings', 'mdi-cog-outline'],
    ],
    cruds: [
      ['Create', 'mdi-plus-outline'],
      ['Read', 'mdi-file-outline'],
      ['Update', 'mdi-update'],
      ['Delete', 'mdi-delete'],
    ],
  }),
}
</script>

<style scoped>
.d-creator-aside {
  /*left: px;*/
  /*z-index: 1004;*/
  /*transform: translateX(0%);*/
  position: fixed;
  /*height: calc((100% - 48px) - 0px);*/
  top: 7.5%;
  bottom: 0;
  width: 15%;
}
</style>