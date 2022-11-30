<template>
  <client-only>
    <v-row v-if="tweet">
      <!--      <TweetItemHeader :tweet="props.tweet" :id="tweet.id" />-->
      <v-col style="max-width: 4%; flex: 0 0 4%" class="pl-6 pt-6" :id="tweet.id">
        <!--        <div>-->
        <v-avatar size="52" style="z-index: 10" class="mb-2">
          <v-img :src="tweet.user.userInfo.avatar"></v-img>
        </v-avatar>
        <div class="d-tw-timeLine" :style="{ height: timeLineHeight }" v-if="timeLine"></div>
        <!--          <div class="ml-3">-->

        <!--          </div>-->
        <!--        </div>-->
      </v-col>
      <v-col>
        <!--        <div :class="tweetBodyWrapper">-->
        <div class="mt-4" style="margin-left: 5%">
          <span class="font-medium text-gray-800 dark:text-white">{{ tweet.user.nickname }}</span>
          <span class="text-gray-400 text-sm dark:text-white"
            >&nbsp&nbsp{{ timeAgoFilter(tweet.createTime) }}</span
          >
          <div v-if="tweet?.parentUserId != null" class="text-sm">
            <span>回复&nbsp</span
            ><a target="_blank" :href="`/user/${tweet.parentUserId}`">
              <span class="text-sky-500">@{{ tweet.replyUserName }}</span>
            </a>
          </div>
          <div
            :class="textSize"
            class="w-auto flex-shrink font-medium text-gray-800 dark:text-white d-t-content"
          >
            {{ props.tweet.content }}
            <template v-for="p in props.tweet.infinityTopics">
              <p class="text-sky-500">#{{ p.name }}</p>
            </template>
          </div>

          <template v-if="hasImg">
            <vue-easy-lightbox
              :visible="visibleRef"
              :imgs="tweet.imgUrlList"
              :index="ShowIndex"
              :loop="true"
              :moveDisabled="true"
              :scrollDisabled="false"
              @hide="onHide"
              :zoomScale="0.3"
            >
            </vue-easy-lightbox>
            <div class="SongList mt-3">
              <!--        //用v-for循环渲染缩略图-->
              <v-row>
                <v-col cols="10" class="ml-3">
                  <v-row class="covers" :style="{ display: MinDisplay }">
                    <v-col
                      :cols="getImgCol"
                      class="cover"
                      style="padding: 1px"
                      v-for="(img, index) in tweet.imgUrlList"
                      :key="img"
                    >
                      <v-img
                        :src="img"
                        class="min rounded-lg"
                        @click.stop="ZoomIn(index)"
                        cover
                        aspect-ratio="1"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <!--        //渲染放大后的图-->
              <div class="max d-img-max" :style="{ display: display }">
                <div class="pa-2">
                  <v-btn variant="tonal" color="#448623" @click.stop="viewImg()">
                    <v-icon size="large">mdi-magnify</v-icon>
                    <span class="text-subtitle-1">查看大图</span>
                  </v-btn>
                </div>
                <div
                  v-for="(img, index) in tweet.imgUrlList"
                  :key="img"
                  style="height: 100%; width: 100%"
                  class="d-img-max-content"
                  :class="[index === ShowIndex ? 'active' : 'None']"
                >
                  <v-img :src="img" @click.stop="ZoomOut" width="100%" />
                  <div v-if="index !== 0" class="d-img-prev" @click.stop="ShowIndex--"></div>
                  <div
                    v-if="index !== tweet.imgUrlList.length - 1"
                    class="d-img-next"
                    @click.stop="ShowIndex++"
                  ></div>
                </div>
                <!--          //放大后图片下方的导航图-->
                <div class="small">
                  <div
                    :class="[{ smallActive: index === ShowIndex }, 'cover-small']"
                    v-for="(img, index) in tweet.imgUrlList"
                    :key="img"
                    @click.stop="select(index)"
                  >
                    <v-img :src="img" width="100%" />
                  </div>
                </div>
              </div>
            </div>
          </template>

          <v-row class="mt-1" v-if="tweet.infinityClub != null">
            <v-col>
              <div>
                <v-chip class="mr-2" prepend-icon="mdi-eye" color="blue">
                  <span class="text-base"> {{ tweet.upNum }}次查看</span>
                </v-chip>
                <v-chip prepend-icon="mdi-infinity" color="red">
                  <span class="text-base"> {{ tweet.infinityClub.name }}</span>
                </v-chip>
              </div>
            </v-col>
          </v-row>
          <div
            :class="{
              'mt-2': hasImg,
              'mt-1': hasImg,
            }"
            v-if="!props.hideActions"
          >
            <TweetItemActions
              :compact="props.compact"
              :tweet="props.tweet"
              :twType="twType"
              @on-comment-click="handleCommentClick"
            />
          </div>
          <template v-if="showComment">
            <div class="bg-gray-100 dark:bg-neutral-900 my-2 mr-3">
              <v-row v-iShowDetails v-for="comment in tweet.childComments" :id="`${comment.id}`">
                <v-col cols="1" class="ml-4 mr-n4">
                  <v-avatar>
                    <v-img :src="comment.user.userInfo.avatar"></v-img>
                  </v-avatar>
                </v-col>
                <v-col class="mt-1">
                  <v-row>
                    <v-col cols="12">
                      <span class="text-sky-500"> #{{ comment.replySerialNumber + 1 }} </span>
                      <span> &nbsp;{{ comment.user.nickname }} </span>
                      <span class="text-grey">
                        &nbsp;&nbsp;{{ timeAgoFilter(comment.createTime) }}
                      </span>
                    </v-col>
                    <v-col class="mt-n6" cols="12">
                      <span class="">
                        {{ comment.content }}
                      </span>
                      <span class="text-sky-600 ml-2">
                        {{ comment.imgUrlList.length > 0 ? '[图片]' : '' }}
                      </span>
                      <div>
                        <span class="">
                          赞({{ comment.upNum }}) &nbsp; 回复({{ comment.childCommentTotalPages }})
                        </span>
                        <span
                          style="display: none"
                          class="d-i-comment-details ml-2 text-grey"
                          :id="`details-${comment.id}`"
                        >
                          <nuxt-link :to="`/infinity/status/${tweet.id}`"> 查看详情 </nuxt-link>
                        </span>
                      </div>
                    </v-col>
                  </v-row>
                  <v-divider class="my-2"></v-divider>
                </v-col>
              </v-row>
              <v-divider class="my-2"></v-divider>
              <!--/*              <div class="text-sky-600" style="margin-left: 8.3333333333%"> 查看更多评论 </div>*/-->
              <div class="text-sky-600" style="margin-left: 8.3333333333%">查看更多评论</div>
              <div
                class="text-sky-600 mt-2"
                style="margin-left: 8.3333333333%"
                @click.stop="showComment = !showComment"
              >
                收起评论
              </div>
            </div>
          </template>
        </div>
      </v-col>
    </v-row>
  </client-only>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import useTailwindConfig from '~/composables/useTailwindConfig'
