// 菜单
const menuToggle = document.querySelector(".toggle");
const showcase = document.querySelector(".showcase");
const shade = document.querySelector(".shade");
var menuopen = 'close'

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
  shade.classList.toggle("active");
  if (menuopen == 'close') {
    menuopen = 'open'
  } else {
    menuopen = 'close'
  }
});

// 点击.shade时，关闭.showcase
shade.onclick = function () {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
  shade.classList.toggle("active");
  if (menuopen == 'close') {
    menuopen = 'open'
  } else {
    menuopen = 'close'
  }
};

// Copyright时间更新
Date.prototype.format = function (fmt) {
  var o = {};
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  return fmt;
};
var now = new Date();
var nowStr = now.format("yyyy");
document.getElementById("year").innerHTML = new Date().format("yyyy");

// 添加一个安慰作用的加载进度条
function showprog(){           
const social = document.querySelector(".social");
social.innerHTML='<li><div class="progress-container"><div class="progress"></div></div></li>'
const progressbar = document.querySelector(".progress");
const profather = document.querySelector(".progress-container");
const changeProgress = (progress) => {
  progressbar.style.width = `${progress}%`;
};
setTimeout(() => profather.id='actives',50);
setTimeout(() => changeProgress(22), 400);
setTimeout(() => changeProgress(45), 500);
setTimeout(() => changeProgress(90), 700);
setTimeout(() => changeProgress(100), 1400);
setTimeout(() => profather.id='pro-null',1600)
}

// 页面退出时，id更改为active
window.onbeforeunload = function () {
  if (menuopen == 'open'){
    menuToggle.classList.toggle("active");
    showcase.classList.toggle("active");
    shade.classList.toggle("active");
  showprog()
  while (document.getElementById('text') !== null){document.getElementById("text").id = "active";}
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    spans[i].id = "active";
  }
  }
};

// listprogramload动画
// 倒序排列--i：排序后的序号
for (
  let j = document.getElementsByClassName("listprogram").length;
  j > 0;
  j--
) {
  document
    .getElementsByClassName("listprogram")
    [j - 1].setAttribute("style", "--i: " + j);
}

// listprogram => listprogramload
function onload() {
  for (
    let i = 0;
    i < document.getElementsByClassName("listprogram").length;
    i++
  ) {
    document
      .getElementsByClassName("listprogram")
      [i].classList.add("listprogramonload");
  }
}

// 当点击图片时，创建一个铺满整个屏幕的div，并将图片放入
function consoleImgSrc() {
  var img = document.getElementsByTagName("img");
  for (var i = 0; i < img.length; i++) {
    img[i].onclick = function () {
      var div = document.createElement("div");
      var img = document.createElement("img");
      img.className = "img-fullscreen-out";
      img.src = this.src;
      document.body.appendChild(div);
      document.body.appendChild(img);
      setTimeout(function () {
        img.className = "img-fullscreen";
        div.className = "img-show";
      }, 200);

      img.onclick = function () {
        img.className = "img-fullscreen-out";
        div.className = "img-show-out";
        setTimeout(function () {
          document.body.removeChild(div);
          document.body.removeChild(img);
        }, 500);
      };
      div.onclick = function () {
        img.className = "img-fullscreen-out";
        div.className = "img-show-out";
        setTimeout(function () {
          document.body.removeChild(div);
          document.body.removeChild(img);
        }, 500);
      };
    };
  }
}
consoleImgSrc();

