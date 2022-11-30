const css = `
.twimg_popup {
  position: absolute; transform: translate(-50%, -50%);
  display: flex; align-items: center; justify-content: center;
  pointer-events: none; transition: 0.2s; z-index: 999;
}
.twimg_popup.hide {
  display: none;
}
.twimg_popup > svg {
  display: none; position: absolute; width: 24px; height: 24px;
}
.twimg_popup.load > svg {
  display: block; animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
.twimg_popup > div {
  position: relative; width: 100%; height: 100%;
}
.twimg_popup > div > div {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
  background-size: cover; background-repeat: no-repeat; background-position: center center;
  opacity: 0; transition: 0.2s;
}
.twimg_popup.show > div > div {
  opacity: 1;
}
.twimg_popup > div > img {
  width: 0; height: 0; opacity: 0;
}

/* #### padding and shadow #### */
.twimg_popup.show {
  padding: 6px; border-radius: 6px;
  background-color: rgba(255, 255, 255);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
html.dark .twimg_popup.show {
  background-color: rgba(21, 32, 43);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
}
body[style*="#FFFFFF"] .twimg_popup.show, body[style*="rgb(255, 255, 255)"] .twimg_popup.show {
  background-color: rgba(255, 255, 255);
  box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px;
}
body[style*="#15202B"] .twimg_popup.show, body[style*="rgb(21, 32, 43)"] .twimg_popup.show {
  background-color: rgba(21, 32, 43);
  box-shadow: rgba(136, 153, 166, 0.2) 0px 0px 15px, rgba(136, 153, 166, 0.15) 0px 0px 3px 1px;
}
body[style*="#000000"] .twimg_popup.show, body[style*="rgb(0, 0, 0)"] .twimg_popup.show {
  background-color: rgba(0, 0, 0);
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
}

/* #### TweetDeck ####
.is-narrow-columns section.column,		html.dark .is-narrow-columns section.column		{width: 384px;}
.is-narrow-columns .media-size-small,	html.dark .is-narrow-columns .media-size-small	{height: 96px;}
.is-narrow-columns .media-size-medium,	html.dark .is-narrow-columns .media-size-medium	{height: 192px;}
.is-narrow-columns .media-size-large,	html.dark .is-narrow-columns .media-size-large	{height: 384px;}
.is-medium-columns section.column,		html.dark .is-medium-columns section.column		{width: 448px;}
.is-medium-columns .media-size-small,	html.dark .is-medium-columns .media-size-small	{height: 112px;}
.is-medium-columns .media-size-medium,	html.dark .is-medium-columns .media-size-medium	{height: 224px;}
.is-medium-columns .media-size-large,	html.dark .is-medium-columns .media-size-large	{height: 448px;}
.is-wide-columns section.column,		html.dark .is-wide-columns section.column		{width: 512px;}
.is-wide-columns .media-size-small,		html.dark .is-wide-columns .media-size-small	{height: 128px;}
.is-wide-columns .media-size-medium,	html.dark .is-wide-columns .media-size-medium	{height: 256px;}
.is-wide-columns .media-size-large,		html.dark .is-wide-columns .media-size-large	{height: 512px;}
`;