import { computed, onMounted, ref } from 'vue'
import TweetItemActions from '~/components/Tcomponents/Tweet/Item/Actions/index.vue'
import { InfinityI, InfinityType, TwShowStatus } from '~/types/infinity'
import { timeAgoFilter } from '~/composables/useTools'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { useInfinityStatusStore } from '~/stores/infinity/infinityStatusStore'
import A from '~/pages/messages/chats/a.vue'

const { twitterBorderColor } = useTailwindConfig()

// const emitter = useEmitter()
const props = defineProps<{
  tweet: InfinityI
  compact?: boolean
  hideActions?: boolean
  timeLine?: boolean
  timeLineHeight?: string
}>()
const hasImg = computed(() => {
  return props.tweet.imgUrlList?.length !== 0
})
const twType = ref(TwShowStatus.index)
onMounted(() => {
  setTwType()
})

const setTwType = () => {
  if (!props.compact) {
    twType.value = TwShowStatus.status
    return
  }
  if (props.tweet.type === InfinityType.Tweet) {
    twType.value = TwShowStatus.index
    return
  }
  if (props.tweet?.replyUserTweetId == null) {
    twType.value = TwShowStatus.comment
    return
  } else {
    twType.value = TwShowStatus.reply
    return
  }
}
const tweetBodyWrapper = computed(() => (props.compact ? 'ml-16' : 'ml-2 mt-4'))

