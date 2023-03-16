<template>
  <div>
    <ClientOnly>
      <div v-if="data">
        <MlHeatmap :data="data" lang="cn" :tip1="tip1" :tip2="tip2" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// import { MlHeatmap } from '~/components/ml-heatmap/dist/heatmap.es'
// import '~/components/ml-heatmap/dist/style.css'
import { MlHeatmap } from 'ml-heatmap'
import 'ml-heatmap/dist/style.css'
// import '~/components/ml-heatmap/dist/style.css'
import { ref } from 'vue'
import { ResponseData } from '~/types/utils/axios'
import { useGet } from '~/composables/useAxios'
// illustration: { type: Boolean, default: true },
// year: { default: hooks().year() },
// locale: { default: "en" },
// levelColor: { default: () => ["#EBEDF0", "#9BE9A8", "#40C463", "#30A14E", "#216E39"] },
// level: { default: () => [1, 4, 8, 12] },
// data: { default: () => [] }
// tip1	方格 hover 有数据时的提示文本
// {0} - 数据占位符
// {1} - 日期占位符	{0} contributions on {1}
// tip2	方格 hover 无数据时的提示文本
// {0} - 数据占位符
// {1} - 日期占位符	No contributions on {1}
interface HeatmapDataI {
  date: string
  count: number
}

const tip1 = '获得{0}积分在: {1}'
const tip2 = '未获得积分: {1}'
const data = ref<HeatmapDataI[]>()
// [
// {
//   date: '2022-01-12',
//   count: 1,
// },
// {
//   date: '2022-03-23',
//   count: 5,
// },
// {
//   date: '2022-04-22',
//   count: 4,
// },
// {
//   date: '2022-05-13',
//   count: 6,
// },
// {
//   date: '2022-07-12',
//   count: 12,
// },
// {
//   date: '2022-09-23',
//   count: 5,
// },
// ]
onMounted(async () => {
  const { data: axiosResponse } = await useGet('user/points/heatmap')
  data.value = axiosResponse['data']
  // if (axiosResponse.code === 0) {
  //
  // }
  // console.log(axiosResponse)
})
</script>
