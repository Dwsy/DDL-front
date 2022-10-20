<template>
  <div class="d-flex flex-column justify-space-between align-center">
    <v-select
        v-model="aspectRatio"
        :items="aspectRatios"
    ></v-select>
    <v-slider
        v-model="width"
        class="align-self-stretch"
        min="200"
        max="500"
        step="1"
    ></v-slider>

    <v-img
        :aspect-ratio="aspectRatio"
        :width="width"
        src="http://qiniu.dwsy.link/ddl/e486ed827a4c4fed92eaf449941af6f9.png?imageslim"
        :cover="true"
    ></v-img>
  </div>
</template>

<script setup lang="ts">
import ImgCutter from 'vue-img-cutter/src/components/ImgCutter'

const cutDown = (res) => {
  console.log(res)
}

</script>
<script lang="ts">
export default {
  data: () => ({
    width: 300,
    aspectRatio: 16 / 9,
    aspectRatios: [
      {
        title: '16/9',
        value: 16 / 9,
      },
      {
        title: '4/3',
        value: 4 / 3,
      },
      {
        title: '1/1',
        value: 1,
      },
    ],
  }),
}
</script>
<!--<style lang="scss">-->
<!--@import "~~/constant/MarkDownThemes/typora-purple-theme/purple-blue.scss";-->

<!--</style>-->

<!--<style lang="scss">-->
<!--@import "~~/constant/MarkDownThemes/typora-purple-theme/purple.scss";-->
<!--</style>-->

<!--<style lang="scss">-->
<!--@import "~~/constant/MarkDownThemes/typora-purple-theme/purple-classic.scss";-->
<!--</style>-->

<!--<style lang="scss">-->
<!--@import "~~/constant/MarkDownThemes/typora-purple-theme/purple-cesno.scss";-->
<!--</style>-->

<!--<style lang="scss">-->
<!--@import "~~/constant/MarkDownThemes/typora-purple-theme/purple-plain.scss";-->
<!--</style>-->

<!--<style lang="scss">-->
<!--@import "~~/constant/MarkDownThemes/typora-purple-theme/purple-green.scss";-->
<!--</style>-->