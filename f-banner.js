// window.AdsPlayBannerReady || (! function(e, t) {
(! function(e, t) {
    function i() {
        if (!r) {
            r = !0;
            for (var e = 0; e < n.length; e++) n[e].fn.call(window, n[e].ctx);
            n = []
        }
    }

    function a() {
        "complete" === document.readyState && i()
    }
    e = e || "AdsPlayBannerReady";
    var n = [],
        r = !1,
        o = !1;
    (t = t || window)[e] = function(e, t) {
        r ? setTimeout(function() {
            e(t)
        }, 1) : (n.push({
            fn: e,
            ctx: t
        }), "complete" === document.readyState ? setTimeout(i, 1) : o || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", i, !1), window.addEventListener("load", i, !1)) : (document.attachEvent("onreadystatechange", a), window.attachEvent("onload", i)), o = !0))
    }
}("AdsPlayBannerReady", window), function(e, t) {
    "use strict";
    var i = function(e) {
            if ("object" != typeof e.document) throw new Error("AdsPlayCookies.js requires a `window` with a `document` object");
            var t = function(e, i, a) {
                return 1 === arguments.length ? t.get(e) : t.set(e, i, a)
            };
            return t._document = e.document, t._cacheKeyPrefix = "cookey.", t._maxExpireDate = new Date("Fri, 31 Dec 9999 23:59:59 UTC"), t.defaults = {
                path: "/",
                secure: !1
            }, t.get = function(e) {
                return t._cachedDocumentCookie !== t._document.cookie && t._renewCache(), t._cache[t._cacheKeyPrefix + e]
            }, t.set = function(e, i, a) {
                return a = t._getExtendedOptions(a), a.expires = t._getExpiresDate(void 0 === i ? -1 : a.expires), t._document.cookie = t._generateAdsPlayCookiestring(e, i, a), t
            }, t.expire = function(e, i) {
                return t.set(e, void 0, i)
            }, t._getExtendedOptions = function(e) {
                return {
                    path: e && e.path || t.defaults.path,
                    domain: e && e.domain || t.defaults.domain,
                    expires: e && e.expires || t.defaults.expires,
                    secure: e && void 0 !== e.secure ? e.secure : t.defaults.secure
                }
            }, t._isValidDate = function(e) {
                return "[object Date]" === Object.prototype.toString.call(e) && !isNaN(e.getTime())
            }, t._getExpiresDate = function(e, i) {
                if (i = i || new Date, "number" == typeof e ? e = e === 1 / 0 ? t._maxExpireDate : new Date(i.getTime() + 1e3 * e) : "string" == typeof e && (e = new Date(e)), e && !t._isValidDate(e)) throw new Error("`expires` parameter cannot be converted to a valid Date instance");
                return e
            }, t._generateAdsPlayCookiestring = function(e, t, i) {
                var a = (e = (e = e.replace(/[^#$&+\^`|]/g, encodeURIComponent)).replace(/\(/g, "%28").replace(/\)/g, "%29")) + "=" + (t = (t + "").replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent));
                return a += (i = i || {}).path ? ";path=" + i.path : "", a += i.domain ? ";domain=" + i.domain : "", a += i.expires ? ";expires=" + i.expires.toUTCString() : "", a += i.secure ? ";secure" : ""
            }, t._getCacheFromString = function(e) {
                for (var i = {}, a = e ? e.split("; ") : [], n = 0; n < a.length; n++) {
                    var r = t._getKeyValuePairFromAdsPlayCookiestring(a[n]);
                    void 0 === i[t._cacheKeyPrefix + r.key] && (i[t._cacheKeyPrefix + r.key] = r.value)
                }
                return i
            }, t._getKeyValuePairFromAdsPlayCookiestring = function(e) {
                var t = e.indexOf("=");
                return t = t < 0 ? e.length : t, {
                    key: decodeURIComponent(e.substr(0, t)),
                    value: decodeURIComponent(e.substr(t + 1))
                }
            }, t._renewCache = function() {
                t._cache = t._getCacheFromString(t._document.cookie), t._cachedDocumentCookie = t._document.cookie
            }, t._areEnabled = function() {
                var e = "AdsPlayCookies.js",
                    i = "1" === t.set(e, 1).get(e);
                return t.expire(e), i
            }, t.enabled = t._areEnabled(), t
        },
        a = "object" == typeof e.document ? i(e) : i;
    "function" == typeof define && define.amd ? define(function() {
        return a
    }) : "object" == typeof exports ? exports.AdsPlayCookies = a : e.AdsPlayCookies = a
}("undefined" == typeof window ? this : window), function(e, t) {
    var adsResponse = {};
    function i(e) {
        (e = e || {}).url = e.url || null, e.vars = e.vars || {}, e.error = e.error || function() {}, e.success = e.success || function() {}, e.vars.cb = Math.floor(1e13 * Math.random());
        var t = [];
        for (var i in e.vars) t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e.vars[i]));
        var a = t.join("&");
        if (e.url) {
            var n = new Image;
            n.onerror && (n.onerror = e.error), n.onload && (n.onload = e.success), e.noParameter ? n.src = e.url : e.url.indexOf("?") > 0 ? n.src = e.url + "&" + a : n.src = e.url + "?" + a
        }
    }

    function a() {
        var e = (new Date).getTime();
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(t) {
            var i = (e + 16 * Math.random()) % 16 | 0;
            return e = Math.floor(e / 16), ("x" == t ? i : 3 & i | 8).toString(16)
        })
    }

    function n() {
        var e = AdsPlayCookies.get("apluuid");
        return e || (e = a(), AdsPlayCookies.set("apluuid", e, {
            expires: 315569520
        })), e
    }

    function r(e, t) {
        var i = new XMLHttpRequest;
        i.onreadystatechange = function() {
            4 == i.readyState && 200 == i.status && "function" == typeof t && t(i.responseText)
        }, i.onerror = function() {
            window.console && window.console.error(" ajaxCorsRequest for URL: " + e)
        }, i.open("GET", e, !0), i.withCredentials = !0, i.send()
    }

    function o(e, t, i, a, n, r, o) {
        var d = "adsplay-iframe-ad-" + n,
            s = document.createElement("img");
        s.setAttribute("style", "width:" + t + "px;height:" + i + "px"), s.setAttribute("width", t), s.setAttribute("height", i), s.setAttribute("src", a), s.setAttribute("id", d);
        var l = document.createElement("ins");
        l.style.display = "inline-table", l.style.border = "none", l.style.margin = "0px", l.style.padding = "0", l.style.position = "relative", l.style["background-color"] = "transparent", l.style.width = t + "px", l.setAttribute("title", e), l.appendChild(s);
        var c = document.createElement("a");
        return c.setAttribute("href", o), c.setAttribute("target", "_blank"), c.setAttribute("id", "adsplay-click-handle-" + n), c.setAttribute("onclick", "AdsPlayBanner.handleAdClick(" + n + ")"), c.appendChild(l), c
    }

    function d(e, t, i, a, n, r, o) {
        var d = "adsplay-iframe-ad-" + n,
            s = document.createElement("iframe");
        s.setAttribute("frameborder", "0"), s.setAttribute("marginwidth", "0"), s.setAttribute("vspace", "0"), s.setAttribute("hspace", "0"), s.setAttribute("allowtransparency", "true"), s.setAttribute("scrolling", "no"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("style", "left:0;position:absolute;top:0;"), s.setAttribute("allowfullscreen", "true"), s.setAttribute("width", t), s.setAttribute("height", i), s.setAttribute("src", a), s.setAttribute("id", d);
        var l = document.createElement("ins");
        return l.style.display = "inline-table", l.style.border = "none", l.style.margin = "0px", l.style.padding = "0", l.style.position = "relative", l.style["background-color"] = "transparent", l.style.width = t + "px", l.setAttribute("title", e), l.appendChild(s), l
    }

    function s(e, t) {
        var a = "display:block;border:none;margin:0 auto;padding:0;position:relative;visibility:visible;background-color:transparent;text-align: center;",
            n = e.clickthroughUrl,
            r = e.adMedia,
            s = e.adId,
            c = e.adBeacon,
            u = e.width > 0 ? e.width + "px" : "100%",
            p = e.height > 0 ? e.height + "px" : "100%",
            g = e.placementId,
            h = e.clickActionText,
            y = e.adType,
            m = e.adCode,
            b = e.tracking3rdUrls || [];
        if (v[s] = c, !t.getAttribute("data-adsplay-adid")) {
            t.setAttribute("data-adsplay-adid", s), t.setAttribute("id", "adsplay-holder" + +s);
            var x = !1;
            if (5 === y) {
                a = a + ";width:" + u + ";height:" + p, t.setAttribute("style", a);
                A = d(h, u, p, r + "#adid=" + s + "&beacon=" + c + "&clicktag=" + n, s, c, n);
                t.appendChild(A), x = !0
            } else if (6 === y && g === 1011) {
                a = a + ";width:" + u + ";height:" + p, t.setAttribute("style", a);
                t.style.textAlign = 'right';
                if (typeof r === 'string' && r.split(',').length > 1) {
                    var r1 = r.split(',');
                    A = o(h, u, p, r1[0], s, c, n);
                    t.appendChild(A), x = !0;
                    var t1 = document.querySelector('ins.adsplay-placement[data-aplpm="1012"]');
                    if (t1 && !t1.getAttribute("data-adsplay-adid")) {
                        t1.setAttribute("data-adsplay-adid", s), t1.setAttribute("id", "adsplay-holder" + +s);
                        t1.setAttribute("style", a);
                        t1.style.textAlign = 'left';
                        A1 = o(h, u, p, r1[1], s, c, n);
                        t1.appendChild(A1)
                    }
                } else {
                    A = o(h, u, p, r, s, c, n);
                    t.appendChild(A), x = !0;
                }
            } else if (6 === y) {
                a = a + ";width:" + u + ";height:" + p, t.setAttribute("style", a);
                A = o(h, u, p, r, s, c, n);
                t.appendChild(A), x = !0
            } else if (9 === y && "" != m) {
                a = a + ";width:" + u + ";height:" + p, t.setAttribute("style", a);
                var M = document.createElement("iframe");
                M.setAttribute("width", u), M.setAttribute("height", p), M.setAttribute("src", "about:blank"), M.setAttribute("frameborder", "0"), M.setAttribute("marginwidth", "0"), M.setAttribute("marginheight", "0"), M.setAttribute("vspace", "0"), M.setAttribute("hspace", "0"), M.setAttribute("allowtransparency", "true"), M.setAttribute("scrolling", "no"), M.setAttribute("allowfullscreen", "true"), M.setAttribute("id", "adsplay_frame_" + g), t.appendChild(M), M.contentDocument.write(m)
            } else if (11 === y) {
                var A = l(e);
                t.appendChild(A), g < 300 && (a = a + ";width:" + u + ";height:" + p, t.setAttribute("style", a)), x = !0
            }
            if (x) {
                i({
                    url: f,
                    vars: {
                        metric: "impression",
                        adid: s,
                        beacon: v[s]
                    }
                });
                for (var w = 0; w < b.length; w++) i({
                    url: b[w],
                    vars: {},
                    noParameter: !0
                })
            }
            var configAd = adsResponse.find(function(ad){ad.placementId === g});
            if (configAd.impressionAdTrackingUrls) {
              for (var count = 0; count < configAd.impressionAdTrackingUrls.length; count++)
                i({
                  url: configAd.impressionAdTrackingUrls[count],
                  vars: {},
                  noParameter: !0
                });
            }
        }
    }

    function l(e) {
        function t(e) {
            var t = e.querySelector("video");
            if (t) {
                t.addEventListener("loadstart", function() {
                    setTimeout(function() {
                        t.play()
                    }, n)
                }, !1);
                var i = e.querySelector("a").getAttribute("href");
                t.addEventListener("click", function() {
                    window.open(i)
                }, !1)
            }
        }

        function a(e) {
            var t = e.querySelector("video");
            t && e.querySelector(".volume").addEventListener("click", function() {
                this.classList.contains("active") ? (this.classList.remove("active"), this.style.backgroundImage = "url(" + g + ")", t.muted = !0) : (this.classList.add("active"), this.style.backgroundImage = "url(" + p + ")", t.muted = !1)
            })
        }! function(e) {
            var t = e.tracking3rdUrls;
            if ("object" == typeof t)
                for (var a = 0; a < t.length; a++) {
                    var n = t[a];
                    if (n) {
                        var r = 1e3 * n.delay,
                            o = n.url;
                        setTimeout(function(e) {
                            i({
                                url: e,
                                vars: {}
                            })
                        }, r, o)
                    }
                }
        }(e);
        var n = e.delayShowVideo || 0;
        if (e.placementId < 300) {
            r = c(e);
            return window.addEventListener("DOMContentLoaded", t(r), !1), a(r), r
        }
        var r = u(e);
        return window.addEventListener("DOMContentLoaded", t(r), !1), 1 == e.align && a(r), r
    }

    function c(e) {
        var t = e.adId,
            i = e.textColor ? e.textColor : "#fff",
            a = document.createElement("div"),
            n = e.width ? e.width + "px" : "100%",
            r = e.height ? e.height + "px" : "100%",
            o = "" != e.adMedia,
            d = "background-color: #000;",
            s = "";
        e.background && (-1 != e.background.indexOf("//") ? (d = 'background-image: url("' + e.background + '");', s = 'poster:"' + e.background + '"') : d = e.background);
        var l = "width: " + n + "; height: " + r + ";";
        a.style.position = "relative", a.className = "masthead-web", a.style.cssText = l + 'position: relative; margin: 0 auto; font-family: "Roboto", sans-serif;';
        var c = document.createElement("a"),
            u = e.clickthroughUrl ? e.clickthroughUrl : "#";
        c.setAttribute("href", u), c.setAttribute("target", "_blank"), c.setAttribute("id", "adsplay-click-handle-" + t), c.setAttribute("onclick", "AdsPlayBanner.handleAdClick(" + t + ")");
        var p = d + "background-repeat: no-repeat;background-position: center center;background-size: cover;cursor: pointer;width: 100%;height: 100%;position: absolute;top: 0;left: 0;";
        if (c.style.cssText = p, o) {
            var h = document.createElement("div");
            h.className = "video", h.style.cssText = "position:absolute; " + e.styleAttr;
            var y = "";
            if (void 0 === e.adMedia || -1 != e.adMedia.indexOf("youtu.be") && -1 != e.adMedia.indexOf("youtube")) {
                var m = "&"; - 1 != e.adMedia.indexOf("?") && (m = "?"), m += "rel=0&enablejsapi=1&autoplay=1&loop=1&iv_load_policy=3", y = '<iframe frameborder="0" allowfullscreen="1" width="100%" height="100%" src="' + e.adMedia + m + '"></iframe>'
            } else y = '<video width="100%" height="100%" ' + s + ' loop preload="auto" muted playsinline webkit-playsinline onclick="AdsPlayBanner.handleAdClick(' + e.adId + ')"><source src="' + e.adMedia + '" type="video/mp4"></video>';
            h.innerHTML += y;
            var f = '<div class="volume" style="' + ("position: absolute; top: 0; left: 0; z-idex: 999; width: 36pt; height: 36pt; opacity: 0.6;background-image: url(" + g + "); background-color: rgba(0, 0, 0, 0.2);background-repeat: no-repeat; background-size: contain;") + '">';
            h.innerHTML += f
        }
        var v = document.createElement("div");
        v.className = "brand", v.style.cssText = "position: absolute; width: 40%; top: 50%; left: 80px; margin-top: -40px;";
        var b = "display: table-cell;vertical-align: middle;";
        if ("" != e.brandIcon) {
            var x = '<div style="' + b + '"><img src="' + e.brandIcon + '" style="width: 80px; margin-right: 10px;" /></div>';
            v.innerHTML += x
        }
        if ("" != e.headlineText) {
            var M = '<div style="' + b + '"><h4 style="margin: 0 0 5px;font-weight: 200;font-size: 22px;' + i + '">' + e.headlineText + '<a href="' + e.clickthroughUrl + '" style="' + i + 'cursor: pointer;background-color: rgba(0, 0, 0, 0.8); border-radius: 6px; padding: 4px 8px; margin-left: 10px; font-size: 16px; text-decoration: none;" >' + e.clickActionText + "</a></h4></div>";
            v.innerHTML += M
        }
        if (a.appendChild(c), o && a.appendChild(h), a.appendChild(v), e.closeAd) {
            var A = '<a href="javascript:AdsPlayBanner.closeAdView(' + t + ')" style="' + i + 'cursor: pointer;position: absolute; top: 0; right: 5px;line-height: 25px;height: 25px; font-size: 12px;">Close Ad &#10060;</a>';
            a.innerHTML += A
        }
        return a
    }

    function u(e) {
        var t = e.adId,
            i = document.createElement("div");
        i.style.position = "relative", i.className = "masthead-mobile", i.style.cssText = 'position: relative; box-sizing: border-box; width: 100%; margin: 0; padding: 1%; font-family: "Roboto", sans-serif;';
        var a = "display: inline-block;vertical-align: middle;box-sizing: border-box;",
            n = document.createElement("div");
        n.className = "video", n.style.cssText = "width: 100%;display: inline-block;position: relative;";
        var r = document.createElement("div");
        r.style.cssText = "padding-top: 56.25%; display: block;";
        var o = document.createElement("div");
        o.style.cssText = "position: absolute;top: 0;bottom: 0;right: 0;left: 0;", n.appendChild(r), n.appendChild(o);
        var d = "";
        if (void 0 === e.adMedia || -1 != e.adMedia.indexOf("youtu.be") && -1 != e.adMedia.indexOf("youtube")) {
            var s = "&"; - 1 != e.adMedia.indexOf("?") && (s = "?"), s += "rel=0&enablejsapi=1&autoplay=1&loop=1&iv_load_policy=3", d = '<iframe frameborder="0" allowfullscreen="1" width="100%" height="100%" src="' + e.adMedia + s + '"></iframe>'
        } else d = '<video width="100%" height="100%" poster="' + e.background + '" loop muted playsinline webkit-playsinline preload="auto" onclick="AdsPlayBanner.handleAdClick(' + e.adId + ')"><source src="' + e.adMedia + '" type="video/mp4"></video>';
        if (o.innerHTML += d, 1 == e.align) {
            var l = '<div class="volume" style="' + ("position: absolute; top: 0; left: 0; z-idex: 999; width: 36pt; height: 36pt; opacity: 0.6;background-image: url(" + g + "); background-color: rgba(0, 0, 0, 0.2);background-repeat: no-repeat; background-size: contain;") + '"></div>';
            o.innerHTML += l;
            var c = '<div class="close" style="' + ("position: absolute; top: 0; right: 0; z-idex: 999; width: 36pt; height: 36pt; opacity: 0.8;background-image: url(" + h + "); background-color: rgba(0, 0, 0, 0.2);background-repeat: no-repeat; background-size: contain;") + '" onclick="AdsPlayBanner.closeAdView(' + t + ')" ></div>';
            o.innerHTML += c
        }
        var u = document.createElement("div");
        u.className = "brand", u.style.cssText = "width:100%;";
        var p = 0;
        if ("" != e.brandIcon)
            if (1 == e.align) {
                var y = '<div style="' + a + "width:" + (p = 20) + '%;"><img src="' + e.brandIcon + '" style="max-width:100%;max-height:48pt;"/></div>';
                u.innerHTML += y
            } else p = 40, n.style.cssText = a + "position:relative; width:" + p + "%;", u.appendChild(n);
        if ("" != e.headlineText) {
            var m = "",
                f = 10,
                v = 12,
                b = 9;
            /iPad/i.test(navigator.userAgent) && (f += 4, v += 4, b += 4), "" != e.clickthroughUrl && (m = '<a onclick="' + ("AdsPlayBanner.handleAdClick(" + t + ")") + '" target="_blank" id="' + ("adsplay-click-handle-" + t) + '" style="font-size: ' + f + 'pt;color: #3f51b5;" href="' + e.clickthroughUrl + '">' + e.clickActionText + "</a>");
            var x = '<div style="' + a + "width:" + (100 - p) + '%; text-align: left; padding-left:1.5%;"><span style="margin: 0 0 5px; font-weight: 100; font-size: ' + v + 'pt;">' + e.headlineText + '</span><div style="color: #777;font-size:' + b + 'pt;">' + e.descriptionText + "</div>" + m + "</div>";
            u.innerHTML += x
        }
        return 1 == e.align && i.appendChild(n), i.appendChild(u), i
    }
    var p = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTYgMTh2MTJoOGwxMCAxMFY4TDE0IDE4SDZ6bTI3IDZjMC0zLjUzLTIuMDQtNi41OC01LTguMDV2MTYuMTFjMi45Ni0xLjQ4IDUtNC41MyA1LTguMDZ6TTI4IDYuNDZ2NC4xM2M1Ljc4IDEuNzIgMTAgNy4wNyAxMCAxMy40MXMtNC4yMiAxMS42OS0xMCAxMy40MXY0LjEzYzguMDEtMS44MiAxNC04Ljk3IDE0LTE3LjU0UzM2LjAxIDguMjggMjggNi40NnoiLz48cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
        g = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMzIDI0YzAtMy41My0yLjA0LTYuNTgtNS04LjA1djQuNDJsNC45MSA0LjkxYy4wNi0uNDIuMDktLjg1LjA5LTEuMjh6bTUgMGMwIDEuODgtLjQxIDMuNjUtMS4wOCA1LjI4bDMuMDMgMy4wM0M0MS4yNSAyOS44MiA0MiAyNyA0MiAyNGMwLTguNTYtNS45OS0xNS43Mi0xNC0xNy41NHY0LjEzYzUuNzggMS43MiAxMCA3LjA3IDEwIDEzLjQxek04LjU1IDZMNiA4LjU1IDE1LjQ1IDE4SDZ2MTJoOGwxMCAxMFYyNi41NWw4LjUxIDguNTFjLTEuMzQgMS4wMy0yLjg1IDEuODYtNC41MSAyLjM2djQuMTNjMi43NS0uNjMgNS4yNi0xLjg5IDcuMzctMy42MkwzOS40NSA0MiA0MiAzOS40NWwtMTgtMThMOC41NSA2ek0yNCA4bC00LjE4IDQuMThMMjQgMTYuMzZWOHoiLz48cGF0aCBkPSJNMCAwaDQ4djQ4SDB6IiBmaWxsPSJub25lIi8+PC9zdmc+",
        h = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4IiB3aWR0aD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTM4IDEyLjgzbC0yLjgzLTIuODMtMTEuMTcgMTEuMTctMTEuMTctMTEuMTctMi44MyAyLjgzIDExLjE3IDExLjE3LTExLjE3IDExLjE3IDIuODMgMi44MyAxMS4xNy0xMS4xNyAxMS4xNyAxMS4xNyAyLjgzLTIuODMtMTEuMTctMTEuMTd6Ii8+PHBhdGggZD0iTTAgMGg0OHY0OGgtNDh6IiBmaWxsPSJub25lIi8+PC9zdmc+",
        y = function(e) {
            for (var t = (new Date).getTime(), i = "uuid=" + n(), a = 0; a < e.length; a++) i += "&placement=" + e[a];
            i += "&referrer=" + encodeURIComponent(document.referrer ? document.referrer : ""), i += "&url=" + encodeURIComponent(document.location.href), i += "&cxt=" + encodeURIComponent(document.title), i += "&t=" + t;
            var r = "d3",
                o = t % 7;
            return 1 === o ? r = "d1" : 4 === o ? r = "d4" : 5 === o ? r = "d5" : 6 === o && (r = "d6"), "https://" + r + ".adsplay.net/delivery" + "?" + i
        },
        m = {};
    m.handleAdClick = function(e) {
        return i({
            url: f,
            vars: {
                metric: "click",
                adid: e,
                beacon: v[e]
            }
        }), !1
        var configAd = adsResponse.find(function(ad){ad.adId === e});
        if (configAd.clickAdTrackingUrls) {
          for (var count = 0; count < configAd.clickAdTrackingUrls.length; count++)
            i({
              url: configAd.clickAdTrackingUrls[count],
              vars: {},
              noParameter: !0
            });
        }
    };
    var f = "https://log.adsplay.net/track/ads",
        v = {};
    m.closeAdView = function(t) {
        return document.getElementById("adsplay-holder" + t).remove(!0), !!e.MastheadWebviewNative && (document.getElementsByTagName("body")[0].innerHTML = "", e.MastheadWebviewNative.closeAdView(), !1)
    }, m.getAds = function(e1, t) {
        e = e1.filter(function(e2){e2 !== 1012});
        r(y(e) + "&at=display", function(e) {
            e = '[{"width": 0, "height": 0, "tracking3rdUrls": [], "adMedia": "//st50.adsplay.net/ads/overlay/1544416720949/a28d62641275e31e78323f7d09fed51a.png,//st50.adsplay.net/ads/overlay/1544416775294/1b716fb72cc266136627d63f951570be.png", "clickthroughUrl": "http://bit.ly/2ORSCF3", "clickActionText": "", "adId": 2318, "adBeacon": "2pzizjzizi2pzhzgzizr2pzj2pzj", "adType": 6, "placementId": 1011, "adCode": ""} ]'
            adsResponse = JSON.parse(e);
            for (var i = JSON.parse(e), a = 0; a < i.length; a++) {
                var n = i[a],
                    r = n.placementId + "",
                    o = t[r];
                if (o) {
                    var d = o.pop();
                    d && s(n, d)
                }
            }
        })
    }, e.AdsPlayBanner = m;
    var b = {};
    b.doImpressionLog = function(e) {
        r(y(e) + "&at=overlay", function(e) {
            for (var t = JSON.parse(e), a = 0; a < t.length; a++) {
                var n = t[a];
                n.timeToShow;
                if (10 === n.adType) {
                    ! function(e) {
                        var t = e.tracking3rdUrls;
                        if ("object" == typeof t)
                            for (var a = 0; a < t.length; a++) {
                                var n = t[a];
                                if (n) {
                                    var r = 1e3 * n.delay,
                                        o = n.url;
                                    setTimeout(function(e) {
                                        i({
                                            url: e,
                                            vars: {}
                                        })
                                    }, r, o)
                                }
                            }
                    }(n)
                }
            }
        })
    }, e.AdsPlayTracker = b
}("undefined" == typeof window ? this : window), AdsPlayBannerReady(function() {
    for (var e = document.getElementsByClassName("adsplay-placement"), t = [], i = [], a = 0; a < e.length; a++)
        if (e[a]) {
            var n = e[a].getAttribute("id"),
                r = 0;
            if ("string" == typeof n ? (r = parseInt(n.replace("aplpm-", "")), t.push(r)) : "string" == typeof(n = e[a].getAttribute("data-aplpm")) && (r = parseInt(n), t.push(parseInt(n))), r > 0) {
                var o = r + "";
                "object" != typeof i[o] && (i[o] = []), i[o].push(e[a])
            }
        }
    AdsPlayBanner.getAds(t, i);
    var d = document.createElement("meta");
    d.setAttribute("name", "referrer"), d.setAttribute("content", "unsafe-url");
    var s = document.getElementsByTagName("head")[0];
    s && s.appendChild(d)
}));
