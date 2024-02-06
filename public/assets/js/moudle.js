//
// virgule.js
//
// github.com/ravelloh/virgule.js
//
randArrMin = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
];
randArr = [
    'あ',
    'ぃ',
    'い',
    'ぅ',
    'う',
    'ぇ',
    'え',
    'ぉ',
    'お',
    'か',
    'が',
    'き',
    'ぎ',
    'く',
    'ぐ',
    'け',
    'げ',
    'こ',
    'ご',
    'さ',
    'ざ',
    'し',
    'じ',
    'す',
    'ず',
    'せ',
    'ぜ',
    'そ',
    'ぞ',
    'た',
    'だ',
    'ち',
    'ぢ',
    'っ',
    'つ',
    'づ',
    'て',
    'で',
    'と',
    'ど',
    'な',
    'に',
    'ぬ',
    'ね',
    'の',
    'は',
    'ば',
    'ぱ',
    'ひ',
    'び',
    'ぴ',
    'ふ',
    'ぶ',
    'ぷ',
    'へ',
    'べ',
    'ぺ',
    'ほ',
    'ぼ',
    'ぽ',
    'ま',
    'み',
    'む',
    'め',
    'も',
    'ゃ',
    'や',
    'ゅ',
    'ゆ',
    'ょ',
    'よ',
    'ら',
    'り',
    'る',
    'れ',
    'ろ',
    'ゎ',
    'わ',
    'ゐ',
    'ゑ',
    'を',
    'ん',
    'ゔ',
    'ゕ',
    'ゖ',
    'ァ',
    'ア',
    'ィ',
    'イ',
    'ゥ',
    'ウ',
    'ェ',
    'エ',
    'ォ',
    'オ',
    'カ',
    'ガ',
    'キ',
    'ギ',
    'ク',
    'グ',
    'ケ',
    'ゲ',
    'コ',
    'ゴ',
    'サ',
    'ザ',
    'シ',
    'ジ',
    'ス',
    'ズ',
    'セ',
    'ゼ',
    'ソ',
    'ゾ',
    'タ',
    'ダ',
    'チ',
    'ヂ',
    'ッ',
    'ツ',
    'ヅ',
    'テ',
    'デ',
    'ト',
    'ド',
    'ナ',
    'ニ',
    'ヌ',
    'ネ',
    'ノ',
    'ハ',
    'バ',
    'パ',
    'ヒ',
    'ビ',
    'ピ',
    'フ',
    'ブ',
    'プ',
    'ヘ',
    'ベ',
    'ペ',
    'ホ',
    'ボ',
    'ポ',
    'マ',
    'ミ',
    'ム',
    'メ',
    'モ',
    'ャ',
    'ヤ',
    'ュ',
    'ユ',
    'ョ',
    'ヨ',
    'ラ',
    'リ',
    'ル',
    'レ',
    'ロ',
    'ヮ',
    'ワ',
    'ヰ',
    'ヱ',
    'ヲ',
    'ン',
    'ヴ',
    'ヵ',
    'ヶ',
    'ヷ',
    'ヸ',
    'ヹ',
    'ヺ',
    'ー',
    'ヾ',
    'ㄅ',
    'ㄆ',
    'ㄇ',
    'ㄈ',
    'ㄉ',
    'ㄊ',
    'ㄋ',
    'ㄌ',
    'ㄍ',
    'ㄎ',
    'ㄏ',
    'ㄐ',
    'ㄑ',
    'ㄒ',
    'ㄓ',
    'ㄔ',
    'ㄕ',
    'ㄖ',
    'ㄗ',
    'ㄘ',
    'ㄙ',
    'ㄝ',
    'ㄞ',
    'ㄟ',
    'ㄠ',
    'ㄡ',
    'ㄢ',
    'ㄣ',
    'ㄤ',
    'ㄥ',
    'ㄦ',
    'ㄧ',
    'ㄨ',
    'ㄩ',
    '〇',
    '口',
    '甲',
    '乙',
    '丙',
    '丁',
    '戊',
    '己',
    '庚',
    '辛',
    '壬',
    '癸',
];

