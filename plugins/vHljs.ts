import { createVuetify } from "vuetify";
import { defineNuxtPlugin } from "#app";
// import hljs from 'highlight.js'
import { handleCopy } from "~/composables/useTools";
import { successMsg } from "~/composables/utils/toastification";
import hljs from "highlight.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("hljs", {
    mounted(el, binding) {
      let addCopy = binding.value.addCopy;
      const CodeNodeList: NodeListOf<HTMLElement> =
        el.querySelectorAll("pre code");
      // console.log('CodeNodeList', CodeNodeList)
      const CodeLength = CodeNodeList.length;
      // CodeNodeList.forEach((line, i) => {
      //     line.innerHTML = '<ul><li>' + line.innerHTML.replace(/\n/g, '\n</li><li>') + '\n</li></ul>'
      // })
      if (CodeLength > 30) {
        for (let i = 0; i < 15; i++) {
          renderCode(CodeNodeList[i], addCopy);
        }
        setTimeout(() => {
          for (let i = 15; i < CodeLength; i++) {
            renderCode(CodeNodeList[i], addCopy);
          }
        }, 1500);
      } else {
        for (let i = 0; i < CodeLength; i++) {
          // console.log(CodeNodeList[i])
          renderCode(CodeNodeList[i], addCopy);
        }
      }
    },
  });
});
const renderCode = (el: HTMLElement, addCopy: boolean) => {
  // hljs.highlightElement(el)
  hljs.highlightBlock(el);
  el.innerHTML = (
    "<ul><li>" +
    el.innerHTML.replace(/\n/g, "</li><li>") +
    "</li></ul>"
  ).replace(/<li><\/li>/g, "");
  // console.log(el.innerHTML)
  if (addCopy) {
    let copy = document.createElement("button");
    copy.setAttribute("class", "d-code-copy");
    // copy.innerHTML="复制"
    copy.addEventListener("click", () => {
      handleCopy(el.querySelector("ul"));
      copy.innerText = "copy!";
      successMsg("复制成功", {
        timeout: 1500,
      });
    });
    el.addEventListener("mouseout", () => {
      if (copy.innerText === "copy!") {
        setTimeout(() => {
          copy.innerText = "copy";
          copy.style.display = "none";
        }, 1500);
      } else {
        copy.innerText = "copy";
        copy.style.display = "none";
      }
    });
    el.addEventListener("mouseover", () => {
      copy.style.display = "block";
    });
    el.insertBefore(copy, el.firstChild);
  }
};