var CURSOR;
Math.lerp = (a, b, n) => (1 - n) * a + n * b;
const getStyle = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) {}
  return "";
};
class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }

    var el = document.getElementsByTagName("*");
    for (let i = 0; i < el.length; i++)
      if (getStyle(el[i], "cursor") == "pointer") this.pt.push(el[i].outerHTML);

    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' fill='white' opacity='.5'/></svg>") 4 4, auto}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmouseover = (e) =>
      this.pt.includes(e.target.outerHTML) &&
      this.cursor.classList.add("hover");
    document.onmouseout = (e) =>
      this.pt.includes(e.target.outerHTML) &&
      this.cursor.classList.remove("hover");
    document.onmousemove = (e) => {
      this.pos.curr == null && this.move(e.clientX - 8, e.clientY - 8);
      this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 };
      this.cursor.classList.remove("hidden");
    };
    document.onmouseenter = (e) => this.cursor.classList.remove("hidden");
    document.onmouseleave = (e) => this.cursor.classList.add("hidden");
    document.onmousedown = (e) => this.cursor.classList.add("active");
    document.onmouseup = (e) => this.cursor.classList.remove("active");
  }

  render() {
    if (this.pos.prev) {
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

(() => {
  CURSOR = new Cursor();
})();

randArrMin = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
];
randArr = [
    "あ",
    "ぃ",
    "い",
    "ぅ",
    "う",
    "ぇ",
    "え",
    "ぉ",
    "お",
    "か",
    "が",
    "き",
    "ぎ",
    "く",
    "ぐ",
    "け",
    "げ",
    "こ",
    "ご",
    "さ",
    "ざ",
    "し",
    "じ",
    "す",
    "ず",
    "せ",
    "ぜ",
    "そ",
    "ぞ",
    "た",
    "だ",
    "ち",
    "ぢ",
    "っ",
    "つ",
    "づ",
    "て",
    "で",
    "と",
    "ど",
    "な",
    "に",
    "ぬ",
    "ね",
    "の",
    "は",
    "ば",
    "ぱ",
    "ひ",
    "び",
    "ぴ",
    "ふ",
    "ぶ",
    "ぷ",
    "へ",
    "べ",
    "ぺ",
    "ほ",
    "ぼ",
    "ぽ",
    "ま",
    "み",
    "む",
    "め",
    "も",
    "ゃ",
    "や",
    "ゅ",
    "ゆ",
    "ょ",
    "よ",
    "ら",
    "り",
    "る",
    "れ",
    "ろ",
    "ゎ",
    "わ",
    "ゐ",
    "ゑ",
    "を",
    "ん",
    "ゔ",
    "ゕ",
    "ゖ",
    "ァ",
    "ア",
    "ィ",
    "イ",
    "ゥ",
    "ウ",
    "ェ",
    "エ",
    "ォ",
    "オ",
    "カ",
    "ガ",
    "キ",
    "ギ",
    "ク",
    "グ",
    "ケ",
    "ゲ",
    "コ",
    "ゴ",
    "サ",
    "ザ",
    "シ",
    "ジ",
    "ス",
    "ズ",
    "セ",
    "ゼ",
    "ソ",
    "ゾ",
    "タ",
    "ダ",
    "チ",
    "ヂ",
    "ッ",
    "ツ",
    "ヅ",
    "テ",
    "デ",
    "ト",
    "ド",
    "ナ",
    "ニ",
    "ヌ",
    "ネ",
    "ノ",
    "ハ",
    "バ",
    "パ",
    "ヒ",
    "ビ",
    "ピ",
    "フ",
    "ブ",
    "プ",
    "ヘ",
    "ベ",
    "ペ",
    "ホ",
    "ボ",
    "ポ",
    "マ",
    "ミ",
    "ム",
    "メ",
    "モ",
    "ャ",
    "ヤ",
    "ュ",
    "ユ",
    "ョ",
    "ヨ",
    "ラ",
    "リ",
    "ル",
    "レ",
    "ロ",
    "ヮ",
    "ワ",
    "ヰ",
    "ヱ",
    "ヲ",
    "ン",
    "ヴ",
    "ヵ",
    "ヶ",
    "ヷ",
    "ヸ",
    "ヹ",
    "ヺ",
    "ー",
    "ヾ",
    "ㄅ",
    "ㄆ",
    "ㄇ",
    "ㄈ",
    "ㄉ",
    "ㄊ",
    "ㄋ",
    "ㄌ",
    "ㄍ",
    "ㄎ",
    "ㄏ",
    "ㄐ",
    "ㄑ",
    "ㄒ",
    "ㄓ",
    "ㄔ",
    "ㄕ",
    "ㄖ",
    "ㄗ",
    "ㄘ",
    "ㄙ",
    "ㄝ",
    "ㄞ",
    "ㄟ",
    "ㄠ",
    "ㄡ",
    "ㄢ",
    "ㄣ",
    "ㄤ",
    "ㄥ",
    "ㄦ",
    "ㄧ",
    "ㄨ",
    "ㄩ",
    "〇",
    "口",
    "甲",
    "乙",
    "丙",
    "丁",
    "戊",
    "己",
    "庚",
    "辛",
    "壬",
    "癸",
];
function virgule(target, context, speed = 100) {
    //context重组
    contextArr = [];
    for (var i = 0; i < context.length; i++) {
        contextArr.push(context[i])
    }
    // 添加/
    target.innerHTML = "/";
    numVirgule = 0
    var virgulegenerate = setInterval(
        function() {
            // 字符划分
            if (escape(contextArr[numVirgule]).indexOf("%u") < 0) {
                if (contextArr[numVirgule] == ' ') {
                    target.innerHTML += ' '
                } else {
                    target.innerHTML += '/'
                }
            } else {
                target.innerHTML += '//'
            }
            numVirgule += 1
            if (numVirgule > context.length) {
                clearInterval(virgulegenerate);
                target.innerHTML = target.innerHTML.slice(0, target.innerHTML.length-1)
                setTimeout(function() {
                    textIn()}, 100)
            }
        },
        1000/speed)

    // 文字进入
    numIn = 0;
    numCharacter = 0;
    function textIn() {
        originText = target.innerHTML;
        var virgulereplace = setInterval(
            function() {
                numIn += 1
                if (numIn >= contextArr.length) {
                    clearInterval(virgulereplace)
                    textwrite()
                }
                cacheText = ''
                numCharacter = 0
                for (i = 0; i < numIn; i++) {
                    if (escape(contextArr[i]).indexOf("%u") < 0) {
                        if (contextArr[i] == ' ') {
                            cacheText += ' '
                            numCharacter += 1
                        } else {
                            //单字符
                            var rand = Math.floor(Math.random() * randArrMin.length);
                            cacheText += randArrMin[rand]
                            numCharacter += 1
                        }
                    } else {
                        // 双字符
                        var rand = Math.floor(Math.random() * randArr.length);
                        cacheText += randArr[rand]
                        numCharacter += 2
                    }
                }
                target.innerHTML = cacheText + originText.slice(numCharacter, originText.length)
            },
            2000/speed)

        // 原始文字写入
        numWrite = 0
        function textwrite() {
            originText = target.innerHTML;
            var virgulewrite = setInterval(
                function() {
                    numWrite += 1
                    if (numWrite >= contextArr.length) {
                        clearInterval(virgulewrite)
                    }
                    cacheText = ''
                    numCharacter = 0
                    for (i = 0; i < numIn; i++) {
                        if (escape(contextArr[i]).indexOf("%u") < 0) {
                            if (contextArr[i] == ' ') {
                                cacheText += ' '
                                numCharacter += 1
                            } else {
                                //单字符
                                var rand = Math.floor(Math.random() * randArrMin.length);
                                cacheText += randArrMin[rand]
                                numCharacter += 1
                            }
                        } else {
                            // 双字符
                            var rand = Math.floor(Math.random() * randArr.length);
                            cacheText += randArr[rand]
                            numCharacter += 2
                        }
                    }
                    target.innerHTML = context.slice(0, numWrite) + cacheText.slice(numWrite, cacheText.length) + originText.slice(numCharacter, originText.length-1)
                },
                2000/speed)

        }

    }
}