const textSize = computed(() => (props.compact ? 'text-base' : 'text-2xl'))
const getImgCol = computed(() => {
  switch (props.tweet.imgUrlList.length) {
    case 1:
      return 12
    case 2:
      return 6
    case 3:
      return 6
    case 4:
      return 6
    default:
      return 4
  }
})
const ShowIndex = ref()
const display = ref('none')
const MinDisplay = ref('flex')

const showComment = ref(false)
const infinityStore = useInfinityStore()

function handleCommentClick() {
  if (infinityStore.isHome) {
    if (props.tweet.childCommentNum != 0) {
      showComment.value = !showComment.value
    } else {
      clog('//todo reply open dialog')
      //todo reply open dialog
    }
  } else {
    const infinityStatusStore = useInfinityStatusStore()
    infinityStatusStore.replyInfinityData = props.tweet
    infinityStatusStore.replyDialog = true
  }
}

function ZoomIn(i) {
  display.value = 'block'
  MinDisplay.value = 'none'
  ShowIndex.value = i
  document.getElementById(props.tweet.id).scrollIntoView({
    behavior: 'smooth',
  })
}

function ZoomOut() {
  display.value = 'none'
  MinDisplay.value = 'flex'
}

function select(i) {
  ShowIndex.value = i
  document.getElementById(props.tweet.id).scrollIntoView({
    behavior: 'smooth',
  })
}

const visibleRef = ref(false)
const indexRef = ref(0)
const viewImg = () => {
  indexRef.value = ShowIndex.value
  visibleRef.value = true
  clog(props.tweet.imgUrlList[ShowIndex.value])
  clog((visibleRef.value = true))
  //这里element是我们要禁用鼠标滚轮触发滚动条的元素
  const main: any = document.querySelector('#main-container > div:nth-child(2) > div')
  main.onmousewheel = () => false
}

const onHide = () => {
  const main: any = document.querySelector('#main-container > div:nth-child(2) > div')
  main.onmousewheel = () => true
  visibleRef.value = false
}
</script>

<style scoped>
.d-img-next {
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA8CAYAAAADm2gpAAAAAXNSR0IArs4c6QAAAhNJREFUaAXtmb9OwlAUxttLiYkV0plB4sgLODC5QRTiYqIbcXDyHXwMEyMMbg7GBfmzEBISIDHdGYU3KLQQEwp4LvHE5oJJIfTS4XQ5vdDe+/V3Ttp+PaoCW7PZ1BzHuY1Go2fz+bwfiUSKmUzmi/8na1Or1eoBY8w0DOMkkUjo4/HY7ff737PZrJDL5d5lCVFAyINpms7Csw2Hw0W9Xh+Xy+UrWUIYpOEimUzq3gXj8biSTqcPIVUvssQwVVWt6XTq1bHcj8ViUsUwEPHY6/UcqIm9i1FqtdpTq9VyXNf1VMrf7mg0klMzsKQKxVkiMWJREBmRCI6JDJIQI5ERieA4dGTgDlwMzU2PxGCdeCOvGSLjJYL7RAZJiJHIiERwTGSQhBg3JHPOz1fFSXY15mLghfxZ1/UbMGs6GLmVqS3LUrrdrgWG7pit/LujH8C4LbLZ7B146dd2uz1c55vAbyvcyNm2fRqYEH49XIzf69L8HrjNcfx5BKm5htQc/ZcaoKFAaj63md/XOb8PRduHe1wWq69JNz1oAxHBffYgEZg2IkEkkABGqgkigQQwUk0QCSSAkWqCSCABjGGpCd4m8fOiG9w7ZqVSuWw0GvsVAWlhmqbdp1Kptb6De45OpzOBLlchn8+/YRqDiLynZ0ATcWVumSL44gwM0MdgMJh4lcgWwdcOTQN6+VlCaMl/gU8tyW7J/wCJLeOSU2dAQgAAAABJRU5ErkJggg==),
    pointer;
  right: 0;
  height: 100%;
  position: absolute;
  top: 0;
  width: 33%;
  z-index: 10;
}

