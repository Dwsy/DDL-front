<template>
  <div>
    <div class="text-center text-2xl">
      <h1>文章数据统计</h1>
      <div>
        <v-btn-toggle v-model="select" mandatory color="deep-purple-accent-3" rounded="0">
          <v-btn> 3日</v-btn>
          <v-btn> 7日</v-btn>
          <v-btn> 14日</v-btn>
          <v-btn> 30日</v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <div v-if="showViewChart">
      <v-row class="h-50">
        <v-col cols="12">
          <div class="viewChart">
            <Line :data="viewData" :options="options" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="viewChart">
            <Line :data="commentData" :options="options" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="viewChart">
            <Line :data="upAndDownData" :options="options" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <div class="viewChart">
            <Line :data="collectData" :options="options" />
          </div>
        </v-col>
      </v-row>
    </div>
    <div v-else class="text-2xl text-center mt-16">{{ tipText }}</div>
  </div>
</template>

<script lang="ts" setup>
import {
  ArticleStatisticsDataI,
  useAxiosGetArticleStatisticsData,
} from '~~/composables/Api/article/manageArticle'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { Ref } from 'vue'
import dayjs from 'dayjs'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

useHead({
  title: '文章统计',
  // script: [
  //   {
  //     src: 'https://cdn.bootcdn.net/ajax/libs/Chart.js/4.0.1/chart.min.js',
  //     body: true,
  //   },
  // ],
})
const options: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
}
const dateList = ref<string[]>([])
// {
//     label: 'Data One',
//     backgroundColor: '#f87979',
//     data: [40, 39, 10, 40, 39, 80, 40],
//   },
const viewData = ref({
  labels: dateList,
  datasets: [],
})
const commentData = ref({
  labels: dateList,
  datasets: [],
})
const upAndDownData = ref({
  labels: dateList,
  datasets: [],
})
const collectData = ref({
  labels: dateList,
  datasets: [],
})
const showViewChart = ref(false)
const articleStatisticsData: Ref<ArticleStatisticsDataI[]> = ref()
const select = ref(1)
const daysAgo = computed(() => {
  switch (select.value) {
    case 0:
      return 3
    case 1:
      return 7
    case 2:
      return 14
    case 3:
      return 30
    default:
      return 7
  }
})
const tipText = ref('加载中。。。')
onMounted(async () => {
  watchEffect(async () => {
    await loadData()
  })
})

const loadData = async () => {
  tipText.value = '加载中。。。'
  showViewChart.value = false
  const { data: r } = await useAxiosGetArticleStatisticsData(daysAgo.value)
  if (r.code == 0) {
    if (r.data == null) {
      tipText.value = `${daysAgo.value}日内没有文章数据`
      return
    }
    articleStatisticsData.value = r.data
  }
  let viewNumList = []
  let commentNumList = []
  let upNumList = []
  let downNumList = []
  let collectNumList = []
  dateList.value = []
  for (let i = 0; i < daysAgo.value; i++) {
    let date = dayjs().subtract(daysAgo.value, 'day').add(i, 'day').format('YYYY-MM-DD')
    dateList.value.push(date)
    // console.log(articleStatisticsData.value);

    viewNumList.push(articleStatisticsData.value[i]?.viewNum)
    commentNumList.push(articleStatisticsData.value[i]?.commentNum)
    upNumList.push(articleStatisticsData.value[i]?.upNum)
    downNumList.push(articleStatisticsData.value[i]?.downNum)
    collectNumList.push(articleStatisticsData.value[i]?.collectNum)
  }
  viewData.value.datasets = [
    {
      label: '浏览',
      backgroundColor: '#65318e',
      data: viewNumList,
    },
  ]
  commentData.value.datasets = [
    {
      label: '评论',
      backgroundColor: '#0095d9',
      data: commentNumList,
    },
  ]
  // upAndDownData.value.datasets = [
  //
  // ]
  upAndDownData.value.datasets = [
    {
      label: '点赞',
      backgroundColor: '#e2041b',
      data: upNumList,
    },
    {
      label: '点踩',
      backgroundColor: '#00',
      data: downNumList,
    },
  ]
  collectData.value.datasets = [
    {
      label: '收藏',
      backgroundColor: '#38b48b',
      data: collectNumList,
    },
  ]
  showViewChart.value = true
}
</script>

<style scoped>
.viewChart {
  position: relative;
  height: 200px;
  width: 100%;
}
</style>
