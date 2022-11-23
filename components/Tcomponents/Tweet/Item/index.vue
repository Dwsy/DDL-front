<template>
  <client-only>
    <div>
      <TweetItemHeader :tweet="props.tweet" />
      <div :class="tweetBodyWrapper">
        <p :class="textSize" class="w-auto flex-shrink font-medium text-gray-800 dark:text-white">
          {{ props.tweet.content }}
        </p>

        <!--      <v-row class="mt-2 mr-4">-->
        <!--        <v-col-->
        <!--          v-for="image in tweet.imgUrlList"-->
        <!--          :class="twitterBorderColor"-->
        <!--          cols="4"-->
        <!--          class="rounded-2xl border-2"-->
        <!--          style="width: 200px; height: 200px"-->
        <!--        >-->
        <!--          <v-img :src="image" alt="" class="rounded-2xl" />-->
        <!--        </v-col>-->
        <!--      </v-row>-->
        <vue-easy-lightbox
          :visible="visibleRef"
          :imgs="tweet.imgUrlList"
          :index="ShowIndex"
          @hide="onHide"
        ></vue-easy-lightbox>
        <div class="SongList">
          <!--        //用v-for循环渲染缩略图-->
          <v-row class="covers" :style="{ display: MinDisplay }">
            <v-col cols="4" class="cover" v-for="(img, index) in tweet.imgUrlList" :key="img">
              <v-img
                :src="img"
                class="min"
                @click.stop="ZoomIn(index)"
                alt=""
                cover
                aspect-ratio="1"
              />
            </v-col>
          </v-row>
          <!--        //渲染放大后的图-->
          <div class="max" :style="{ display: display }">
            <v-btn-toggle class="">
              <v-btn variant="tonal" color="#448623" @click.stop="viewImg()"> 查看原图</v-btn>
            </v-btn-toggle>
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
                <v-img :src="img" width="90%" />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-2" v-if="!props.hideActions">
          <TweetItemActions
            :compact="props.compact"
            :tweet="props.tweet"
            @on-comment-click="handleCommentClick"
          />
        </div>
      </div>
    </div>
  </client-only>
</template>
<script setup lang="ts">
import useTailwindConfig from "~/composables/useTailwindConfig"
import { computed, ref } from "vue"
import TweetItemHeader from "~/components/Tcomponents/Tweet/Item/Header.vue"
import TweetItemActions from "~/components/Tcomponents/Tweet/Item/Actions/index.vue"
import { InfinityI } from "~/types/infinity"

const { twitterBorderColor } = useTailwindConfig()

// const emitter = useEmitter()
const props = defineProps<{
  tweet: InfinityI
  compact?: boolean
  hideActions?: boolean
}>()

const tweetBodyWrapper = computed(() => (props.compact ? "ml-16" : "ml-2 mt-4"))

const textSize = computed(() => (props.compact ? "text-base" : "text-2xl"))
const ShowIndex = ref()
const display = ref("none")
const MinDisplay = ref("flex")

function handleCommentClick() {
  // emitter.$emit('replyTweet', props.tweet)
}

function ZoomIn(i) {
  display.value = "block"
  MinDisplay.value = "none"
  ShowIndex.value = i
}

function ZoomOut() {
  display.value = "none"
  MinDisplay.value = "flex"
}

function select(i) {
  ShowIndex.value = i
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
  width: 90%;
}

.covers {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.cover {
  display: flex;
  justify-content: center;
  width: 33%;
  /*height: 33%;*/
  /*margin: 10px 0;*/
}

.min {
  border-radius: 10px;
  cursor: zoom-in;
}

.max {
  cursor: zoom-out;
  width: 100%;
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