.d-img-prev {
  cursor: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA8CAYAAAADm2gpAAAAAXNSR0IArs4c6QAAAsVJREFUaAXtmUur2kAUx5NYUXtFiwtx0UU30iLcRWlx4aa4E8W29wv0G/QLlO5vP0BpN1210G0X9YlQC4ILKYLQhctaaF0IPrjx/Uj/I02ITXI1cSZCyUBwPJnM+eU/J5k5GZ6zsRSLxbs8z7/dbDYPXS5Xb7VaXWYymXc2InBcLpdLAkTsdDrr+XwuDQYDqVqtXhUKhRcEhLeDhkBAgc/xePwsFAopLmezGQeYWTgcDgiKlVHFCIK483q9nNvtXnS73TtMQa6DICCLxYIcHqj18wYxsCj7ICRJ4prN5hjB+zqdTs+ZKHIIRKPRmIxGo68+n+8lEYJ6sB4KMRwOqx6P52kymVxRB7EKQRXkGAhqIMdCUAGhAXE0CC2Io0BoQlgGoQ1hCYQFhGkQVhCmQFhCHAzCGoKA7J30TEB8Uc8dpHMz5dpJzyTEhTyBmQGQ2xqC2AlBYHRB7IbQBTkFhAbkVBA7IKeEUEAOhBj/Xd4d9XQQp3qFL5fL95ACfvs3+ZEbk9U2FrpMIYgvAY7exGIxnzoDsxtiCwI1HkQiEd03LPKOYb/f/443JpPhkG94CyIIQm8ymahtSj0ajd5CAnSO8xnFyKgirNfrV61WS4QyGheBQIBLJBI3AfsRAf1Y04C2AZ8LPtRqNRFQCBltQUYmoc2YOQxc8w6M3vA6yuipQmyOMo4yRgoY2Z2Y+e+UyefzT4xuiordTMw4MFBrp8hLCEeZHVnwx1Fm37LTiRmjmMGe3iMqLzejTuB474K81+uR7OA36UP3Q41R52btBKZUKr33+/0XyI/OkB9puqhUKiSNOdee0TS1bkCWKKVSqWeiKH6q1+tjvSQOe78ubDBeWfdi4kr1MGEzUQmXdru9hGI10hXToVGzEhh8ArnE7/NgMLiYTqfCcrn8gSOdzWZ/2QYiQ+EpuY36fQB1sbvZxPBtk+4/aTj+WpXZtpcAAAAASUVORK5CYII=),
    pointer;
  left: 0;
  box-sizing: border-box;
  height: 100%;
  position: absolute;
  top: 0;
  width: 33%;
  z-index: 10;
}

.d-img-max-content {
  background: #f4f5f7;
  position: relative;
  text-align: center;
  width: 100%;
}

.SongList {
  width: 70%;
}

.covers {
  /*display: flex;*/
  /*justify-content: start;*/
  /*justify-content: space-between;*/
  /*flex-wrap: wrap;*/
}

.cover {
  display: flex;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  /*width: 33%;*/
  /*height: 33%;*/
  /*margin: 10px 0;*/
}

.min {
  /*border-radius: 4px;*/
  cursor: zoom-in;
}

.max {
  cursor: zoom-out;
  width: 130%;
}

.small {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.cover-small {
  display: flex;
  justify-content: center;
  width: 10%;
  margin: 10px 0;
  opacity: 0.6;
  cursor: pointer;
}

.cover-small:hover {
  opacity: 1;
}

.active {
  display: flex;
}

.None {
  display: none;
}

.smallActive {
  opacity: 1;
}
</style>