function virgule(target, context, speed = 100) {
    //context重组
    contextArr = [];
    for (var i = 0; i < context.length; i++) {
        contextArr.push(context[i]);
    }
    // 添加/
    target.innerHTML = '/';
    numVirgule = 0;
    var virgulegenerate = setInterval(function () {
        // 字符划分
        if (escape(contextArr[numVirgule]).indexOf('%u') < 0) {
            if (contextArr[numVirgule] == ' ') {
                target.innerHTML += ' ';
            } else {
                target.innerHTML += '/';
            }
        } else {
            target.innerHTML += '//';
        }
        numVirgule += 1;
        if (numVirgule > context.length) {
            clearInterval(virgulegenerate);
            target.innerHTML = target.innerHTML.slice(0, target.innerHTML.length - 1);
            setTimeout(function () {
                textIn();
            }, 100);
        }
    }, 1000 / speed);
    // 文字进入
    numIn = 0;
    numCharacter = 0;

    function textIn() {
        originText = target.innerHTML;
        var virgulereplace = setInterval(function () {
            numIn += 1;
            if (numIn >= contextArr.length) {
                clearInterval(virgulereplace);
                textwrite();
            }
            cacheText = '';
            numCharacter = 0;
            for (i = 0; i < numIn; i++) {
                if (escape(contextArr[i]).indexOf('%u') < 0) {
                    if (contextArr[i] == ' ') {
                        cacheText += ' ';
                        numCharacter += 1;
                    } else {
                        //单字符
                        var rand = Math.floor(Math.random() * randArrMin.length);
                        cacheText += randArrMin[rand];
                        numCharacter += 1;
                    }
                } else {
                    // 双字符
                    var rand = Math.floor(Math.random() * randArr.length);
                    cacheText += randArr[rand];
                    numCharacter += 2;
                }
            }
            target.innerHTML = cacheText + originText.slice(numCharacter, originText.length);
        }, 2000 / speed);
        // 原始文字写入
        numWrite = 0;

        function textwrite() {
            originText = target.innerHTML;
            var virgulewrite = setInterval(function () {
                numWrite += 1;
                if (numWrite >= contextArr.length) {
                    clearInterval(virgulewrite);
                }
                cacheText = '';
                numCharacter = 0;
                for (i = 0; i < numIn; i++) {
                    if (escape(contextArr[i]).indexOf('%u') < 0) {
                        if (contextArr[i] == ' ') {
                            cacheText += ' ';
                            numCharacter += 1;
                        } else {
                            //单字符
                            var rand = Math.floor(Math.random() * randArrMin.length);
                            cacheText += randArrMin[rand];
                            numCharacter += 1;
                        }
                    } else {
                        // 双字符
                        var rand = Math.floor(Math.random() * randArr.length);
                        cacheText += randArr[rand];
                        numCharacter += 2;
                    }
                }
                target.innerHTML =
                    context.slice(0, numWrite) +
                    cacheText.slice(numWrite, cacheText.length) +
                    originText.slice(numCharacter, originText.length - 1);
            }, 2000 / speed);
        }
    }
}
function instantPageLoad() {
    if (docCookies.getItem('settingEnableInstantPage') == 'false') {
        return false;
    }
    /*! instant.page v5.2.0 - (C) 2019-2023 Alexandre Dieulot - https://instant.page/license */
    let t,
        e,
        n,
        o,
        i,
        a = null,
        s = 65,
        c = new Set();
    const r = 1111;
    function d(t) {
        o = performance.now();
        const e = t.target.closest('a');
        m(e) && p(e.href, 'high');
    }
    function u(t) {
        if (performance.now() - o < r) return;
        if (!('closest' in t.target)) return;
        const e = t.target.closest('a');
        m(e) &&
            (e.addEventListener('mouseout', f, {
                passive: !0,
            }),
            (i = setTimeout(() => {
                p(e.href, 'high'), (i = void 0);
            }, s)));
    }
    function l(t) {
        const e = t.target.closest('a');
        m(e) && p(e.href, 'high');
    }
    function f(t) {
        (t.relatedTarget && t.target.closest('a') == t.relatedTarget.closest('a')) ||
            (i && (clearTimeout(i), (i = void 0)));
    }
    function h(t) {
        if (performance.now() - o < r) return;
        const e = t.target.closest('a');
        if (t.which > 1 || t.metaKey || t.ctrlKey) return;
        if (!e) return;
        e.addEventListener(
            'click',
            function (t) {
                1337 != t.detail && t.preventDefault();
            },
            {
                capture: !0,
                passive: !1,
                once: !0,
            },
        );
        const n = new MouseEvent('click', {
            view: window,
            bubbles: !0,
            cancelable: !1,
            detail: 1337,
        });
        e.dispatchEvent(n);
    }
    function m(o) {
        if (o && o.href && (!n || 'instant' in o.dataset)) {
            if (o.origin != location.origin) {
                if (!(e || 'instant' in o.dataset) || !a) return;
            }
            if (
                ['http:', 'https:'].includes(o.protocol) &&
                ('http:' != o.protocol || 'https:' != location.protocol) &&
                (t || !o.search || 'instant' in o.dataset) &&
                !(
                    (o.hash && o.pathname + o.search == location.pathname + location.search) ||
                    'noInstant' in o.dataset
                )
            )
                return !0;
        }
    }
    function p(t, e = 'auto') {
        if (c.has(t)) return;
        const n = document.createElement('link');
        (n.rel = 'prefetch'),
            (n.href = t),
            (n.fetchPriority = e),
            (n.as = 'document'),
            document.head.appendChild(n),
            c.add(t);
    }
    !(function () {
        if (!document.createElement('link').relList.supports('prefetch')) return;
        const o = 'instantVaryAccept' in document.body.dataset || 'Shopify' in window,
            i = navigator.userAgent.indexOf('Chrome/');
        i > -1 && (a = parseInt(navigator.userAgent.substring(i + 'Chrome/'.length)));
        if (o && a && a < 110) return;
        const c = 'instantMousedownShortcut' in document.body.dataset;
        (t = 'instantAllowQueryString' in document.body.dataset),
            (e = 'instantAllowExternalLinks' in document.body.dataset),
            (n = 'instantWhitelist' in document.body.dataset);
        const r = {
            capture: !0,
            passive: !0,
        };
        let f = !1,
            v = !1,
            g = !1;
        if ('instantIntensity' in document.body.dataset) {
            const t = document.body.dataset.instantIntensity;
            if (t.startsWith('mousedown')) (f = !0), 'mousedown-only' == t && (v = !0);
            else if (t.startsWith('viewport')) {
                const e = navigator.connection && navigator.connection.saveData,
                    n =
                        navigator.connection &&
                        navigator.connection.effectiveType &&
                        navigator.connection.effectiveType.includes('2g');
                e ||
                    n ||
                    ('viewport' == t
                        ? document.documentElement.clientWidth *
                              document.documentElement.clientHeight <
                              45e4 && (g = !0)
                        : 'viewport-all' == t && (g = !0));
            } else {
                const e = parseInt(t);
                isNaN(e) || (s = e);
            }
        }
        v || document.addEventListener('touchstart', d, r);
        f
            ? c || document.addEventListener('mousedown', l, r)
            : document.addEventListener('mouseover', u, r);
        c && document.addEventListener('mousedown', h, r);
        if (g) {
            let t = window.requestIdleCallback;
            t ||
                (t = (t) => {
                    t();
                }),
                t(
                    function () {
                        const t = new IntersectionObserver((e) => {
                            e.forEach((e) => {
                                if (e.isIntersecting) {
                                    const n = e.target;
                                    t.unobserve(n), p(n.href);
                                }
                            });
                        });
                        document.querySelectorAll('a').forEach((e) => {
                            m(e) && t.observe(e);
                        });
                    },
                    {
                        timeout: 1500,
                    },
                );
        }
    })();
}

