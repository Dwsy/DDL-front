<template>
  <div class="main">
    <!--    <v-btn @click="changeThemes(themes[themeNameList[0]])">test</v-btn>-->
    <!--    <v-btn @click="changeThemes(themes.jzman)">test1</v-btn>-->
    <Editor id="d-Editor" :uploadImages="uploadImages" class="editor" :value="content" mode='split' :plugins="plugins"
            :locale='zhHans' @change="handleChange" placeholder="请输入。"/>
  </div>
</template>

<script setup lang="ts">
import footnotes from '@bytemd/plugin-footnotes'
import frontmatter from '@bytemd/plugin-frontmatter'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import gemoji from '@bytemd/plugin-gemoji'
import math from '@bytemd/plugin-math'
import breaks from '@bytemd/plugin-breaks'
import mermaid from '@bytemd/plugin-mermaid'
import {nextTick, onMounted, reactive, ref, watch, watchEffect} from 'vue'
import {useAxiosPostUploadImg} from '~~/composables/Api/article/manageArticle'
import {successMsg, warningMsg} from '~/composables/utils/toastification'
import {Editor} from '@bytemd/vue-next'
import zhHans from 'bytemd/locales/zh_Hans.json'
import {useTheme} from 'vuetify'
import '~~/constant/codemirrorTheme/main.css'


const theme = useTheme()
let props = defineProps({
  content: {
    type: String,
    default: '1'
  }
})
const emit = defineEmits(['changeText'])
// const content = ref('')
const bytemdZIndex = ref(0)
const bytemdHeight = ref('calc(100vh - 12rem)')

let appendSend = false
onMounted(async () => {
  const bytemdElement: Element = document.getElementsByClassName('bytemd')[0]
  let bytemdClassList = ref(bytemdElement.classList)

  let observer = new MutationObserver(async (e) => {
    let r = document.querySelector('.bytemd-status-right')
    let btn: HTMLElement = document.querySelector('.d-send-answer')

    if (theme.global.name.value === 'dark') {
      let toolbarRightSvgEl: NodeListOf<HTMLElement> = document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div > svg')
      let fullscreenSvgEl = toolbarRightSvgEl[4]
      fullscreenSvgEl.style.color = '#fff'
    }

    if (bytemdElement.classList.contains('bytemd-fullscreen')) {
      bytemdZIndex.value = 9999
      bytemdHeight.value = 'calc(100vh - 4rem)'
      if (!appendSend) {
        btn.style.display = 'inline-block'
        appendSend = true
        r.append(btn)
      } else {
        btn.style.display = 'inline-block'
      }
    } else {
      bytemdZIndex.value = 0
      bytemdHeight.value = 'calc(100vh - 12rem)'
      btn.style.display = 'none'
      await nextTick()
      if (appendSend) {
        let element = document.querySelector('#answer')
        element.scrollIntoView({
          // behavior: 'auto'
        })
      }
    }
  })
  observer.observe(bytemdElement, {
    attributes: true
  })
  // document.body.className = 'main'
  await editorTheme()
  watch(theme.global.name, async () => {
    await editorTheme()
  })
})


const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  gemoji(),
  math(),
  mermaid(),
  breaks(),
  footnotes(),
  frontmatter()
]

