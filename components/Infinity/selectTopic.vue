<template>
  <div>
    <v-chip-group>
      <template v-for="(topic, index) in infinityStore.infinityTopicList">
        <v-chip closable @click:close="delTopic(index)">{{ topic.name }}</v-chip>
      </template>
    </v-chip-group>

    <v-menu location="bottom" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn variant="tonal" color="#60a5fa" v-bind="props">
          <v-icon size="x-large"> mdi-music-accidental-sharp</v-icon>
          添加话题
        </v-btn>
      </template>

      <v-card width="600px" style="height: 60vh" class="pa-4">
        <v-text-field
          v-model="searchText"
          label="搜索话题"
          variant="solo"
          append-inner-icon="mdi-magnify"
        ></v-text-field>

        <v-dialog v-model="newTopicDialog">
          <template v-slot:activator="{ props }">
            <v-btn color="#c85179" class="mb-2" v-bind="props" variant="tonal"> 创建新话题</v-btn>
          </template>

          <v-card width="30%" class="mx-auto pa-3">
            <v-card-text class="align-center">发起话题</v-card-text>
            <v-text-field
              v-model="addTopicName"
              label="话题名称"
              variant="solo"
              :counter="100"
              :rules="[rules.length(100, '话题名称')]"
            ></v-text-field>
            <v-textarea
              v-model="addTopicDescription"
              label="话题描述"
              variant="solo"
              :counter="255"
              :rules="[rules.length(255, '话题描述')]"
            ></v-textarea>
            <v-card-actions class="justify-end">
              <v-btn color="red" @click="newTopicDialog = false">关闭</v-btn>
              <v-btn color="primary" @click="addTopic()" :disabled="disableAddTopicBtn"
                >创建并添加
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <div class="ml-3 text-bold text-lg">热门话题</div>
        <div class="border-2">
          <list v-for="(topic, index) in sug">
            <v-list-item @click="selectTopic(topic)">
              <!--            <span class="mr-2">{{ index + 1 }}</span>-->
              <span># {{ topic.name }}</span
              ><br />
              <div class="text-zinc-400">
                <span v-if="topic.scoreCount">
                  <v-icon color="#e83929">mdi-fire</v-icon> {{ topic.scoreCount }}热度 ·</span
                ><span>{{ topic.viewNum }}浏览·{{ topic.infinityNum }}讨论</span>
              </div>
            </v-list-item>
            <v-divider></v-divider>
          </list>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import { useRouter } from '#app'
import { onMounted, watch, ref, provide, watchEffect, Ref, toRefs } from 'vue'
import { useAxiosGetTagSuggestion } from '~/composables/Api/article/manageArticle'

import { defaultMsg } from '~/composables/utils/toastification'
import {
  InfinityTopicRankI,
  useAxiosGetInfinityTopicList,
  useAxiosGetInfinityTopicSearchSug,
  useAxiosGetToDayHotTopicList,
} from '~/composables/Api/infinity'
import { InfinityTopic } from '~/types/infinity'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { toReactive } from '#imports'
import { useAxiosPostCreateTopic } from '~/composables/Api/infinity/topic'
// import {ArticleTag} from '~/types/article'
// import {TagSuggestion} from '~/types/article/manageArticle'
const infinityStore = useInfinityStore()
const Router = useRouter()
// let model = ref(null)
const searchText = ref('')

const sug: Ref<InfinityTopic[] | InfinityTopicRankI[]> = ref([])
const isLoading = ref(false)
const readonly = ref(false)
const TagNumColor = ref('')
onMounted(async () => {
  // infinityTopicList.value =
  // clog()
  // const { data: axiosResponse } = await useAxiosGetToDayHotTopicList()
  // if (axiosResponse.code === 0) {
  //   sug.value = axiosResponse.data
  await infinityStore.loadHotTopic()
  sug.value = infinityStore.hotTopicList
  // }
  watchEffect(() => {
    // if (infinityTopicList.value.length >= 3) {
    //   if (infinityTopicList.value.length > 3) {
    //     infinityTopicList.value.pop()
    if (infinityStore.infinityTopicList.length >= 3) {
      if (infinityStore.infinityTopicList.length > 3) {
        infinityStore.infinityTopicList.pop()
        defaultMsg('最多可以关联三个话题')
      }
      readonly.value = true
      TagNumColor.value = 'red'
    } else {
      readonly.value = false
      TagNumColor.value = '#000'
    }
  })
  watch(
    searchText,
    async () => {
      if (searchText.value === '') {
        // sug.value = (await useFetchGetinfinityTopicList()).data
        isLoading.value = false
        //todo 推荐最近使用的标签
        return
      }
      await debounceAjax(suggestion)
    },
    { immediate: true, deep: true }
  )
})