export const twimg_zoom = (function () {
  let is_deck, is_keep, is_wait, is_load, is_show, show_timeout, hide_timeout;
  let popup, popup_bg, popup_img, css_popup_pos, css_popup_bg;
  return {
    init: function () {
      is_deck = document.location.href.indexOf('tweetdeck.twitter.com') >= 0;
      document.head.insertAdjacentHTML('beforeend', '<style>' + css + '</style>');
      popup = document.createElement('div');
      popup.innerHTML = '<svg viewBox="0,0,24,24"><circle cx="12" cy="12" r="10" fill="none" stroke="#1DA1F2" stroke-width="4" opacity="0.4" /><path d="M12,2 a10,10 0 0 1 10,10" fill="none" stroke="#1DA1F2" stroke-width="4" stroke-linecap="round" /></svg>';
      let container = document.createElement('div');
      popup_bg = document.createElement('div');
      popup_img = document.createElement('img');
      container.appendChild(popup_bg);
      container.appendChild(popup_img);
      popup.appendChild(container);
      popup.classList.add('twimg_popup', 'hide');
      document.body.appendChild(popup);
    },
    inject: function (photo) {
      photo.onmouseenter = () => this.popup(photo);
      photo.onmouseleave = () => this.close(200);
    },
    popup: function (photo) {
      let pos = photo.parentNode.getBoundingClientRect();
      let img = photo.querySelector('img');
      if (is_deck || img.naturalWidth > Math.ceil(pos.width) || img.naturalHeight > Math.ceil(pos.height) || img.width > Math.ceil(pos.width) || img.height > Math.ceil(pos.height)) {
        is_wait = true;
        if (is_load || is_show) {
          clearTimeout(hide_timeout);
          this.close(0);
        }
        show_timeout = setTimeout(() => {
          popup.classList.remove('hide');
          let img_src = (is_deck ? photo.style.backgroundImage.slice(5, -2) : img.src).replace(/120x120|240x240|360x360/, 'small');
          let pos = photo.parentNode.getBoundingClientRect();
          pos.cx = pos.left + pos.width / 2;
          pos.cy = pos.top + pos.height / 2 + window.pageYOffset;
          css_popup_pos = 'left: ' + pos.cx + 'px; top: ' + pos.cy + 'px; width: ' + pos.width + 'px; height: ' + pos.height + 'px;';
          css_popup_bg = photo.style.cssText + 'background-image: url(' + img_src + ')';
          popup.style.cssText = css_popup_pos;
          popup_bg.style.cssText = css_popup_bg;
          popup_img.src = img_src;
          let load_failed = 0;
          (function load_n_show() {
            show_timeout = setTimeout(() => {
              if (popup_img.naturalWidth > 0 && popup_img.naturalHeight > 0) {
                let zoom = {}, padding = 6;
                zoom.width_max = Math.min(popup_img.naturalWidth, 680, document.body.clientWidth - padding * 2);
                zoom.height_max = Math.min(popup_img.naturalHeight, 680, is_deck ? document.body.clientHeight - padding * 2 : 9999);
                zoom.width = popup_img.naturalWidth >= popup_img.naturalHeight ? zoom.width_max : (popup_img.naturalWidth >= zoom.width_max ? zoom.width_max : popup_img.naturalWidth) * (zoom.height_max / popup_img.naturalHeight);
                zoom.height = popup_img.naturalHeight >= popup_img.naturalWidth ? zoom.height_max : (popup_img.naturalHeight >= zoom.height_max ? zoom.height_max : popup_img.naturalHeight) * (zoom.width_max / popup_img.naturalWidth);
                let pos = photo.parentNode.getBoundingClientRect();
                zoom.cx = pos.left + pos.width / 2;
                zoom.cy = pos.top + pos.height / 2 + window.pageYOffset;
                zoom.cx_min = zoom.width / 2 + padding;
                zoom.cy_min = zoom.height / 2 + padding;
                zoom.cx_max = document.body.clientWidth - zoom.width / 2 - padding;
                zoom.cy_max = document.body.clientHeight - zoom.height / 2 - padding + window.pageYOffset;
                if (zoom.cx < zoom.cx_min) popup.style.left = zoom.cx_min + 'px';
                if (zoom.cx > zoom.cx_max) popup.style.left = zoom.cx_max + 'px';
                if (zoom.cy < zoom.cy_min) popup.style.top = zoom.cy_min + 'px';
                if (is_deck && zoom.cy > zoom.cy_max) popup.style.top = zoom.cy_max + 'px';
                popup_bg.style.margin = '';
                popup.style.width = zoom.width + 'px';
                popup.style.height = zoom.height + 'px';
                popup.classList.add('show');
                is_wait = false;
                is_load = false;
                is_show = true;
                if (load_failed > 0) popup.classList.remove('load');
              } else {
                is_load = true;
                if (load_failed === 0) popup.classList.add('load');
                load_failed++;
                if (load_failed < 14) load_n_show();
                else popup.classList.remove('load');
              }
            }, is_keep ? 250 + 250 * load_failed : 750);
          })();
          is_keep = true;
        }, 250);
      }
    },
    close: function (wait) {
      if (is_wait) clearTimeout(show_timeout);
      if (is_load || is_show) {
        hide_timeout = setTimeout(() => {
          popup.classList.remove('load', 'show');
          popup.style.cssText = css_popup_pos;
          popup_bg.style.cssText = css_popup_bg;
          is_load = false;
          is_show = false;
          setTimeout(() => {
            if (!is_wait && !is_show) {
              is_keep = false;
              popup.classList.add('hide');
            }
          }, 1000);
        }, wait);
      }
    }
  };
})();

// (function () {
//   twimg_zoom.init();
//   new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(node => {
//     if (node.tagName == 'DIV' || node.tagName == 'ARTICLE') {
//       let photos = node.dataset.testid == 'tweetPhoto' ? [node] : node.querySelectorAll('div[data-testid="tweetPhoto"], div:not(.is-video) > a.js-media-image-link');
//       photos.forEach(photo => twimg_zoom.inject(photo));
//     }
//   }))).observe(document.body, {childList: true, subtree: true});
// })();
