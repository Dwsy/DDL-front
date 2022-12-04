<template>
  <div>
    <v-row>
      <v-col cols="1">
        <v-avatar class="ma-4" size="50">
          <v-img :src="userStore?.userInfo?.avatar" />
        </v-avatar>
      </v-col>
      <v-col cols="11" class="pr-8">
        <v-textarea
          class="d-tweet-input"
          v-model="text"
          variant="underlined"
          :placeholder="props.placeholder"
          auto-grow
          max-rows="30"
          :rules="[rules.length(2000)]"
          counter
        ></v-textarea>
        <v-progress-circular
          class="ml-2 d-input-count-progress"
          :model-value="textProgress"
          :size="20"
          :width="3"
          :class="{ 'text-red': textProgress > 99, 'text-sky-500': textProgress < 99 }"
        ></v-progress-circular>

        <template v-if="infinityStore.isHome">
          <v-btn
            @click="showSelectTopic = true"
            v-if="!showSelectTopic"
            variant="tonal"
            color="#60a5fa"
          >
            <v-icon size="x-large"> mdi-music-accidental-sharp</v-icon>
            添加话题
          </v-btn>
          <SelectTopic v-else></SelectTopic>
        </template>

        <!--        class="dark:tex.white h-auto w-full border-0 bg-transparent text-xl text-gray-900 placeholder:text-gray-400 focus:ring-0"-->
      </v-col>

      <v-col cols="11" offset="1">
        <div id="d-send-img-box" v-show="imgUrlList.length > 0">
          <vue-easy-lightbox
            :visible="visibleRef"
            :imgs="imgUrlList"
            :index="ShowIndex"
            @hide="onHide"
          ></vue-easy-lightbox>
          <div class="ImgCard ml-4">
            <!--        //用v-for循环渲染缩略图-->
            <v-row>
              <v-col cols="10">
                <v-row class="covers" :style="{ display: MinDisplay }">
                  <v-col
                    :cols="getImgCol()"
                    class="cover d-img-cover-content"
                    style="padding: 1px"
                    v-for="(img, index) in imgBase64List"
                    :key="img"
                  >
                    <v-img
                      :src="img"
                      class="min"
                      @click.stop="ZoomIn(index)"
                      cover
                      aspect-ratio="1"
                    />
                    <v-icon class="d-img-del-btn" size="x-large" @click="delImg(index)">
                      mdi-delete-forever
                    </v-icon>
                  </v-col>
                  <v-col
                    :cols="getImgCol()"
                    v-show="imgBase64List.length < 9"
                    @click="handleImageClick()"
                    style="cursor: pointer"
                    class="cover d-img-cover-content"
                  >
                    <!--                <v-btn class="d-img-add-btn mx-auto my-auto" icon>-->
                    <v-icon size="x-large" class="d-img-add-btn mx-auto my-auto"> mdi-plus</v-icon>
                    <!--                </v-btn>-->
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
                v-for="(img, index) in imgBase64List"
                :key="img"
                style="height: 100%; width: 100%"
                class="d-img-max-content"
                :class="[index === ShowIndex ? 'active' : 'None']"
              >
                <v-img :src="img" @click.stop="ZoomOut" width="100%" />
                <div v-if="index !== 0" class="d-img-prev" @click.stop="ShowIndex--"></div>
                <div
                  v-if="index !== imgBase64List.length - 1"
                  class="d-img-next"
                  @click.stop="ShowIndex++"
                ></div>
              </div>
              <!--          //放大后图片下方的导航图-->
              <div class="small">
                <div
                  :class="[{ smallActive: index === ShowIndex }, 'cover-small']"
                  v-for="(img, index) in imgBase64List"
                  :key="img"
                  @click.stop="select(index)"
                >
                  <v-img :src="img" width="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <!-- File Selector -->
    <div class="pl-16">
      <img
        v-if="inputImageUrl"
        :class="twitterBorderColor"
        :src="inputImageUrl"
        alt=""
        class="rounded-2xl border"
      />

      <input
        ref="imageInput"
        accept="image/gif,image/jpeg,image/jpg,image/png"
        hidden
        placeholder=""
        type="file"
        user=""
        @change="addImg"
      />
    </div>

    <!-- Icons -->
    <div class="flex p-2 pl-14 ml-4">
      <div class="flex w-full text-white">
        <div
          class="dark:hover:bg-dim-800 cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50"
          @click="handleImageClick"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <g>
              <path
                d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"
              ></path>
              <circle cx="8.868" cy="8.309" r="1.542"></circle>
            </g>
          </svg>
        </div>

        <emoji-picker @addEmoji="addEmoji">
          <template v-slot="{ activator }">
            <div
              v-bind="activator"
              class="dark:hover:bg-dim-800 cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"
                  ></path>
                  <path
                    d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"
                  ></path>
                  <circle cx="14.738" cy="9.458" r="1.478"></circle>
                  <circle cx="9.262" cy="9.458" r="1.478"></circle>
                </g>
              </svg>
            </div>
          </template>
        </emoji-picker>

        <div
          class="dark:hover:bg-dim-800 cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <g>
              <path
                d="M19 10.5V8.8h-4.4v6.4h1.7v-2h2v-1.7h-2v-1H19zm-7.3-1.7h1.7v6.4h-1.7V8.8zm-3.6 1.6c.4 0 .9.2 1.2.5l1.2-1C9.9 9.2 9 8.8 8.1 8.8c-1.8 0-3.2 1.4-3.2 3.2s1.4 3.2 3.2 3.2c1 0 1.8-.4 2.4-1.1v-2.5H7.7v1.2h1.2v.6c-.2.1-.5.2-.8.2-.9 0-1.6-.7-1.6-1.6 0-.8.7-1.6 1.6-1.6z"
              ></path>
              <path
                d="M20.5 2.02h-17c-1.24 0-2.25 1.007-2.25 2.247v15.507c0 1.238 1.01 2.246 2.25 2.246h17c1.24 0 2.25-1.008 2.25-2.246V4.267c0-1.24-1.01-2.247-2.25-2.247zm.75 17.754c0 .41-.336.746-.75.746h-17c-.414 0-.75-.336-.75-.746V4.267c0-.412.336-.747.75-.747h17c.414 0 .75.335.75.747v15.507z"
              ></path>
            </g>
          </svg>
        </div>

        <div
          class="dark:hover:bg-dim-800 cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <g>
              <path
                d="M20.222 9.16h-1.334c.015-.09.028-.182.028-.277V6.57c0-.98-.797-1.777-1.778-1.777H3.5V3.358c0-.414-.336-.75-.75-.75s-.75.336-.75.75V20.83c0 .415.336.75.75.75s.75-.335.75-.75v-1.434h10.556c.98 0 1.778-.797 1.778-1.777v-2.313c0-.095-.014-.187-.028-.278h4.417c.98 0 1.778-.798 1.778-1.778v-2.31c0-.983-.797-1.78-1.778-1.78zM17.14 6.293c.152 0 .277.124.277.277v2.31c0 .154-.125.28-.278.28H3.5V6.29h13.64zm-2.807 9.014v2.312c0 .153-.125.277-.278.277H3.5v-2.868h10.556c.153 0 .277.126.277.28zM20.5 13.25c0 .153-.125.277-.278.277H3.5V10.66h16.722c.153 0 .278.124.278.277v2.313z"
              ></path>
            </g>
          </svg>
        </div>

        <div
          class="dark:hover:bg-dim-800 cursor-pointer rounded-full p-2 text-blue-400 hover:bg-blue-50"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <g>
              <path d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2z"></path>
              <path
                d="M-37.9 18c-.1-.1-.1-.1-.1-.2.1 0 .1.1.1.2zM18 2.2h-1.3v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H7.7v-.3c0-.4-.3-.8-.8-.8-.4 0-.8.3-.8.8v.3H4.8c-1.4 0-2.5 1.1-2.5 2.5v13.1c0 1.4 1.1 2.5 2.5 2.5h2.9c.4 0 .8-.3.8-.8 0-.4-.3-.8-.8-.8H4.8c-.6 0-1-.5-1-1V7.9c0-.3.4-.7 1-.7H18c.6 0 1 .4 1 .7v1.8c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-5c-.1-1.4-1.2-2.5-2.6-2.5zm1 3.7c-.3-.1-.7-.2-1-.2H4.8c-.4 0-.7.1-1 .2V4.7c0-.6.5-1 1-1h1.3v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5h7.5v.5c0 .4.3.8.8.8.4 0 .8-.3.8-.8v-.5H18c.6 0 1 .5 1 1v1.2z"
              ></path>
              <path
                d="M15.5 10.4c-3.4 0-6.2 2.8-6.2 6.2 0 3.4 2.8 6.2 6.2 6.2 3.4 0 6.2-2.8 6.2-6.2 0-3.4-2.8-6.2-6.2-6.2zm0 11c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7c0 2.5-2.1 4.7-4.7 4.7z"
              ></path>
              <path
                d="M18.9 18.7c-.1.2-.4.4-.6.4-.1 0-.3 0-.4-.1l-3.1-2v-3c0-.4.3-.8.8-.8.4 0 .8.3.8.8v2.2l2.4 1.5c.2.2.3.6.1 1z"
              ></path>
            </g>
          </svg>
        </div>
      </div>

      <div class="ml-auto">
        <v-btn :disabled="isDisabled" variant="tonal" color="#0070f0" rounded @click="send">
          <span>发送</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { clog } from '~/utils/clog'
