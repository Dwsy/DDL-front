export default `
@charset "UTF-8";
.markdown-body {
  word-break: break-word;
  line-height: 1.7;
  font-weight: 400;
  font-size: 20px;
  overflow-x: hidden;
}
.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  color:azure;
  line-height: 1.5;
  margin-bottom: 8px;
  padding-bottom: 8px;
}
.markdown-body h1 {
  color: rgb(160, 160, 160);
  font-size: 49px;
  margin-top: 32px;
  padding-top: 32px;
}
.markdown-body h2 {
  color: rgb(255, 255, 255);
  background-color: rgb(33, 33, 34);
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  border-bottom-right-radius: 100px;
  margin-top: 47px;
  padding-top: 4px;
  margin-bottom: 16px;
  padding-bottom: 4px;
  padding-right: 48px;
  padding-left: 8px;
  line-height: 1.7;
  font-size: 39px;
  transition: all 0.3s ease-out;
}
.markdown-body h2:hover {
  border-bottom-right-radius: 50px;
  transition: all 0.3s ease-out;
}
.markdown-body h3 {
  font-size: 31px;
  padding-left: 8px;
  margin-top: 32px;
  border-bottom: 2px solid rgb(198, 196, 196);
  line-height: 1.7;
}
.markdown-body h4 {
  font-size: 26px;
  padding-left: 8px;
  margin-top: 32px;
  border-bottom: 1px solid rgb(221, 221, 221);
}
.markdown-body h5 {
  font-size: 21px;
  margin-top: 24px;
}
.markdown-body h6 {
  margin-top: 18px;
  margin-top: 16px;
  line-height: 1.1;
}
.markdown-body p {
  font-size: 20px;
  text-align: start;
  white-space: normal;
  -webkit-text-size-adjust: auto;
     -moz-text-size-adjust: auto;
          text-size-adjust: auto;
  line-height: 2;
  margin-top: 16px;
  margin-bottom: 16px;
  color: #38b48b;
}
.markdown-body img {
  max-width: 100%;
  margin: auto;
  padding-left: 8px;
  padding-right: 8px;
}
.markdown-body hr {
  border-top: 4px double rgb(33, 33, 34);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin-top: 32px;
  margin-bottom: 32px;
  text-align: center;
}
.markdown-body hr:after {
  content: "♥";
  display: inline-block;
  position: relative;
  top: -15px;
  padding: 0 10px;
  color: rgb(33, 33, 34);
  font-size: 18px;
}
.markdown-body code {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  word-break: break-word;
  border-radius: 2px;
  overflow-x: auto;
  background-color: rgba(0, 0, 0, 0);
  color: rgb(239, 112, 96);
  font-size: 18px;
  padding: 0.065em 6px;
}
.markdown-body pre {
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  overflow: auto;
  position: relative;
  line-height: 1.7;
  box-shadow: 0 0 8px rgba(110, 110, 110, 0.45);
  border-radius: 2px;
  margin: 32px 16px;
}
.markdown-body pre:before {
  content: "";
  display: block;
  height: 30px;
  width: 100%;
  background: url(data:image/png;base64,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) 10px 10px no-repeat;
  background-color: rgb(33, 33, 34);
  box-shadow: 0 0 8px rgba(110, 110, 110, 0.45);
  background-size: 40px;
}
.markdown-body pre > code {
  font-size: 18px;
  padding: 16px 8px;
  margin: 0;
  word-break: normal;
  display: block;
  overflow-x: auto;
  color: rgb(255, 255, 255);
  background: #1e1e1e;
}
.markdown-body pre > code::-webkit-scrollbar {
  height: 10px;
  background-color: #f5f5f5;
}
.markdown-body pre > code::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  background-color: #f5f5f5;
}
.markdown-body pre > code::-webkit-scrollbar-thumb {
  border-radius: 3px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}
.markdown-body a {
  color: rgb(239, 112, 96);
  padding: 2px 2px;
  text-decoration: none;
  border-bottom: 0.125em solid rgb(239, 112, 96);
  border-radius: 2px;
  box-shadow: inset 0 -0.025em 0 rgb(239, 112, 96);
  transition: box-shadow 270ms cubic-bezier(0.77, 0, 0.175, 1), color 270ms cubic-bezier(0.77, 0, 0.175, 1);
}
.markdown-body a:focus, .markdown-body a:hover {
  outline: none;
  box-shadow: inset 0 -1.5em 0 rgb(239, 112, 96);
  color: rgb(255, 255, 255);
}
.markdown-body a::before {
  content: "⇲ ";
  vertical-align: top;
  margin-left: 2px;
  font-family: "dart" !important;
  font-size: 12px;
  color: inherit;
  opacity: 0.7;
}
.markdown-body table {
  background: rgb(251, 251, 251);
  border-radius: 4px;
  border-collapse: collapse;
  margin: auto;
  padding: 5px;
  width: 95%;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  -webkit-animation: float 5s infinite;
          animation: float 5s infinite;
}
.markdown-body table th {
  color: rgb(255, 255, 255);
  background: rgb(33, 33, 34);
  border-bottom: 1px solid #9ea7af;
  border-right: 1px solid #343a45;
  font-size: 22px;
  padding: 16px;
  text-align: left;
  vertical-align: middle;
}
.markdown-body table th:first-child {
  border-top-left-radius: 4px;
}
.markdown-body table th:last-child {
  border-top-right-radius: 4px;
  border-right: none;
}
.markdown-body table tr {
  border-top: 1px solid #c1c3d1;
  border-bottom: 1px solid #c1c3d1;
  color: #666b85;
}
.markdown-body table tr:hover td {
  background: rgb(33, 33, 34);
  color: rgb(255, 255, 255);
  border-top: 1px solid #22262e;
}
.markdown-body table tr:first-child {
  border-top: none;
}
.markdown-body table tr:last-child {
  border-bottom: none;
}
.markdown-body table tr:nth-child(odd) td {
  background: rgba(0, 0, 0, 0);
}
.markdown-body table tr:nth-child(odd):hover td {
  background: rgb(33, 33, 34);
}
.markdown-body table tr:last-child td:first-child {
  border-bottom-left-radius: 4px;
}
.markdown-body table tr:last-child td:last-child {
  border-bottom-right-radius: 4px;
}
.markdown-body table td {
  background: rgb(251, 251, 251);
  padding: 16px;
  text-align: left;
  vertical-align: middle;
  font-size: 20px;
  border-right: 1px solid #c1c3d1;
}
.markdown-body table td:last-child {
  border-right: 0px;
}
.markdown-body blockquote {
  color: rgb(119, 119, 119);
  padding: 1px 16px;
  margin: 24px 0;
  border-left: 4px solid rgb(198, 196, 196);
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.3s ease-out;
  border-radius: 4px;
}
.markdown-body blockquote:hover {
  border-left-color: rgb(33, 33, 34);
  background-color: rgb(33, 33, 34);
  color: rgb(255, 255, 255);
}
.markdown-body blockquote::after {
  display: block;
  content: "";
}
.markdown-body blockquote > p {
  margin: 10px 0;
}
.markdown-body ol,
.markdown-body ul {
  padding-left: 24px;
}
.markdown-body ol li,
.markdown-body ul li {
  color: white;
  margin-bottom: 6px;
  list-style: inherit;
}
.markdown-body ol li .task-list-item,
.markdown-body ul li .task-list-item {
  list-style: none;
}
.markdown-body ol li .task-list-item ul,
.markdown-body ol li .task-list-item ol,
.markdown-body ul li .task-list-item ul,
.markdown-body ul li .task-list-item ol {
  margin-top: 0;
}
.markdown-body ol ul,
.markdown-body ol ol,
.markdown-body ul ul,
.markdown-body ul ol {
  margin-top: 3px;
}
.markdown-body ol li {
  padding-left: 6px;
}
.markdown-body span.math {
  margin-left: 32px;
  font-size: 22px;
  font-weight: bold;
}
@media (max-width: 720px) {
.markdown-body h1 {
    font-size: 39.2px;
}
.markdown-body h2 {
    font-size: 31.2px;
}
.markdown-body h3 {
    font-size: 24.8px;
}
.markdown-body h4 {
    font-size: 20.8px;
}
.markdown-body h5 {
    font-size: 16.8px;
}
}`