// 菜单
const menuToggle = document.querySelector(".toggle");
const showcase = document.querySelector(".showcase");
const shade = document.querySelector(".shade");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
  shade.classList.toggle("active");
});

// 点击.shade时，关闭.showcase
shade.onclick = function () {
  menuToggle.classList.toggle("active");
  showcase.classList.toggle("active");
  shade.classList.toggle("active");
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

// 页面退出时，id更改为active
window.onbeforeunload = function () {
  for (var j = 0; j < 5; j++) {
    document.getElementById("text").id = "active";
  }
  var spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    spans[i].id = "active";
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

// 提取#jumping的innerHTML
var jumping = document.getElementById("jumping");
// 将jumping的innerHTML赋值给jumping-html
var jumpinghtml = jumping.innerHTML;
// 获取jumping的innerHTML的长度
var jumpinglength = jumpinghtml.length;
// 创建一个数组，用来存放jumping的innerHTML的每一个字符
var jumpingarr = [];
// 将jumping的innerHTML的每一个字符存放到数组中
for (var i = 0; i < jumpinglength; i++) {
  jumpingarr.push(jumpinghtml[i]);
}
// 将jumping替换为空
jumping.innerHTML = "&nbsp;";
// 递归添加'/'
function jumpingarr_recursion(i) {
  if (i < jumpinglength) {
    setTimeout(function () {
      jumping.innerHTML += "/";
      jumpingarr_recursion(i + 1);
    }, 10);
  }
}
// 存储现在的jumping的innerHTML到jumpingarrs中
var jumpingarrs = [];
for (var i = 0; i < jumpinglength; i++) {
  jumpingarrs.push("/");
}
randarr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
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
  "9",
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

intcount = 0;

function changestr() {
  var intforjumping = setInterval(function () {
    intcount++;
    var randstr = "";
    if (intcount > jumpinglength) {
      clearInterval(intforjumping);
    }
    jumpingarrs.pop();

    for (j = 0; j < intcount; j++) {
      jumpingarrsstr = jumpingarrs[j];
      var rand = Math.floor(Math.random() * randarr.length);
      randstr = randstr + randarr[rand] + "";
    }
    jumping.innerHTML = randstr + jumpingarrs.join("");
  }, 10);
}

var resumecount = 0;
function resume() {
  var intresume = setInterval(function () {
    resumecount++;
    if (resumecount > jumpinglength) {
      clearInterval(intresume);
    }
    jumpingnow = jumping.innerHTML;
    jumping.innerHTML =
      jumpingarr.join("").substring(0, resumecount) +
      jumpingnow.substring(resumecount, jumpinglength);
  }, 15);
}

// 初始化
function showhello() {
  setTimeout(function () {
    jumpingarr_recursion(0);
    setTimeout(function () {
      changestr();
      setTimeout(function () {
        resume();
        importnewjumping();
      }, 10 * jumpinglength);
    }, 12 * jumpinglength);
  }, 1000);
}
showhello();

function resetjumping() {
  jumping = document.getElementById("jumping");
  jumpinghtml = jumping.innerHTML;
  jumpinglength = jumpinghtml.length;
  jumpingarr = [];
  for (var i = 0; i < jumpinglength; i++) {
    jumpingarr.push(jumpinghtml[i]);
  }
  jumping.innerHTML = "&nbsp;";
  function jumpingarr_recursion(i) {
    if (i < jumpinglength) {
      setTimeout(function () {
        jumping.innerHTML += "/";
        jumpingarr_recursion(i + 1);
      }, 5);
    }
  }
  var jumpingarrs = [];
  for (var i = 0; i < jumpinglength; i++) {
    jumpingarrs.push("/");
  }
}

function importnewjumping() {
  setTimeout(function () {
    document.getElementById("jumping").innerHTML = "## 欢迎来到RavelloH的博客 随便看看 >>";
    jumping = document.getElementById("jumping");
    jumpinghtml = jumping.innerHTML;
    jumpinglength = jumpinghtml.length;
    jumpingarr = [];
    for (var i = 0; i < jumpinglength; i++) {
      jumpingarr.push(jumpinghtml[i]);
    }
    jumping.innerHTML = "&nbsp;";
    function jumpingarr_recursion(i) {
      if (i < jumpinglength) {
        setTimeout(function () {
          jumping.innerHTML += "/";
          jumpingarr_recursion(i + 1);
        }, 10);
      }
    }
    var jumpingarrs = [];
    for (var i = 0; i < jumpinglength; i++) {
      jumpingarrs.push("/");
    }

    intcount = 0;

    function changestr() {
      var intforjumping = setInterval(function () {
        intcount++;
        var randstr = "";
        if (intcount > jumpinglength) {
          clearInterval(intforjumping);
        }
        jumpingarrs.pop();

        for (j = 0; j < intcount; j++) {
          jumpingarrsstr = jumpingarrs[j];
          var rand = Math.floor(Math.random() * randarr.length);
          randstr = randstr + randarr[rand] + "";
        }
        jumping.innerHTML = randstr + jumpingarrs.join("");
      }, 20);
    }

    var resumecount = 0;
    function resume() {
      var intresume = setInterval(function () {
        resumecount++;
        if (resumecount > jumpinglength) {
          clearInterval(intresume);
        }
        jumpingnow = jumping.innerHTML;
        jumping.innerHTML =
          jumpingarr.join("").substring(0, resumecount) +
          jumpingnow.substring(resumecount, jumpinglength);
      }, 20);
    }
    // 存储现在的jumping的innerHTML到jumpingarrs中
    var jumpingarrs = [];
    for (var i = 0; i < jumpinglength; i++) {
      jumpingarrs.push("/");
    }
    setTimeout(function () {
      jumpingarr_recursion(0);
      setTimeout(function () {
        changestr();
        setTimeout(function () {
          resume();
          importoriginjumping();
        }, 20 * jumpinglength);
      }, 6 * jumpinglength);
    });
  }, 6000);
}

function importoriginjumping() {
  setTimeout(function () {
      document.getElementById("jumping").innerHTML = "## Welcome here and fell free to check it out...";
      jumping = document.getElementById("jumping");
      jumpinghtml = jumping.innerHTML;
      jumpinglength = jumpinghtml.length;
      jumpingarr = [];
      for (var i = 0; i < jumpinglength; i++) {
          jumpingarr.push(jumpinghtml[i]);
      }
      jumping.innerHTML = "&nbsp;";
      function jumpingarr_recursion(i) {
          if (i < jumpinglength) {
              setTimeout(function () {
                  jumping.innerHTML += "/";
                  jumpingarr_recursion(i + 1);
              }, 10);
          }
      }
      var jumpingarrs = [];
      for (var i = 0; i < jumpinglength; i++) {
          jumpingarrs.push("/");
      }

      intcount = 0;

      function changestr() {
          var intforjumping = setInterval(function () {
              intcount++;
              var randstr = "";
              if (intcount > jumpinglength) {
                  clearInterval(intforjumping);
              }
              jumpingarrs.pop();

              for (j = 0; j < intcount; j++) {
                  jumpingarrsstr = jumpingarrs[j];
                  var rand = Math.floor(Math.random() * randarr.length);
                  randstr = randstr + randarr[rand] + "";
              }
              jumping.innerHTML = randstr + jumpingarrs.join("");
          }, 10);
      }

      var resumecount = 0;
      function resume() {
          var intresume = setInterval(function () {
              resumecount++;
              if (resumecount > jumpinglength) {
                  clearInterval(intresume);
              }
              jumpingnow = jumping.innerHTML;
              jumping.innerHTML =
                  jumpingarr.join("").substring(0, resumecount) +
                  jumpingnow.substring(resumecount, jumpinglength);
          }, 20);
      }
      // 存储现在的jumping的innerHTML到jumpingarrs中
      var jumpingarrs = [];
      for (var i = 0; i < jumpinglength; i++) {
          jumpingarrs.push("/");
      }
      setTimeout(function () {
          jumpingarr_recursion(0);
          setTimeout(function () {
              changestr();
              setTimeout(function () {
                  resume();
                  importnewjumping()
              }, 6 * jumpinglength);
          }, 12 * jumpinglength);
      });
  }, 6000);
}