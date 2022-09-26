(() => {
    var e = {
        163: e => {
            e.exports = function (e) {
                var t, n = [].forEach, l = [].some, o = document.body, s = !0, i = ' '

                function r(t, l) {
                    var o, s, a,
                        d = l.appendChild((o = t, s = document.createElement('li'), a = document.createElement('a'), e.listItemClass && s.setAttribute('class', e.listItemClass), e.onClick && (a.onclick = e.onClick), e.includeTitleTags && a.setAttribute('title', o.textContent), e.includeHtml && o.childNodes.length ? n.call(o.childNodes, (function (e) {
                            a.appendChild(e.cloneNode(!0))
                        })) : a.textContent = o.textContent, a.setAttribute('href', e.basePath + '#' + o.id), a.setAttribute('class', e.linkClass + i + 'node-name--' + o.nodeName + i + e.extraLinkClasses), s.appendChild(a), s))
                    if (t.children.length) {
                        var u = c(t.isCollapsed)
                        t.children.forEach((function (e) {
                            r(e, u)
                        })), d.appendChild(u)
                    }
                }

                function c(t) {
                    var n = e.orderedList ? 'ol' : 'ul', l = document.createElement(n),
                        o = e.listClass + i + e.extraListClasses
                    return t && (o += i + e.collapsibleClass, o += i + e.isCollapsedClass), l.setAttribute('class', o), l
                }

                function a(t) {
                    var n = 0
                    return null !== t && (n = t.offsetTop, e.hasInnerContainers && (n += a(t.offsetParent))), n
                }

                function d(t) {
                    return t && -1 !== t.className.indexOf(e.collapsibleClass) && -1 !== t.className.indexOf(e.isCollapsedClass) ? (t.className = t.className.split(i + e.isCollapsedClass).join(''), d(t.parentNode.parentNode)) : t
                }

                return {
                    enableTocAnimation: function () {
                        s = !0
                    }, disableTocAnimation: function (t) {
                        var n = t.target || t.srcElement
                        'string' == typeof n.className && -1 !== n.className.indexOf(e.linkClass) && (s = !1)
                    }, render: function (e, n) {
                        var l = c(!1)
                        if (n.forEach((function (e) {
                            r(e, l)
                        })), null !== (t = e || t)) return t.firstChild && t.removeChild(t.firstChild), 0 === n.length ? t : t.appendChild(l)
                    }, updateToc: function (r) {
                        var c
                        c = e.scrollContainer && document.querySelector(e.scrollContainer) ? document.querySelector(e.scrollContainer).scrollTop : document.documentElement.scrollTop || o.scrollTop, e.positionFixedSelector && function () {
                            var n
                            n = e.scrollContainer && document.querySelector(e.scrollContainer) ? document.querySelector(e.scrollContainer).scrollTop : document.documentElement.scrollTop || o.scrollTop
                            var l = document.querySelector(e.positionFixedSelector)
                            'auto' === e.fixedSidebarOffset && (e.fixedSidebarOffset = t.offsetTop), n > e.fixedSidebarOffset ? -1 === l.className.indexOf(e.positionFixedClass) && (l.className += i + e.positionFixedClass) : l.className = l.className.split(i + e.positionFixedClass).join('')
                        }()
                        var u, f = r
                        if (s && null !== t && f.length > 0) {
                            l.call(f, (function (t, n) {
                                return a(t) > c + e.headingsOffset + 10 ? (u = f[0 === n ? n : n - 1], !0) : n === f.length - 1 ? (u = f[f.length - 1], !0) : void 0
                            }))
                            var m = t.querySelectorAll('.' + e.linkClass)
                            n.call(m, (function (t) {
                                t.className = t.className.split(i + e.activeLinkClass).join('')
                            }))
                            var h = t.querySelectorAll('.' + e.listItemClass)
                            n.call(h, (function (t) {
                                t.className = t.className.split(i + e.activeListItemClass).join('')
                            }))
                            var C = t.querySelector('.' + e.linkClass + '.node-name--' + u.nodeName + '[href="' + e.basePath + '#' + u.id.replace(/([ #;&,.+*~':"!^$[\]()=>|/@])/g, '\\$1') + '"]')
                            C && -1 === C.className.indexOf(e.activeLinkClass) && (C.className += i + e.activeLinkClass)
                            var p = C && C.parentNode
                            p && -1 === p.className.indexOf(e.activeListItemClass) && (p.className += i + e.activeListItemClass)
                            var v = t.querySelectorAll('.' + e.listClass + '.' + e.collapsibleClass)
                            n.call(v, (function (t) {
                                -1 === t.className.indexOf(e.isCollapsedClass) && (t.className += i + e.isCollapsedClass)
                            })), C && C.nextSibling && -1 !== C.nextSibling.className.indexOf(e.isCollapsedClass) && (C.nextSibling.className = C.nextSibling.className.split(i + e.isCollapsedClass).join('')), d(C && C.parentNode.parentNode)
                        }
                    }
                }
            }
        }, 547: e => {
            e.exports = {
                tocSelector: '.js-toc',
                contentSelector: '.js-toc-content',
                headingSelector: 'h1, h2, h3',
                ignoreSelector: '.js-toc-ignore',
                hasInnerContainers: !1,
                linkClass: 'toc-link',
                extraLinkClasses: '',
                activeLinkClass: 'is-active-link',
                listClass: 'toc-list',
                extraListClasses: '',
                isCollapsedClass: 'is-collapsed',
                collapsibleClass: 'is-collapsible',
                listItemClass: 'toc-list-item',
                activeListItemClass: 'is-active-li',
                collapseDepth: 0,
                scrollSmooth: !0,
                scrollSmoothDuration: 420,
                scrollSmoothOffset: 0,
                scrollEndCallback: function (e) {
                },
                headingsOffset: 1,
                throttleTimeout: 50,
                positionFixedSelector: null,
                positionFixedClass: 'is-position-fixed',
                fixedSidebarOffset: 'auto',
                includeHtml: !1,
                includeTitleTags: !1,
                onClick: function (e) {
                },
                orderedList: !0,
                scrollContainer: null,
                skipRendering: !1,
                headingLabelCallback: !1,
                ignoreHiddenElements: !1,
                headingObjectCallback: null,
                basePath: '',
                disableTocScrollSync: !1
            }
        }, 971: function (e, t, n) {
            var l, o, s
            o = [], l = function (e) {
                'use strict'
                var t, l, o, s = n(547), i = {}, r = {}, c = n(163), a = n(279), d = n(938),
                    u = !!(e && e.document && e.document.querySelector && e.addEventListener)
                if ('undefined' != typeof window || u) {
                    var f = Object.prototype.hasOwnProperty
                    return r.destroy = function () {
                        var e = h(i)
                        null !== e && (i.skipRendering || e && (e.innerHTML = ''), i.scrollContainer && document.querySelector(i.scrollContainer) ? (document.querySelector(i.scrollContainer).removeEventListener('scroll', this._scrollListener, !1), document.querySelector(i.scrollContainer).removeEventListener('resize', this._scrollListener, !1), t && document.querySelector(i.scrollContainer).removeEventListener('click', this._clickListener, !1)) : (document.removeEventListener('scroll', this._scrollListener, !1), document.removeEventListener('resize', this._scrollListener, !1), t && document.removeEventListener('click', this._clickListener, !1)))
                    }, r.init = function (e) {
                        if (u) {
                            i = function () {
                                for (var e = {}, t = 0; t < arguments.length; t++) {
                                    var n = arguments[t]
                                    for (var l in n) f.call(n, l) && (e[l] = n[l])
                                }
                                return e
                            }(s, e || {}), this.options = i, this.state = {}, i.scrollSmooth && (i.duration = i.scrollSmoothDuration, i.offset = i.scrollSmoothOffset, r.scrollSmooth = n(374).initSmoothScrolling(i)), t = c(i), l = a(i), this._buildHtml = t, this._parseContent = l, this._headingsArray = o, r.destroy()
                            var C = function (e) {
                                try {
                                    return e.contentElement || document.querySelector(e.contentSelector)
                                } catch (t) {
                                    return console.warn('Contents element not found: ' + e.contentSelector), null
                                }
                            }(i)
                            if (null !== C) {
                                var p = h(i)
                                if (null !== p && null !== (o = l.selectHeadings(C, i.headingSelector))) {
                                    var v = l.nestHeadingsArray(o).nest
                                    i.skipRendering || t.render(p, v), this._scrollListener = m((function (e) {
                                        t.updateToc(o), !i.disableTocScrollSync && d(i)
                                        var n = e && e.target && e.target.scrollingElement && 0 === e.target.scrollingElement.scrollTop;
                                        (e && (0 === e.eventPhase || null === e.currentTarget) || n) && (t.updateToc(o), i.scrollEndCallback && i.scrollEndCallback(e))
                                    }), i.throttleTimeout), this._scrollListener(), i.scrollContainer && document.querySelector(i.scrollContainer) ? (document.querySelector(i.scrollContainer).addEventListener('scroll', this._scrollListener, !1), document.querySelector(i.scrollContainer).addEventListener('resize', this._scrollListener, !1)) : (document.addEventListener('scroll', this._scrollListener, !1), document.addEventListener('resize', this._scrollListener, !1))
                                    var g = null
                                    return this._clickListener = m((function (e) {
                                        i.scrollSmooth && t.disableTocAnimation(e), t.updateToc(o), g && clearTimeout(g), g = setTimeout((function () {
                                            t.enableTocAnimation()
                                        }), i.scrollSmoothDuration)
                                    }), i.throttleTimeout), i.scrollContainer && document.querySelector(i.scrollContainer) ? document.querySelector(i.scrollContainer).addEventListener('click', this._clickListener, !1) : document.addEventListener('click', this._clickListener, !1), this
                                }
                            }
                        }
                    }, r.refresh = function (e) {
                        r.destroy(), r.init(e || this.options)
                    }, e.tocbot = r, r
                }

                function m(e, t, n) {
                    var l, o
                    return t || (t = 250), function () {
                        var s = n || this, i = +new Date, r = arguments
                        l && i < l + t ? (clearTimeout(o), o = setTimeout((function () {
                            l = i, e.apply(s, r)
                        }), t)) : (l = i, e.apply(s, r))
                    }
                }

                function h(e) {
                    try {
                        return e.tocElement || document.querySelector(e.tocSelector)
                    } catch (t) {
                        return console.warn('TOC element not found: ' + e.tocSelector), null
                    }
                }
            }(void 0 !== n.g ? n.g : this.window || this.global), void 0 === (s = 'function' == typeof l ? l.apply(t, o) : l) || (e.exports = s)
        }, 279: e => {
            e.exports = function (e) {
                var t = [].reduce

                function n(e) {
                    return e[e.length - 1]
                }

                function l(e) {
                    return +e.nodeName.toUpperCase().replace('H', '')
                }

                function o(t) {
                    if (!(t instanceof window.HTMLElement)) return t
                    if (e.ignoreHiddenElements && (!t.offsetHeight || !t.offsetParent)) return null
                    const n = t.getAttribute('data-heading-label') || (e.headingLabelCallback ? String(e.headingLabelCallback(t.textContent)) : t.textContent.trim())
                    var o = {id: t.id, children: [], nodeName: t.nodeName, headingLevel: l(t), textContent: n}
                    return e.includeHtml && (o.childNodes = t.childNodes), e.headingObjectCallback ? e.headingObjectCallback(o, t) : o
                }

                return {
                    nestHeadingsArray: function (l) {
                        return t.call(l, (function (t, l) {
                            var s = o(l)
                            return s && function (t, l) {
                                for (var s = o(t), i = s.headingLevel, r = l, c = n(r), a = i - (c ? c.headingLevel : 0); a > 0 && (!(c = n(r)) || i !== c.headingLevel);) c && void 0 !== c.children && (r = c.children), a--
                                i >= e.collapseDepth && (s.isCollapsed = !0), r.push(s)
                            }(s, t.nest), t
                        }), {nest: []})
                    }, selectHeadings: function (t, n) {
                        var l = n
                        e.ignoreSelector && (l = n.split(',').map((function (t) {
                            return t.trim() + ':not(' + e.ignoreSelector + ')'
                        })))
                        try {
                            return t.querySelectorAll(l)
                        } catch (e) {
                            return console.warn('Headers not found with selector: ' + l), null
                        }
                    }
                }
            }
        }, 374: (e, t) => {
            t.initSmoothScrolling = function (e) {
                var t
                e.duration, e.offset, location.hash ? (t = location.href).slice(0, t.lastIndexOf('#')) : location.href
            }
        }, 938: e => {
            e.exports = function (e) {
                var t = e.tocElement || document.querySelector(e.tocSelector)
                if (t && t.scrollHeight > t.clientHeight) {
                    var n = t.querySelector('.' + e.activeListItemClass)
                    n && (t.scrollTop = n.offsetTop)
                }
            }
        }
    }, t = {}

    function n(l) {
        var o = t[l]
        if (void 0 !== o) return o.exports
        var s = t[l] = {exports: {}}
        return e[l].call(s.exports, s, s.exports, n), s.exports
    }

    n.g = function () {
        if ('object' == typeof globalThis) return globalThis
        try {
            return this || new Function('return this')()
        } catch (e) {
            if ('object' == typeof window) return window
        }
    }(), n(971)
})()