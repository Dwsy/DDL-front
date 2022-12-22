# 欢迎使用 ML HeatMap

一个基于 Vue3 + Vite2 + Typescript 的仿造 GitHub 热力图的UI组件。
![image](https://user-images.githubusercontent.com/34913418/154430134-81e5bffc-206f-4885-bf5a-705c5ddbfcc2.png)

安装：

```bash
npm i ml-heatmap
```

使用方法：

```vue
<script setup lang="ts">
import {MlHeatmap} from 'ml-heatmap'
import 'ml-heatmap/dist/style.css'
</script>

<template>
  <ml-heatmap :data="[]" />
</template>
```

参数配置：

| Params       | Desc                                                         | Default                                                 |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------- |
| illustration | 是否打开图解                                                 | true                                                    |
| year         | 数据当前年份<br />e.g. `2022`                                | current year                                            |
| locale       | 语言(中英)<br />e.g. `en` `cn`                               | en                                                      |
| levelColor   | 等级颜色数组<br />e.g. [x, x, x, x, x]                       | ['#EBEDF0', '#9BE9A8', '#40C463', '#30A14E', '#216E39'] |
| level        | 等级数组，默认五级(第一级为0)，只需填写后四级即可<br />e.g. [1, 2, 3, 4] | [1, 4, 8, 12]                                           |
| data         | 热力图数据，数据为一年中的所有数据(365/366天的数据)<br />e.g. [<br />{date: '2022-01-12',<br />count: 1}, ......<br />} | []                                                      |
| title        | 标题                                                         | ""                                                      |
| tip1         | 方格 hover 有数据时的提示文本 <br />{0} - 数据占位符<br />{1} - 日期占位符 | {0} contributions on {1}                                |
| tip2         | 方格 hover 无数据时的提示文本<br />{0} - 数据占位符<br />{1} - 日期占位符 | No contributions on {1}                                 |



主要依赖：

| Dependencies | Version |
| :----------- | ------- |
| Vue          | ^3.2.25 |
| Vite         | ^2.8.0  |
| Element-Plus | ^2.0.2  |
| Moment       | ^2.29.1 |



