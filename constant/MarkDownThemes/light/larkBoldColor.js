export default `@charset "UTF-8";
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
/* color */
/* prism & pre */
/* font */
/* header */
/* spacing */
/* table */
/*
 * 基准样式，相当于 reset.css，使主题在不同平台下有统一的表现。
 * 各个属性的默认值为 chrome 的默认样式，见 variables/default.scss。
 */
:root {
  --text-color: #1f2329;
  --bg-color: white;
  --side-bar-bg-color: white;
  --active-file-bg-color: white;
  --rawblock-edit-panel-bd: #f5f6f7;
  --window-border: 0 solid white;
  --control-text-color: #1f2329;
  --primary-color: #3370ff;
  --primary-btn-border-color: #3370ff;
  --active-file-border-color: #3370ff;
  --primary-btn-text-color: #3370ff;
  --item-hover-text-color: #3370ff;
  --meta-content-color: #3370ff;
  --search-select-text-color: #3370ff;
  --heading-char-color: #3370ff;
  /* Mermaid diagrams*/
  --mermaid-theme: default;
}

.markdown-body {
  line-height: 1.68;
  -webkit-text-size-adjust: 100%;
  
  
  padding: 1.6rem 3.2rem;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, Segoe UI, PingFang SC, Microsoft Yahei, Hiragino Sans GB, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-size: 16px;
  color: #1f2329;
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
  color: #3370ff;
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
  color: #1f2329;
  padding: 0.2em 0;
  background-color: rgba(255, 246, 122, 0.8);
}
.markdown-body del, .markdown-body s {
  color: inherit;
}
.markdown-body table {
  color: black;
  border-collapse: collapse;
  background-color: white;
  border-spacing: 2px;
  font-size: 1em;
}
.markdown-body th, .markdown-body td {
  border-color: #dee0e3;
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
  border: 1px solid #dee0e3;
  padding: 10px;
  background-color: #f5f6f7;
}
.markdown-body .CodeMirror div.CodeMirror-cursor {
  border-color: #1f2329;
}
.markdown-body .md-math-block, .markdown-body .md-rawblock {
  margin-top: 1em;
  margin-bottom: 1em;
}
.markdown-body .md-rawblock > .md-rawblock-tooltip {
  background-color: #f5f6f7;
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
  border-left: 2px solid #3370ff;
  color: rgba(31, 35, 41, 0.7);
}
.markdown-body code {
  border-radius: 4px;
  margin-left: 2px;
  margin-right: 2px;
  border: 1px solid #dee0e3;
  background-color: #f5f6f7;
  word-spacing: normal;
  line-height: 1.6;
  padding: 0 2px;
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
  background-image: linear-gradient(90deg, #bbbfc4, #bbbfc4);
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
  color: #3370ff;
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
  color: #3370ff;
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
  color: #646a73;
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
  border: 1px solid #2b2f36;
  border-radius: 0.25rem;
  margin-left: -1.5rem;
  height: 1.2rem;
  width: 1.2rem;
  transition: border-color 0.3s;
}
.markdown-body .task-list-item > input:focus {
  outline: none;
  box-shadow: none;
}
.markdown-body .task-list-item > input:hover {
  border-color: #3370ff;
}
.markdown-body .task-list-item > input[checked]::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 50%;
  height: 60%;
  width: 2px;
  transform: rotate(40deg);
  background: #3370ff;
}
.markdown-body .task-list-item > input[checked]::after {
  content: "";
  position: absolute;
  top: 46%;
  left: 25%;
  height: 30%;
  width: 2px;
  transform: rotate(-40deg);
  background: #3370ff;
}

.markdown-body strong {
  color: #245bdb;
}`