// Base模块依赖
!function(t,n){var r,e;"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(r=t.Base64,(e=n()).noConflict=function(){return t.Base64=r,e},t.Meteor&&(Base64=e),t.Base64=e)}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this,(function(){"use strict";var t,n="3.7.5",r="function"==typeof atob,e="function"==typeof btoa,o="function"==typeof Buffer,u="function"==typeof TextDecoder?new TextDecoder:void 0,i="function"==typeof TextEncoder?new TextEncoder:void 0,f=Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),c=(t={},f.forEach((function(n,r){return t[n]=r})),t),a=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,d=String.fromCharCode.bind(String),s="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):function(t){return new Uint8Array(Array.prototype.slice.call(t,0))},l=function(t){return t.replace(/=/g,"").replace(/[+\/]/g,(function(t){return"+"==t?"-":"_"}))},h=function(t){return t.replace(/[^A-Za-z0-9\+\/]/g,"")},p=function(t){for(var n,r,e,o,u="",i=t.length%3,c=0;c<t.length;){if((r=t.charCodeAt(c++))>255||(e=t.charCodeAt(c++))>255||(o=t.charCodeAt(c++))>255)throw new TypeError("invalid character found");u+=f[(n=r<<16|e<<8|o)>>18&63]+f[n>>12&63]+f[n>>6&63]+f[63&n]}return i?u.slice(0,i-3)+"===".substring(i):u},y=e?function(t){return btoa(t)}:o?function(t){return Buffer.from(t,"binary").toString("base64")}:p,A=o?function(t){return Buffer.from(t).toString("base64")}:function(t){for(var n=[],r=0,e=t.length;r<e;r+=4096)n.push(d.apply(null,t.subarray(r,r+4096)));return y(n.join(""))},b=function(t,n){return void 0===n&&(n=!1),n?l(A(t)):A(t)},g=function(t){if(t.length<2)return(n=t.charCodeAt(0))<128?t:n<2048?d(192|n>>>6)+d(128|63&n):d(224|n>>>12&15)+d(128|n>>>6&63)+d(128|63&n);var n=65536+1024*(t.charCodeAt(0)-55296)+(t.charCodeAt(1)-56320);return d(240|n>>>18&7)+d(128|n>>>12&63)+d(128|n>>>6&63)+d(128|63&n)},B=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,x=function(t){return t.replace(B,g)},C=o?function(t){return Buffer.from(t,"utf8").toString("base64")}:i?function(t){return A(i.encode(t))}:function(t){return y(x(t))},m=function(t,n){return void 0===n&&(n=!1),n?l(C(t)):C(t)},v=function(t){return m(t,!0)},U=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,F=function(t){switch(t.length){case 4:var n=((7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3))-65536;return d(55296+(n>>>10))+d(56320+(1023&n));case 3:return d((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return d((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},w=function(t){return t.replace(U,F)},S=function(t){if(t=t.replace(/\s+/g,""),!a.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(3&t.length));for(var n,r,e,o="",u=0;u<t.length;)n=c[t.charAt(u++)]<<18|c[t.charAt(u++)]<<12|(r=c[t.charAt(u++)])<<6|(e=c[t.charAt(u++)]),o+=64===r?d(n>>16&255):64===e?d(n>>16&255,n>>8&255):d(n>>16&255,n>>8&255,255&n);return o},E=r?function(t){return atob(h(t))}:o?function(t){return Buffer.from(t,"base64").toString("binary")}:S,D=o?function(t){return s(Buffer.from(t,"base64"))}:function(t){return s(E(t).split("").map((function(t){return t.charCodeAt(0)})))},R=function(t){return D(T(t))},z=o?function(t){return Buffer.from(t,"base64").toString("utf8")}:u?function(t){return u.decode(D(t))}:function(t){return w(E(t))},T=function(t){return h(t.replace(/[-_]/g,(function(t){return"-"==t?"+":"/"})))},Z=function(t){return z(T(t))},j=function(t){return{value:t,enumerable:!1,writable:!0,configurable:!0}},I=function(){var t=function(t,n){return Object.defineProperty(String.prototype,t,j(n))};t("fromBase64",(function(){return Z(this)})),t("toBase64",(function(t){return m(this,t)})),t("toBase64URI",(function(){return m(this,!0)})),t("toBase64URL",(function(){return m(this,!0)})),t("toUint8Array",(function(){return R(this)}))},O=function(){var t=function(t,n){return Object.defineProperty(Uint8Array.prototype,t,j(n))};t("toBase64",(function(t){return b(this,t)})),t("toBase64URI",(function(){return b(this,!0)})),t("toBase64URL",(function(){return b(this,!0)}))},P={version:n,VERSION:"3.7.5",atob:E,atobPolyfill:S,btoa:y,btoaPolyfill:p,fromBase64:Z,toBase64:m,encode:m,encodeURI:v,encodeURL:v,utob:x,btou:w,decode:Z,isValid:function(t){if("string"!=typeof t)return!1;var n=t.replace(/\s+/g,"").replace(/={0,2}$/,"");return!/[^\s0-9a-zA-Z\+/]/.test(n)||!/[^\s0-9a-zA-Z\-_]/.test(n)},fromUint8Array:b,toUint8Array:R,extendString:I,extendUint8Array:O,extendBuiltins:function(){I(),O()},Base64:{}};return Object.keys(P).forEach((function(t){return P.Base64[t]=P[t]})),P}));
//# sourceMappingURL=/sm/555281732ed54ee1693a772f485329378d8ea5052ffa4370e9c2e9947eb42d22.map