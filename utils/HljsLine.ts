const vCode = {
  mounted(el: any) {
    //获取代码片段
    let code = el.querySelector('code')
    let pre = document.getElementsByTagName('pre')[0]
    let html = code?.innerHTML
    let size = html.split('\n').length

    //插入行数
    let ul = document.createElement('ul')
    for (let i = 1; i <= size; i++) {
      let li = document.createElement('li')
      li.innerText = i + ''
      ul.appendChild(li)
    }

    ul.classList.add('hljs-code-number')

    el.insertBefore(ul, pre)

    //插入复制功能
    let copy = document.createElement('div')
    copy.classList.add('hljs-copy')
    copy.innerText = '复制'
    //添加点击事件
    copy.addEventListener('click', () => {
      //创建一个输入框
      let textarea = document.createElement('textarea')
      document.body.appendChild(textarea)
      textarea.setAttribute('readonly', 'readonly')
      textarea.value = code.innerText
      textarea.select()
      if (document.execCommand('copy')) {
        document.execCommand('copy')
        copy.innerText = '复制成功'
      }
      document.body.removeChild(textarea)
    })

    pre.appendChild(copy)

    //鼠标移入显示复制按钮
    el.addEventListener('mouseout', () => {
      copy.innerText = '复制'
      copy.style.display = 'none'
    })
    el.addEventListener('mouseover', () => {
      copy.style.display = 'block'
    })
  },
}

export default vCode
