<template>
  <client-only>
    <v-row>
      <!--      <TweetItemHeader :tweet="props.tweet" :id="tweet.id" />-->
      <v-col style="max-width: 4%; flex: 0 0 4%" class="pl-6 pt-6">
        <div>
          <v-avatar size="52">
            <v-img :src="tweet.user.userInfo.avatar"></v-img>
          </v-avatar>
          <!--          <div class="ml-3">-->

          <!--          </div>-->
        </div>
      </v-col>
      <v-col>
<!--        <div :class="tweetBodyWrapper">-->
        <div class="mt-4" style="margin-left: 5%">
          <span class="font-medium text-gray-800 dark:text-white">{{ tweet.user.nickname }}</span>
          <span class="text-gray-400 text-sm">&nbsp&nbsp</span>
          <span class="text-gray-400 text-sm dark:text-white">{{
            timeAgoFilter(tweet.createTime)
          }}</span>
          <p
            :class="textSize"
            class="w-auto flex-shrink font-medium text-gray-800 dark:text-white d-t-content"
          >
            {{ props.tweet.content }}
          </p>
          <vue-easy-lightbox
            :visible="visibleRef"
            :imgs="tweet.imgUrlList"
            :index="ShowIndex"
            @hide="onHide"
          ></vue-easy-lightbox>
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
                      class="min"
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
                @click.stop="ZoomOut"
                v-for="(img, index) in tweet.imgUrlList"
                :key="img"
                :class="[index === ShowIndex ? 'active' : 'None']"
              >
                <v-img :src="img" width="100%" />
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

          <div class="mt-3" v-if="!props.hideActions">
            <TweetItemActions
              :compact="props.compact"
              :tweet="props.tweet"
              @on-comment-click="handleCommentClick"
            />
          </div>
        </div>
      </v-col>
    </v-row>
  </client-only>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'
import { computed, ref } from 'vue'
import TweetItemHeader from '~/components/Tcomponents/Tweet/Item/Header.vue'
import TweetItemActions from '~/components/Tcomponents/Tweet/Item/Actions/index.vue'
import { InfinityI } from '~/types/infinity'
import { timeAgoFilter } from '#imports'

const { twitterBorderColor } = useTailwindConfig()

// const emitter = useEmitter()
const props = defineProps<{
  tweet: InfinityI
  compact?: boolean
  hideActions?: boolean
}>()
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

function handleCommentClick() {
  // emitter.$emit('replyTweet', props.tweet)
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
  console.log(props.tweet.imgUrlList[ShowIndex.value])
  console.log((visibleRef.value = true))
}
const onHide = () => (visibleRef.value = false)
</script>

<style scoped>
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
  border-radius: 4px;
  cursor: zoom-in;
}

.max {
  cursor: zoom-out;
  width: 90%;
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