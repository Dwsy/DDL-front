<template>
  <div>
    <v-row>
      <!--      <v-col cols="1">-->
      <!--        <v-avatar class="ma-4" size="50">-->
      <!--          <v-img :src="userStore.userInfo.avatar" />-->
      <!--        </v-avatar>-->
      <!--      </v-col>-->
      <v-col cols="11" class="ml-6 mt-2">
        <v-textarea
          class="d-dialog-tweet-input"
          v-model="text"
          variant="filled"
          :placeholder="props.placeholder"
          auto-grow
          max-rows="30"
          :rules="[rules.length(2000)]"
          counter
        ></v-textarea>
        <v-progress-circular
          class="d-dialog-input-count-progress ml-2 mr-n4"
          :model-value="textProgress"
          :size="20"
          :width="3"
          :class="{ 'text-red': textProgress > 99, 'text-sky-500': textProgress < 99 }"
        ></v-progress-circular>
      </v-col>

      <v-col cols="12" class="mx-6">
        <div id="d-send-img-box" v-show="imgUrlList.length > 0">
          <vue-easy-lightbox
            :visible="visibleRef"
            :imgs="imgUrlList"
            :index="ShowIndex"
            @hide="onHide"
          ></vue-easy-lightbox>
          <div class="SongList ml-4">
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
    <div class="">
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
        @change="addImg"
      />
    </div>

    <!-- Icons -->
    <div class="flex">
      <div class="flex w-full text-white mx-6">
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
      </div>

      <div class="mr-4 mb-4">
        <v-btn :disabled="isDisabled" variant="tonal" color="#0070f0" rounded @click="reply">
          <span>回复</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useTailwindConfig from '~/composables/useTailwindConfig'
import EmojiPicker from '~~/components/common/emojiPicker.vue'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useAxiosPostUploadAvatar } from '~/composables/Api/user/settings'
import { defaultMsg, warningMsg } from '~/composables/utils/toastification'
import { ReplyInfinityRB } from '~/composables/Api/infinity'
import { rules } from '~/utils/rules'
import { useRoute } from '#app'
import { useInfinityStatusStore } from '~/stores/infinity/infinityStatusStore'

const infinityStatusStore = useInfinityStatusStore()
const { twitterBorderColor } = useTailwindConfig()
const userStore = useUserStore()
const imageInput = ref()
const selectedFile = ref(null)
const inputImageUrl = ref(null)
const text = ref('')
const imgUrlList = ref<string[]>([])
const imgBase64List = ref<string[]>([...imgUrlList.value])
const emits = defineEmits(['onSubmit'])
const showSelectTopic = ref(false)
const isDisabled = computed(() => text.value === '')

const props = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
})
onMounted(() => {
  appendProgress()
  console.log('12appendProgressappendProgressappendProgress')
})

const addEmoji = (emoji) => {
  text.value += emoji
  console.log(emoji)
}
const changeImgFile = async (file) => {
  const { data: response } = await useAxiosPostUploadAvatar(file)
  if (response.code === 0) {
    const url = 'http://' + response.data + '?imageMogr2'
    imgUrlList.value.push(url)
    // await chatsStore.sendImg(url)
  } else {
    warningMsg('回复失败')
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

const appendProgress = () => {
  let count: Element = document.querySelector(
    '.d-dialog-tweet-input  > div.v-input__details > div.v-counter'
  )
  let progress: Element = document.querySelector('.d-dialog-input-count-progress')
  count.parentElement.append(progress)
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
  // console.log(props.tweet.imgUrlList[ShowIndex.value])
  // console.log((visibleRef.value = true))
}
const onHide = () => (visibleRef.value = false)
const delImg = (index) => {
  imgUrlList.value.splice(index, 1)
  imgBase64List.value.splice(index, 1)
  // console.log(imgUrlList.value)
}
const reply = async () => {
  if (text.value === '') {
    defaultMsg('内容不能为空')
    return
  }
  const replyInfinityData = infinityStatusStore.replyInfinityData
  let RB: ReplyInfinityRB = {
    content: text.value,
    imgUrlList: imgUrlList.value,
    replyId: String(useRoute().params.id),
    replyUserId: replyInfinityData.user.id,
    replyUserTweetId: replyInfinityData.id,
  }
  if (await infinityStatusStore.replyInfinity(RB)) {
    infinityStatusStore.replyDialog = false
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

.SongList {
  width: 25%;
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
  width: 33%;
  height: 33%;
  /*margin: 10px 0;*/
}

.min {
  border-radius: 4px;
  cursor: zoom-in;
  /*width: 200%!important;*/
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
  width: 18%;
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
