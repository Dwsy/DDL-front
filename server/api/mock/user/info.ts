import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  return userInfo
})
const userInfo = {
  code: 0,
  msg: '',
  data: {
    id: '3',
    avatar:
      'https://qiniu.dwsy.link/ddl/039bb69836944bc99e91dca3c906470c.jpg?imageMogr2/thumbnail/200x200',
    sign: 'sign123',
    gender: 'MALE',
    birth: 123123,
    level: 5,
  },
}
