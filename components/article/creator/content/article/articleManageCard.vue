<template>
  <div v-for="(articleFiled, index) in articleFiledData" :key="articleFiled.id">
    <p class="text-h5 l-2" v-text="articleFiled.title">
    </p>
    <div :title="articleFiled.summary" class="text-medium-emphasis d-article-manage-summary">
      {{ articleFiled.summary }}
    </div>
    <div>
      <div
        class="float-right font-semibold"
        :style="{ color: ArticleStateColor[articleFiled.articleState] }"
      >
        {{ ArticleStateZh[articleFiled.articleState] }}
      </div>
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
      <v-dialog transition="">
        <template v-slot:activator="{ props }">
          <v-btn color="red" v-bind="props" variant="tonal"> 删除</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card max-width="30%" class="mx-auto">
            <v-toolbar title="删除文章确认"></v-toolbar>
            <v-card-text>
              <div class="text-h6 px-12">{{ articleFiled.title }}</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn color="#2a6e3f" variant="tonal" @click="isActive.value = false">取消</v-btn>
              <v-btn
                color="#c12c1f"
                variant="tonal"
                @click="
                  delArticle(articleFiled.id, articleFiled.articleState, index, () => {
                    isActive.value = false
                  })
                "
                >删除
              </v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
      <v-btn
        v-if="articleFiled.articleState === ArticleState.published"
        :href="`/article/${articleFiled.id}`"
        class="ml-2"
        color="#65318e"
        target="_blank"
        variant="tonal"
      >
        查看
      </v-btn>
    </div>
    <v-divider class="my-2"></v-divider>
  </div>
</template>

<script setup lang="ts">
import { clog } from '~/utils/clog'
import { dateFilter, errorMsg, getRandomColor, successMsg, timeAgoFilter } from '#imports'
import { inject, ref, Ref } from 'vue'
import { articleListData } from '~/types/article'
import { ArticleStateColor, ArticleStateZh, ArticleState } from '~/types/article/manageArticle'
import { useAxiosDeleteArticleById } from '~/composables/Api/article/manageArticle'

// const delDialogIsActive = ref()
const articleFiledData = inject<Ref<articleListData[]>>('manage-articleFiled')
const counts = inject<Ref<any>>('articleCounts')
// const articleFiledData = []

const delArticle = async (id: string, state: ArticleState, index: number, close) => {
  const { data: axiosResponse } = await useAxiosDeleteArticleById(id)
  if (axiosResponse.code === 0) {
    successMsg('删除文章成功')
  } else {
    errorMsg(axiosResponse.msg)
    return
  }

  articleFiledData.value.splice(index, 1)
  switch (state) {
    case ArticleState.published:
      counts.value.published--
      break
    case ArticleState.hide:
      counts.value.hide--
      break
    case ArticleState.auditing:
      counts.value.auditing--
      break
    case ArticleState.rejected:
      counts.value.rejected--
      break
  }
  counts.value.all--
  close()
}
</script>
