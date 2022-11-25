<template>
  <div v-for="articleFiled in articleFiledData">
    <p class="text-h5 l-2">
      {{ articleFiled.title }}
      <!--        <v-divider class="my-2"></v-divider>-->
    </p>
    <div :title="articleFiled.summary" class="text-medium-emphasis d-article-manage-summary">
      {{ articleFiled.summary }}
    </div>
    <div>
      <v-chip-group>
        <v-chip v-for="tag in articleFiled.articleTags" :key="tag.id" size="small">
          <v-icon :color="getRandomColor()">
            {{
              tag.name === 'C++'
                ? 'mdi-language-cpp'
                : `mdi-language-${tag.name.toLocaleLowerCase()}`
            }}
          </v-icon>
          {{ tag.name }}
        </v-chip>
      </v-chip-group>
    </div>
    <div class="text-end">
      <div class="float-left">
        <v-icon size="x-small">mdi-eye-outline</v-icon>

        <span class="text-subtitle-2 mx-1">{{ articleFiled.viewNum }}</span>

        <v-icon size="x-small">mdi-comment-outline</v-icon>

        <span class="text-subtitle-2 mx-1">{{ articleFiled.commentNum }}</span>

        <v-icon size="x-small">mdi-heart-outline</v-icon>

        <span class="text-subtitle-2 mx-1">{{ articleFiled.collectNum }}</span>
      </div>
      <span
        v-if="
          dateFilter(articleFiled.createTime, 'YYYY-MM-DD hh:mm') !==
          dateFilter(articleFiled.lastModifiedTime, 'YYYY-MM-DD hh:mm')
        "
        :title="dateFilter(articleFiled.createTime, 'YYYY/MM/DD hh:mm')"
        class="text-grey mr-2"
        style="font-size: 16px"
      >
        修改于：{{ timeAgoFilter(articleFiled.lastModifiedTime) }}
      </span>
      <span style="font-size: 16px"
        >创建于：{{ dateFilter(articleFiled.createTime, 'YYYY/MM/DD hh:mm') }}</span
      >
      <v-btn
        :href="`/article/editor/draft?id=${articleFiled.id}`"
        class="mx-2"
        color="#028760"
        target="_blank"
        variant="tonal"
      >
        编辑
      </v-btn>
      <v-dialog transition="dialog-bottom-transition">
        <template v-slot:activator="{ props }">
          <v-btn color="red" v-bind="props" variant="tonal"> 删除 </v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card max-width="30%" class="mx-auto">
            <v-toolbar title="删除文章确认"></v-toolbar>
            <v-card-text>
              <div class="text-h6 px-12">{{ articleFiled.title }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="#2a6e3f" variant="tonal" @click="isActive.value = false">取消 </v-btn>
              <v-btn color="#c12c1f" variant="tonal" @click="isActive.value = false">删除 </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { dateFilter, getRandomColor, timeAgoFilter } from '#imports'
import { inject, Ref } from 'vue'
import { articleListData } from '~/types/article'

const articleFiledData = inject<Ref<articleListData[]>>('manage-articleFiled')
// const articleFiledData = []
</script>

<style scoped></style>