const suggestion = async () => {
  if (searchText.value === '') {
    return
  }
  isLoading.value = true
  // const response = await useAxiosGetTagSuggestion(text.value)
  const { data: axiosResponse } = await useAxiosGetInfinityTopicSearchSug(searchText.value)

  if (axiosResponse.code === 0) {
    sug.value = axiosResponse.data
    isLoading.value = false
  }
  // response.data.data.forEach((item) => {
  //   sug.value.push(item.name)
  // })
  // sug.value = response.data.data
}
const query = () => {
  Router.push('/search/article/' + searchText.value)
}
const debounce = (fun, delay) => {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}
let debounceAjax = debounce(suggestion, 400)

const addTopicName = ref('')
const addTopicDescription = ref('')
const disableAddTopicBtn = computed(() => {
  if (addTopicName.value.length > 0 && addTopicDescription.value.length > 0) {
    return addTopicName.value.length >= 100 || addTopicDescription.value.length >= 255
  }
  return true
})
const addTopic = async () => {
  const { data: axiosResponse } = await useAxiosPostCreateTopic({
    name: addTopicName.value,
    description: addTopicDescription.value,
  })
  if (axiosResponse.code == 0) {
    successMsg('添加成功')
    addTopicName.value = ''
    addTopicDescription.value = ''
    infinityStore.infinityTopicList.push(axiosResponse.data)
    newTopicDialog.value = false
  } else {
    errorMsg(axiosResponse.msg)
  }
}
const selectTopic = (topic: InfinityTopic) => {
  infinityStore.infinityTopicList.push(topic)
}
const delTopic = (index: number) => {
  infinityStore.infinityTopicList.splice(index, 1)
}

const pilipala = `什么是话题
话题是哔哩哔哩提供的互动交流功能，你可以搜索、浏览或参与你感兴趣的话题，你也可以根据本规则发起新的话题，与小伙伴们一起展开讨论交流。
发起话题有什么好处
作为发起人，你的头像与昵称会展示在话题页，可能获得更多用户关注、参与共同感兴趣的话题。

优质话题将有机会被官方选中，获得投稿侧推荐、话题广场展示等更多权益。

话题创建规则（试运行）
话题长度限制为5-18个汉字，禁止超出长度限制。
话题名称首尾不需带井号键“#”。
话题禁止与已经存在的话题重复或类似。
请先进行关键词搜索，如果已存在类似话题，请直接在该话题下参与讨论。
话题应当有明确的讨论点或参与点，表述规范完整。
（✗）健康良性的消费观、你的猫咪

（✓）如何养成健康良性的消费观、你的猫咪都有过哪些迷惑行为

话题应该明确具体，禁止以名词或宽泛大类词命名。
（✗）美食、吃喝玩乐、鬼灭之刃、影视剧

（✓）有哪些夏日消暑美食推荐、盘点电视剧中的那些穿帮镜头

一个话题只应提出一个问题。
（✗）大家是因为什么喜欢上了二次元？考虑做相关的工作吗？

（✓）大家为什么喜欢二次元？

话题应具有公共讨论价值。
（✗）3年粉丝50，为何我的VLOG没人看

（✓）如何做出大家喜欢的VLOG

话题应基于客观事实，禁止主观臆断。
（✗）为什么当代少年儿童的素质越来越差
完整清晰的话题说明必不可少。
在话题说明中应当阐明话题的立意、核心问题与创作方向。话题说明应与话题名称保持一致，请勿在话题说明中提出新的问题或参与讨论。
禁止私自利用话题组织各类赛事、活动。
资讯类话题只允许部分有资质的用户发起与参与。
话题名称及说明中禁止出现奖励、引导关注、引导跳转到其他页面的信息。
话题名称及话题说明中禁止出现推广营销、求医问药、股票基金推荐、攻击引战、侮辱歧视等内容。
禁止发起官方话题，包含B站周年庆、拜年纪等B站运营管理范围内事项的话题。
每位用户每周仅有两次发起话题的机会(包括审核中的话题)，请谨慎使用。
不支持匿名发起话题或修改、删除话题名称及话题说明等操作，请在发起话题前仔细确认，确保内容准确无误。
特别提醒
1. 哔哩哔哩有权根据法律法规、国家政策、行业规范的变化和哔哩哔哩经营策略需求，对话题功能和/或话题页面进行管理或调整，或对本规则进行变更、中止或终止（同时在相关页面进行公布）。
2. 本功能仅供互动交流使用，未经哔哩哔哩书面同意，您不得以商业推广等目的使用话题功能。
3. 使用话题功能应遵守本规则以及 《哔哩哔哩弹幕网用户使用协议》、 《哔哩哔哩创作公约》 等哔哩哔哩的相关协议规范，不得违反法律法规、社会公序良俗或侵害他人的合法权益（包括但不限于著作权、商标权、肖像权、名誉权等）。
4. 如哔哩哔哩发现您存在违反上述约定的情况，哔哩哔哩有权采取包括但不限于取消话题发起权限、封禁账号、取消发起人在话题页的展示等措施。`

const newTopicDialog = ref()
</script>
