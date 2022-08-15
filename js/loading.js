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
