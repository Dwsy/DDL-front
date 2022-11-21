export default `@charset "UTF-8";
/*
 * 适用于 core/typora-bear.scss。
 * 所有 typora-bear 主题，只需 import 这个文件，然后修改配色方案即可。
 */
/*
 * Default theme，适用于 core/mweb-base.scss。
 * 取值参考 chrome 默认样式：
 * https://chromium.googlesource.com/chromium/blink/+/refs/heads/main/Source/core/css/html.css
 * 所有 import "core/mweb-base.scss" 的文件都应该同时导入此变量文件。
 */
/* color */
/* font & line */
/* boxing */
/* elememts */
/* font */
/* header */
/* spacing */
/* table */
/* default color */
/**
 * 在 bear 的主题中，某些变量的取值和其他变量是绑定的。
 * 统一写在这里，这个文件应该在变量文件的最后被引入。
 */
/*
 * 基准样式，相当于 reset.css，使主题在不同平台下有统一的表现。
 * 各个属性的默认值为 chrome 的默认样式，见 variables/default.scss。
 */
:root {
  --text-color: #6b6884;
  --bg-color: #fafafa;
  --side-bar-bg-color: #fafafa;
  --active-file-bg-color: #fafafa;
  --rawblock-edit-panel-bd: white;
  --window-border: 0 solid #fafafa;
  --control-text-color: #6b6884;
  --primary-color: #ff6a00;
  --primary-btn-border-color: #ff6a00;
  --active-file-border-color: #ff6a00;
  --primary-btn-text-color: #ff6a00;
  --item-hover-text-color: #ff6a00;
  --meta-content-color: #ff6a00;
  --search-select-text-color: #ff6a00;
  --heading-char-color: #ff6a00;
  /* Mermaid diagrams*/
  --mermaid-theme: default;
}

.markdown-body {
  line-height: 1.68;
  -webkit-text-size-adjust: 100%;
  
  
  padding: 1.6rem 3.2rem;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, Segoe UI, PingFang SC, Microsoft Yahei, Hiragino Sans GB, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 16px;
  color: #6b6884;
  /* spacing */
  /* block */
  /* list */
  /* inline */
  /* table */
  /* code block */
}
.markdown-body * {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.markdown-body > *:first-child {
  margin-top: 0 !important;
}
.markdown-body > *:last-child {
  margin-top: 0 !important;
}
.markdown-body p, .markdown-body details, .markdown-body dl, .markdown-body ol, .markdown-body ul, .markdown-body xmp, .markdown-body plaintext, .markdown-body listing, .markdown-body blockquote, .markdown-body table, .markdown-body figure, .markdown-body hr {
  margin-top: 8px;
  margin-bottom: 8px;
}
.markdown-body h1 {
  font-size: 26px;
  font-weight: bold;
  margin-top: 26px;
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 0;
}
.markdown-body h2 {
  font-size: 22px;
  font-weight: bold;
  margin-top: 22px;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
}
.markdown-body h3 {
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
}
.markdown-body h4 {
  font-size: 18px;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
}
.markdown-body h5 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
}
.markdown-body h6 {
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
}
.markdown-body p {
  margin-left: 0;
  margin-right: 0;
}
.markdown-body pre, .markdown-body xmp, .markdown-body plaintext, .markdown-body listing {
  font-family: var(--monospace);
}
.markdown-body blockquote > :first-child {
  margin-top: 0;
}
.markdown-body blockquote > :last-child {
  margin-bottom: 0;
}
.markdown-body hr {
  border-style: inset;
  border-width: 1px;
}
.markdown-body img {
  max-width: 100%;
  height: auto;
}
.markdown-body li {
  word-wrap: break-all;
}
.markdown-body li + li {
  margin-top: 4px;
}
.markdown-body ul ul, .markdown-body ol ul, .markdown-body ul ol, .markdown-body ol ol {
  margin-top: 0;
  margin-bottom: 0;
}
.markdown-body .task-list-item {
  list-style-type: none;
}
.markdown-body a {
  color: #e66700;
  text-decoration: underline;
}
.markdown-body a img {
  border: none;
}
.markdown-body b, .markdown-body strong {
  font-weight: bold;
}
.markdown-body i, .markdown-body cite, .markdown-body em, .markdown-body var, .markdown-body address, .markdown-body dfn {
  font-style: italic;
}
.markdown-body code, .markdown-body kbd, .markdown-body tt, .markdown-body samp {
  font-family: var(--monospace);
}
.markdown-body mark {
  color: #6b6884;
  padding: 0.2em 0;
  background-color: #e6f9bd;
}
.markdown-body del, .markdown-body s {
  color: #8d8f95;
}
.markdown-body table {
  color: #272d38;
  border-collapse: collapse;
  background-color: white;
  border-spacing: 2px;
  font-size: 1em;
}
.markdown-body th, .markdown-body td {
  border-color: #bfc1c4;
  border-width: 1px;
  border-style: solid;
}
.markdown-body th {
  padding: 8px 8px;
  font-size: 1em;
  font-weight: 500;
}
.markdown-body td {
  padding: 8px 8px;
  font-size: 1em;
  font-weight: normal;
}
.markdown-body pre.md-fences,
.markdown-body pre.md-meta-block,
.markdown-body .md-rawblock-control:not(.md-rawblock-tooltip) .md-rawblock-input {
  border-radius: 3px;
  border: 1px solid #bfc1c4;
  padding: 10px;
  background-color: white;
}
.markdown-body .CodeMirror div.CodeMirror-cursor {
  border-color: #6b6884;
}
.markdown-body .md-math-block, .markdown-body .md-rawblock {
  margin-top: 1em;
  margin-bottom: 1em;
}
.markdown-body .md-rawblock > .md-rawblock-tooltip {
  background-color: white;
  transition: 0.5s;
  display: block;
  visibility: hidden;
  opacity: 0;
}
.markdown-body .md-rawblock:hover > .md-rawblock-tooltip {
  transition: 0.5s;
  visibility: visible;
  opacity: 1;
  animation: none;
}
.markdown-body .md-rawblock-control:not(.md-rawblock-tooltip) {
  padding-left: 0px;
  padding-right: 0px;
}

/**
 * 整体采用飞书云文档的布局规范，可以配合不同的 bear 配色方案。
 * Bear 的配色方案位于 src/themes/bear-palettes 目录。
 */
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
  color: #4d5255;
}
.markdown-body del, .markdown-body s {
  color: #8d8f95;
}
.markdown-body u {
  text-decoration: none;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #ff6a00 50%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 1em;
}
.markdown-body * {
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
  line-height: 1.4;
  font-weight: 500;
  margin-top: 1em;
  margin-bottom: 0.37em;
}
.markdown-body blockquote {
  display: block;
  margin-left: 0;
  padding-left: 14px;
  border-left: 2px solid #ff6a00;
}
.markdown-body code {
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid #bfc1c4;
  background-color: white;
  word-spacing: normal;
  line-height: 1.6;
  padding: 0 2px;
  color: #272d38;
}
.markdown-body a {
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  hyphens: auto;
  word-break: break-word;
  text-decoration: none;
}
.markdown-body a:hover {
  text-decoration: underline;
}
.markdown-body hr {
  margin: 13px 0 12px;
  border: 0px;
  height: 1px;
  background-origin: content-box;
  background-image: linear-gradient(90deg, #bfc1c4, #bfc1c4);
  background-repeat: no-repeat;
}
.markdown-body ul {
  margin-left: 0;
  padding-left: 22px;
  list-style: none;
}
.markdown-body ul > li:not([class*=task-list-item]) {
  word-wrap: break-all;
  padding-left: 0px;
}
.markdown-body ul > li:not([class*=task-list-item]):before {

  content: "•";
  color: #ff6a00;
  display: inline-block;
  margin-left: -20px;
  margin-right: 20px;
  width: 0px;
  font-size: 0.8em;
  transform: scale(1.25);
  font-family: PingFangSC-Regular, PingFang SC;
}
.markdown-body ul > li:not([class*=task-list-item]) li:not([class*=task-list-item])::before {
  content: "◦";
  transform: scale(1);
  font-weight: 700;
}
.markdown-body ul > li:not([class*=task-list-item]) li:not([class*=task-list-item]) li:not([class*=task-list-item])::before {
  content: "▪";
  transform: scale(1.25);
  font-weight: normal;
}
.markdown-body ol {
  counter-reset: ol_counter;
  margin-left: 0;
  padding-left: 22px;
  list-style: none;
}
.markdown-body ol > li:not([class*=task-list-item]) {
  word-wrap: break-all;
  padding-left: 0px;
  position: relative;
}
.markdown-body ol > li:not([class*=task-list-item]):before {
  content: counter(ol_counter) ".";
  counter-increment: ol_counter;
  color: #ff6a00;
  position: absolute;
  margin-left: -22px;
  margin-right: 4px;
  padding-left: 2px;
  padding-right: 2px;
  text-align: left;
  white-space: nowrap;
  overflow: visible;
  min-width: 18px;
  border-radius: 2px;
  transform: translateX(-2px);
  font-family: Helvetica Neue, Consolas;
}
.markdown-body li + li, .markdown-body ul ul, .markdown-body ol ul, .markdown-body ul ol, .markdown-body ol ol, .markdown-body li ul, .markdown-body li ol {
  margin-top: 4px;
}
.markdown-body .task-list-item {
  padding-left: 0.3rem;
}
.markdown-body .task-list-item > p {
  transition: color 0.3s, opacity 0.3s;
}
.markdown-body .task-list-item.task-list-done > p {
  color: #8d8f95;
  text-decoration: line-through;
}
.markdown-body .task-list-item.task-list-done > p > .md-emoji {
  opacity: 0.5;
}
.markdown-body .task-list-item.task-list-done > p > .md-link > a {
  opacity: 0.6;
}
.markdown-body .task-list-item > input {
  -webkit-appearance: initial;
  display: block;
  position: absolute;
  border: 1px solid #bfc1c4;
  border-radius: 0.25rem;
  margin-left: -1.5rem;
  height: 1.2rem;
  width: 1.2rem;
  transition: border-color 0.3s;
  background-color: #fafafa;
}
.markdown-body .task-list-item > input:focus {
  outline: none;
  box-shadow: none;
}
.markdown-body .task-list-item > input:hover {
  border-color: #ff6a00;
}
.markdown-body .task-list-item > input[checked]::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 50%;
  height: 60%;
  width: 2px;
  transform: rotate(40deg);
  background: #ff6a00;
}
.markdown-body .task-list-item > input[checked]::after {
  content: "";
  position: absolute;
  top: 46%;
  left: 25%;
  height: 30%;
  width: 2px;
  transform: rotate(-40deg);
  background: #ff6a00;
}
.markdown-body .cm-s-inner .cm-comment {
  color: #7f7e7d;
}
.markdown-body .cm-s-inner .cm-property,
.markdown-body .cm-s-inner .cm-tag {
  color: #905;
}
.markdown-body .cm-s-inner .cm-bracket,
.markdown-body .cm-s-inner .cm-punctuation {
  color: #999;
}
.markdown-body .cm-s-inner .cm-number {
  color: #0087b2;
}
.markdown-body .cm-s-inner .cm-qualifier,
.markdown-body .cm-s-inner .cm-string, .markdown-body .cm-s-inner .cm-string-2,
.markdown-body .cm-s-inner .cm-builtin {
  color: #357f1e;
}
.markdown-body .cm-s-inner .cm-attribute {
  color: #357f1e;
}
.markdown-body .cm-s-inner .cm-operator {
  color: #920448;
}
.markdown-body .cm-s-inner .cm-atom,
.markdown-body .cm-s-inner .cm-keyword {
  color: #2576b1;
}
.markdown-body .cm-s-inner .cm-def,
.markdown-body .cm-s-inner .cm-variable,
.markdown-body .cm-s-inner .cm-variable-2, .markdown-body .cm-s-inner .cm-variable-3 {
  color: #0E73A2;
}
.markdown-body .cm-s-inner .cm-type {
  color: #04202d;
}`;