const editorTheme = async () => {

  if (theme.global.name.value === 'dark') {
    document.querySelector('html').style.backgroundColor = '#0e0e0e'
    // let element: HTMLElement = document.querySelector('#input-0')
    // element.style.color = '#FFF'
    console.log('dark')
    // await changeThemes(themes[darkThemeName.value])
    let right: HTMLElement = document.querySelector('.bytemd-status-right')
    right.style.color = '#FFF'
    let left: HTMLElement = document.querySelector('.bytemd-status-left')
    left.style.color = '#ffffff'
    document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-left > div > svg')
        .forEach((item: HTMLElement) => {
          item.style.color = '#FFF'
        })
    document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div > svg')
        .forEach((item: HTMLElement) => {
          item.style.color = '#FFF'
        })
    let css = await import('~~/constant/codemirrorTheme/monokai')
    let markdownThemeStyleElement = document.querySelector('#codemirrorTheme')
    if (markdownThemeStyleElement) {
      markdownThemeStyleElement.innerHTML = css.default
    } else {
      markdownThemeStyleElement = document.createElement('style')
      markdownThemeStyleElement.id = 'codemirrorTheme'
      markdownThemeStyleElement.innerHTML = css.default
      document.head.appendChild(markdownThemeStyleElement)
    }

  } else {
    document.querySelector('html').style.backgroundColor = '#FFF'
    // let element: HTMLElement = document.querySelector('#input-0')
    // element.style.color = '#000'
    // await changeThemes(themes[themeName.value])
    let right: HTMLElement = document.querySelector('.bytemd-status-right')
    right.style.color = '#000'
    let left: HTMLElement = document.querySelector('.bytemd-status-left')
    left.style.color = '#000'
    document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-left > div > svg')
        .forEach((item: HTMLElement) => {
          item.style.color = '#000'
        })
    document.querySelectorAll('#d-Editor > div > div.bytemd-toolbar > div.bytemd-toolbar-right > div > svg')
        .forEach((item: HTMLElement) => {
          item.style.color = '#000'
        })
    let css = await import('~~/constant/codemirrorTheme/default')
    let markdownThemeStyleElement = document.querySelector('#codemirrorTheme')
    if (markdownThemeStyleElement) {
      markdownThemeStyleElement.innerHTML = css.default
    } else {
      markdownThemeStyleElement = document.createElement('style')
      markdownThemeStyleElement.id = 'codemirrorTheme'
      markdownThemeStyleElement.innerHTML = css.default
      document.head.appendChild(markdownThemeStyleElement)
    }
  }
}


const handleChange = async (text) => {

  await emit('changeText', text)
  setTimeout(() => {
    tipSyntaxParsing()
  }, 301)
  //fixme 闪烁体验极差 还是得写插件来解决
  // props.content = v
}
// md 图片上传
const uploadImages = async (files) => {
  const response = await upload(files)
  return [
    {
      title: files.map((i) => i.name),
      url: 'http://' + response.data + '?imageslim'
    },
  ]
}
const upload = async (files) => {
  // console.log(files)
  const {data: response} = await useAxiosPostUploadImg(files[0])
  if (response.code === 0) {
    successMsg('上传成功')
    return response
  } else {
    warningMsg(response.msg)
    return null
  }
  // const res = await $api.uploadArcImg(formData)
  // if (res.code !== 200) return message.error(res.msg)
  // return res.data
}

const badPrefix = ['x:', 'X:', 'x', 'X', 'bad:', 'no:', 'error:']
const goodPrefix = ['√', 'good:', 'ok:', 'yes:', 'right:']
const infoPrefix = ['i:', 'I:', 'i', 'I', 'tip:']
const warnPrefix = ['!:', '！:', '!', '！', 'warn:', 'warning:']
const sharePrefix = ['@:', '@', 'at:']
const hasTipPrefixAndReplace = (p: Element, replacePrefixStrList: string[]): boolean => {
  let innerHTML: string = p.innerHTML
  let ret: boolean = false
  let lines = innerHTML.split('\n')
  for (let string of replacePrefixStrList) {
    if (lines.length > 1) {
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith(string)) {
          lines[i] = lines[i].replace(string, '')
          ret = true
        }
      }
      // console.log(lines.join('\n'))
      p.innerHTML = lines.join('\n')
    } else {
      if (innerHTML.startsWith(string)) {
        innerHTML = innerHTML.replace(string, '')
        p.innerHTML = innerHTML
        ret = true
      }
    }

  }
  return ret
}
const tipSyntaxParsing = () => {
  let nodeList: NodeListOf<Element> = document
      .querySelectorAll('#d-Editor > div > div.bytemd-body > div.bytemd-preview > div > blockquote')
  for (let blockquote of nodeList) {
    let p = blockquote.querySelector('p')
    let text = p.innerHTML
    let lines = text.split('\n')
    for (let line of lines) {
      if (hasTipPrefixAndReplace(p, badPrefix)) {
        blockquote.setAttribute('class', 'd-tip d-tip-error')
        p.setAttribute('class', 'mdi mdi-close')
      } else if (hasTipPrefixAndReplace(p, goodPrefix)) {
        blockquote.setAttribute('class', 'd-tip d-tip-success')
        p.setAttribute('class', 'mdi mdi-check')
      } else if (hasTipPrefixAndReplace(p, infoPrefix)) {
        blockquote.setAttribute('class', 'd-tip d-tip-info')
        p.setAttribute('class', 'mdi mdi-information-variant')
      } else if (hasTipPrefixAndReplace(p, warnPrefix)) {
        blockquote.setAttribute('class', 'd-tip d-tip-warning')
        p.setAttribute('class', 'mdi mdi-exclamation-thick')
      } else if (hasTipPrefixAndReplace(p, sharePrefix)) {
        blockquote.setAttribute('class', 'd-tip d-tip-share')
        p.setAttribute('class', 'mdi mdi-at')
      }
    }
  }
}

