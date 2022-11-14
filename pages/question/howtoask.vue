<template>
  <div>
    <Title>如何提问</Title>
    <v-card class="mx-16 px-16 mt-12">
      <p class="text-h3 text-center">如何提问</p>
      <div>
        <p class="text-h6">
          先搜索，再提问<br>
          提问前先在 Google、百度或者社区先行搜索。这样能更快地帮你找到答案。即使没找到，在看了相关或类似的问题之后，你的提问会更准确。
        </p>
        <!--        <client-only>-->
        <v-text-field append-inner-icon="mdi-magnify" single-linelabel="搜索你遇到的问题"
                      @click:append-inner="searchQuestion()" @keydown.enter="searchQuestion()"
                      v-model="SearchText" variant="outlined" class="my-3">
        </v-text-field>
        <!--        </client-only>-->
        <span class="text-h6 text-green">提问要求</span>
        <div class="d-answer-tip-recommend">
          <p class="card-text mdi">
            《
            <nuxt-link target="_blank" class="d-markdown-tip"
                       href="https://github.com/tvvocold/How-To-Ask-Questions-The-Smart-Way">
              提问的智慧
            </nuxt-link>
            》
          </p>
          <p class="card-text mdi">
            主题与编程技术、程序算法、开发工具相关
          </p>
          <p class="card-text mdi">
            标题清晰，不笼统，不做标题党
          </p>
          <p class="card-text mdi">
            内容包含问题的诉求，必要的运行环境、文本代码、运行截图、期望结果
          </p>
          <p class="card-text mdi">
            遵循
            <span>
                        《<nuxt-link href="/article/1" target="_blank" class="d-markdown-tip">
                          Markdown 语法排版
                        </nuxt-link>》
                      <v-icon size="x-large" class="mb-1">mdi-language-markdown-outline</v-icon></span>
            ，代码语义正确，易于阅读，准确使用标签关联问题
          </p>
          <p class="card-text mdi">
            多个问题请分别提问
          </p>
        </div>
        <span class="text-h6 text-red">不该问的</span>
        <div class="d-answer-tip-inappropriate">
          <p class="card-text mdi">
            别人已经问过的重复问题
          </p>
          <p class="card-text mdi">
            没有尝试寻找过答案，直接就问
          </p>
          <p class="card-text mdi">
            征询产品、服务推荐
          </p>
          <p class="card-text mdi">
            程序评比投票，没有结论的观点讨论
          </p>
          <p class="card-text mdi">
            任何与开发无关的问题
          </p>
        </div>
        <div class="d-answer-tip-comment">
          <p class="card-text mdi">
            或许最后得到的答案并不是你最想要的，但深思熟虑过的问题依旧可能会让你有其他方面的收获。每个人的成长都是一步步来的，所以，Keep
            an open mind。
          </p>
        </div>
        <div class="my-3">
          <v-btn color="#1aad19" variant="tonal" to="/question/ask" size="large">我已知晓，继续提问</v-btn>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router'
import {onMounted, ref} from 'vue'
import {useLayout} from '~/stores/layout'
import {useTheme} from 'vuetify'
import {definePageMeta} from '#imports'

definePageMeta({
  layout: false
})
const theme = useTheme()
const layout = useLayout()

const SearchText = ref('')

const router = useRouter()

onMounted(() => {
  layout.drawer = false
})
const searchQuestion = async () => {
  await router.push(`/search/question/${SearchText.value}`)
}
</script>

<style scoped>
.d-markdown-tip {
  border-bottom-color: #c2185b;
  border-bottom-width: 2px;
  border-bottom-style: dotted;
}

.d-answer-tip-card {
  font-size: 18px;
  border: 2px solid #1aad19;
  border-radius: 10px;
  padding: 15px;
}

.d-answer-tip-recommend {
  list-style: none;
}

.d-answer-tip-inappropriate {
  list-style: none;
}

.d-answer-tip-recommend p:before {
  content: "\F012C";
  font-size: 135%;
  color: v-bind('theme.global.name.value === "dark" ? "#41b883" : "#00c13c"') !important;
  font-weight: bold;
  margin-right: 3px;
}

.d-answer-tip-inappropriate p:before {
  content: "\F0156";
  font-size: 135%;
  color: red;
  font-weight: bold;
  margin-right: 3px;
}

.d-answer-tip-comment p:before {
  content: "\F064E";
  font-size: 135%;
  color: #40c4ff;
  font-weight: bold;
  margin-right: 5px;
}
</style>