import useTailwindConfig from '~/composables/useTailwindConfig'
import EmojiPicker from '~~/components/common/emojiPicker.vue'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useAxiosPostUploadAvatar } from '~/composables/Api/user/settings'
import { defaultMsg, warningMsg } from '~/composables/utils/toastification'
import { useInfinityStore } from '~/stores/infinity/infinityStore'
import { InfinityType, ReplyInfinityRB, SendInfinityRB } from '~/composables/Api/infinity'
import SelectTopic from '~/components/Infinity/selectTopic.vue'
import { rules } from '~/utils/rules'
import { InfinityI } from '~/types/infinity'
import { useRoute } from '#app'
import { useInfinityStatusStore } from '~/stores/infinity/infinityStatusStore'

const infinityStore = useInfinityStore()
const { twitterBorderColor } = useTailwindConfig()
const userStore = useUserStore()
const imageInput = ref()
const selectedFile = ref(null)
const inputImageUrl = ref(null)
const text = ref('')
const imgUrlList = ref<string[]>([])
// const imgUrlList = ref<string[]>(['https://tvax1.sinaimg.cn/large/005NWBIgly1h4g7ceikwrj30hn0p0tb9.jpg'])
const imgBase64List = ref<string[]>([...imgUrlList.value])
const emits = defineEmits(['onSubmit'])
const showSelectTopic = ref(false)
const isDisabled = computed(() => text.value === ''&&imgUrlList.value.length===0)

