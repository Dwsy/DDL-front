export default `@charset "UTF-8";
.markdown-body {
  color: #595959;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  line-height: 1.8em;
  background-image: linear-gradient(90deg, rgba(60, 10, 30, 0.05) 3%, transparent 0), linear-gradient(1turn, rgba(60, 10, 30, 0.05) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  word-break: break-all;
  /* 颜色配置 */
  /* 颜色配置 end */
  /* 布局，一般不需要改动 */
  /* 布局 end */
  /* 任务列表 */
  /* 任务列表 end */
  /* 代码块框架 */
  /* 代码语法高亮 CodeMirror */
  /* 代码语法高亮 end */
}
.markdown-body * {
  box-sizing: border-box;
}
.markdown-body blockquote {
  margin-left: 0;
  background-color: #ebf4ff;
  border-color: #7f9cf5;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  color: #667eea;
}
.markdown-body strong {
  color: #5a67d8;
}
.markdown-body code,
.markdown-body a {
  color: #5a67d8;
}
.markdown-body a {
  border-color: #667eea;
}
.markdown-body code {
  background-color: #ebf4ff;
}
.markdown-body blockquote,
.markdown-body details,
.markdown-body dl,
.markdown-body ol,
.markdown-body p,
.markdown-body pre,
.markdown-body table,
.markdown-body ul {
  margin-bottom: 1rem;
}
.markdown-body ol {
  list-style: decimal;
}
.markdown-body ul {
  list-style: disc;
}
.markdown-body ol,
.markdown-body ul {
  padding-left: 2em;
}
.markdown-body h1,
.markdown-body h2 {
  border-color: #5a67d8;
  border-style: solid;
  border-top-width: 0px;
  border-right-width: 0px;
  font-weight: 500;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  padding-left: 0.75rem;
}
.markdown-body h1,
.markdown-body h2 {
  border-bottom: 1px solid #eaecef !important;
  border-left-width: 6px;
}
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-bottom: 16px;
  line-height: 1.25;
}
.markdown-body blockquote {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-left: 0.25em solid;
}
.markdown-body blockquote > :last-child {
  margin-bottom: 0;
}
.markdown-body blockquote > :first-child {
  margin-top: 0;
}
.markdown-body strong {
  font-weight: bold;
}
.markdown-body strong::before {
  content: "「";
}
.markdown-body strong::after {
  content: "」";
}
.markdown-body code,
.markdown-body a {
  font-weight: 500;
}
.markdown-body code,
.markdown-body a {
  font-size: unset;
}
.markdown-body a {
  text-decoration: none;
  border-bottom: 1px solid;
}
.markdown-body .footnote-ref {
  border-width: 0px;
}
.markdown-body code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.markdown-body pre > code {
  font-weight: 400;
  color: unset;
  line-height: 1.6;
}
.markdown-body picture img {
  border-radius: 6px;
  display: block;
  margin: 10px auto;
  -o-object-fit: contain;
  object-fit: contain;
  box-shadow: 2px 4px 7px #999;
}
.markdown-body img {
  max-width: 100%;
  display: block;
  margin: 10px auto;
  object-fit: contain;
  border-radius: 6px;
  box-shadow: 2px 4px 7px #999;
}
.markdown-body picture {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6px;
  margin-bottom: 6px;
}
.markdown-body .svg-markmap-box {
  min-height: 20rem;
  width: 100%;
}
.markdown-body .footnotes {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.markdown-body .task-list-item {
  padding-left: 0.3rem;
  list-style-type: none;
}
.markdown-body .task-list-item > p {
  transition: color 0.3s, opacity 0.3s;
}
.markdown-body .task-list-item.task-list-done > p {
  color: #525252;
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
  border: 1px solid #5a67d8;
  border-radius: 0.25rem;
  margin-left: -1.5rem;
  height: 1.2rem;
  width: 1.2rem;
  transition: border-color 0.3s;
  background-color: unset;
}
.markdown-body .task-list-item > input:focus {
  outline: none;
  box-shadow: none;
}
.markdown-body .task-list-item > input:hover {
  border-color: #5a67d8;
}
.markdown-body .task-list-item > input[checked]::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 50%;
  height: 60%;
  width: 2px;
  transform: rotate(40deg);
  background: #5a67d8;
}
.markdown-body .task-list-item > input[checked]::after {
  content: "";
  position: absolute;
  top: 46%;
  left: 25%;
  height: 30%;
  width: 2px;
  transform: rotate(-40deg);
  background: #5a67d8;
}
.markdown-body pre.md-fences,
.markdown-body pre.md-meta-block,
.markdown-body .md-rawblock-control:not(.md-rawblock-tooltip) .md-rawblock-input {
  padding: 12px;
  padding-top: 6px;
  margin: 0.5em 0;
  overflow: auto;
  border-radius: 6px;
  color: #f8f8f2;
  background: #272822;
  text-shadow: 0 1px rgba(0, 0, 0, 0.3);
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 1em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
.markdown-body pre.md-fences::before,
.markdown-body pre.md-meta-block::before,
.markdown-body .md-rawblock-control:not(.md-rawblock-tooltip) .md-rawblock-input::before {
  content: "";
  display: block;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDU0IDE0Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkiPgogICAgPGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9IjYiIGZpbGw9IiNGRjVGNTYiIHN0cm9rZT0iI0UwNDQzRSIgc3Ryb2tlLXdpZHRoPSIuNSIvPgogICAgPGNpcmNsZSBjeD0iMjYiIGN5PSI2IiByPSI2IiBmaWxsPSIjRkZCRDJFIiBzdHJva2U9IiNERUExMjMiIHN0cm9rZS13aWR0aD0iLjUiLz4KICAgIDxjaXJjbGUgY3g9IjQ2IiBjeT0iNiIgcj0iNiIgZmlsbD0iIzI3QzkzRiIgc3Ryb2tlPSIjMUFBQjI5IiBzdHJva2Utd2lkdGg9Ii41Ii8+CiAgPC9nPgo8L3N2Zz4K");
  height: 30px;
  width: 100%;
  margin-bottom: -7px;
  background-size: 40px;
  background-repeat: no-repeat;
}
.markdown-body .cm-s-inner .cm-comment {
  color: #8292a2;
}
.markdown-body .cm-s-inner .cm-property,
.markdown-body .cm-s-inner .cm-tag {
  color: #f92672;
}
.markdown-body .cm-s-inner .cm-bracket,
.markdown-body .cm-s-inner .cm-punctuation {
  color: #f8f8f2;
}
.markdown-body .cm-s-inner .cm-number {
  color: #ae81ff;
}
.markdown-body .cm-s-inner .cm-qualifier,
.markdown-body .cm-s-inner .cm-string, .markdown-body .cm-s-inner .cm-string-2,
.markdown-body .cm-s-inner .cm-builtin {
  color: #a6e22e;
}
.markdown-body .cm-s-inner .cm-attribute {
  color: #a6e22e;
}
.markdown-body .cm-s-inner .cm-operator {
  color: #f8f8f2;
}
.markdown-body .cm-s-inner .cm-atom,
.markdown-body .cm-s-inner .cm-keyword {
  color: #66d9ef;
}
.markdown-body .cm-s-inner .cm-def,
.markdown-body .cm-s-inner .cm-variable,
.markdown-body .cm-s-inner .cm-variable-2, .markdown-body .cm-s-inner .cm-variable-3 {
  color: #f8f8f2;
}
.markdown-body .cm-s-inner .cm-type {
  color: #cbcb9f;
}`;