</script>

<style lang="scss" scoped>
::v-deep(.bytemd) {
  z-index: v-bind(bytemdZIndex);
  //height: calc(100vh - 15rem);
  height: v-bind(bytemdHeight);
}
</style>

<style scoped>


/* {*/
/*  width: 4px;*/
/*  height: 4px;*/
/*}*/
:deep(.d-tip-error) {
  /*background: #fcf1f1 !important;*/
  /*bac*/
  background: v-bind('theme.global.name.value === "dark" ? "#351212" : "#fcf1f1"') !important;
  border-left-color: red !important;
  /*color: black!important;*/
}

:deep(.d-tip-success) {
  /*background: #f0f8e5 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#09250d" : "#f0f8e5"') !important;
  border-left-color: #1aad19 !important;
  /*color: black!important;*/
}

:deep(.d-tip-warning) {
  /*background: #fcf2e9 !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2c240a" : "#fcf2e9"') !important;
  border-left-color: #ec6800 !important;
  /*color: black!important;*/
}

:deep(.d-tip-info) {
  /*background: #eef6fd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#162430" : "#eef6fd"') !important;
  border-left-color: #40c4ff !important;
  /*color: black!important;*/
}


:deep(.d-tip-share) {
  /*background: #dddddd !important;*/
  background: v-bind('theme.global.name.value === "dark" ? "#2a2a2abc" : "#eeeeee"') !important;
  border-left-color: #8b968d !important;
  /*color: black!important;*/
}

/*.d-tip-error > p:first-child:before {*/
/*  content: "\F0156";*/
/*  */
/*  color: red;*/
/*  font-weight: bold;*/
/*  margin-right: 5px;*/
/*  margin-left: -10px;*/
/*}*/
:deep(.d-tip-error > p:first-child:before) {
  content: "\F0156";

  color: red;
  font-weight: bold;

}

:deep(.d-tip-error > p:not(:first-child)) {
  margin-left: 22px;
}

:deep(.d-tip-success p:first-child:before) {
  content: "\F012C";

  color: v-bind('theme.global.name.value === "dark" ? "#41b883" : "#00c13c"') !important;
  font-weight: bold;

}

:deep(.d-tip-warning p:first-child:before) {
  content: "\F0205";

  position: center;
  height: 100%;
  color: #ff6800;
  font-weight: bold;

}

:deep(.d-tip-info p:first-child:before) {
  content: "\F064E";

  color: #40c4ff;
  font-weight: bold;

}

:deep(.d-tip-share p:first-child:before) {
  content: "\F0065";

  color: v-bind('theme.global.name.value === "dark" ? "" : "#858585"') !important;
  font-weight: bold;

}

:deep(.d-tip > p:not(:first-child)) {
  margin-left: 22px;
}

</style>

<style>
.bytemd-editor .CodeMirror {
  font-size: 18px !important;
}

body > div.v-overlay-container > div.v-overlay.v-overlay--absolute.v-overlay--active.v-theme--light.v-locale--is-ltr.v-menu > div > div > div > div > div.v-input__control > div > div.v-field__outline > label {
  font-size: 16px !important;
}

.bytemd {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  color: #24292e;
  background-color: v-bind('theme.global.name.value === "dark" ? "#171717" : "#fff"');
  height: 300px
}

.CodeMirror-line span {
  color: v-bind('theme.global.name.value === "dark" ? "#fff" : "#24292e"');
}

.CodeMirror {
  position: relative;
  overflow: hidden;
  background: v-bind('theme.global.name.value === "dark" ? "#171717" : "#fff"');
}

</style>