const props = defineProps<{
  replyTo: InfinityI
  placeholder: string
}>()
onMounted(() => {
  let count: Element = document.querySelector(
    '.d-tweet-input  > div.v-input__details > div.v-counter'
  )
  let progress: Element = document.querySelector('.d-input-count-progress')
  count.parentElement.append(progress)
})

const addEmoji = (emoji) => {
  text.value += emoji
  clog(emoji)
}
const changeImgFile = async (file) => {
  const { data: response } = await useAxiosPostUploadAvatar(file)
  if (response.code === 0) {
    const url = 'http://' + response.data + '?imageMogr2'
    imgUrlList.value.push(url)
    // await chatsStore.sendImg(url)
  } else {
    warningMsg('发送失败')
  }
}
const addImg = async (event) => {
  const file = event.target.files[0]
  await changeImgFile(file)
  selectedFile.value = file
  const reader = new FileReader()
  reader.onload = (event) => {
    imgBase64List.value.push(event.target.result as string)
  }
  reader.readAsDataURL(file)
}

function handleFormSubmit() {
  // emits('onSubmit', {
  //   text: text.value,
  //   mediaFiles: [selectedFile.value],
  // })
}

function handleImageClick() {
  if (imgBase64List.value.length >= 9) {
    defaultMsg('最多只能上传9张图片')
    return
  }
  imageInput.value.click()
}

const getImgCol = () => {
  // return 6
  switch (imgBase64List.value.length) {
    case 1:
      return 12
    case 2:
      return 6
    case 3:
      return 6
    default:
      return 4
  }
}
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
  document.getElementById('d-send-img-box').scrollIntoView({
    behavior: 'smooth',
  })
}

function ZoomOut() {
  display.value = 'none'
  MinDisplay.value = 'flex'
}

function select(i) {
  ShowIndex.value = i
  document.getElementById('d-send-img-box').scrollIntoView({
    behavior: 'smooth',
  })
}

const visibleRef = ref(false)
const indexRef = ref(0)
const viewImg = () => {
  indexRef.value = ShowIndex.value
  visibleRef.value = true
  // clog(props.tweet.imgUrlList[ShowIndex.value])
  // clog((visibleRef.value = true))
}
const onHide = () => (visibleRef.value = false)
const delImg = (index) => {
  imgUrlList.value.splice(index, 1)
  imgBase64List.value.splice(index, 1)
  // clog(imgUrlList.value)
}
const send = async () => {
  if (text.value === '') {
    if (imgUrlList.value.length === 0) {
      defaultMsg('请输入内容')
      return
    }
  }

  if (props.replyTo != null) {
    await reply()
    return
  }

  let RB: SendInfinityRB = {
    content: text.value,
    imgUrlList: imgUrlList.value,
    infinityClubId: null,
    infinityTopicIds: infinityStore.infinityTopicList.map((item) => item.id),
    refId: null,
    type: InfinityType.Tweet,
  }
  const infinity = await infinityStore.sendInfinity(RB)
}

const reply = async () => {
  let RB: ReplyInfinityRB = {
    content: text.value,
    imgUrlList: imgUrlList.value,
    replyId: String(useRoute().params.id),
    replyUserId: null,
    replyUserTweetId: null,
  }
  if (infinityStore.isHome) {
    await infinityStore.replyInfinity(RB)
  } else {
    await useInfinityStatusStore().replyInfinity(RB)
  }
}

const textProgress = computed(() => {
  return 0 ^ ((text.value.length / 2000) * 100)
})
</script>

<style scoped>
/*:deep(.d-tweet-input > div.v-input__details > div.v-counter) {*/
/*  display: inherit!important;*/
/*}*/
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

.d-img-del-btn {
  background-color: rgba(0, 0, 0, 0.18);
  color: #dd2f2f;
  right: 0;
  height: 20%;
  position: absolute;
  top: 0;
  width: 20%;
  z-index: 10;
}

.d-img-cover-content {
  background: #f4f5f7;
  position: relative;
  text-align: center;
  width: 100%;
}

.ImgCard {
  width: 80%;
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