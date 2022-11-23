import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return UCGList
})
const UCGList = {
  code: 0,
  msg: '',
  data: [
    {
      id: '1',
      createTime: 1662733676287,
      userId: '3',
      groupName: '默认收藏夹',
      collectionNum: 10,
      groupOrder: 0,
      introduction: null,
    },
    {
      id: '12',
      createTime: 1665313222779,
      userId: '3',
      groupName: 'Test',
      collectionNum: 7,
      groupOrder: 0,
      introduction: '文章简介',
    },
    {
      id: '11',
      createTime: 1665301230561,
      userId: '3',
      groupName: 'Wasm',
      collectionNum: 4,
      groupOrder: 0,
      introduction: '文章简介',
    },
    {
      id: '9',
      createTime: 1665300951868,
      userId: '3',
      groupName: '后端开发',
      collectionNum: 2,
      groupOrder: 0,
      introduction: '文章简介',
    },
    {
      id: '10',
      createTime: 1665301177397,
      userId: '3',
      groupName: 'Myqsl相关',
      collectionNum: 2,
      groupOrder: 0,
      introduction: '文章简介',
    },
  ],
}
