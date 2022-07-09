// 菜单
const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
})

// Copyright时间更新
Date.prototype.format = function (fmt) {
    var o = {};
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    return fmt;
}
var now = new Date();
var nowStr = now.format("yyyy");
document.getElementById("year").innerHTML = new Date().format("yyyy");


// 页面退出时，id更改为active
window.onbeforeunload = function () {
    for(var j = 0;j < 5;j ++){
        document.getElementById("text").id = "active";}
    var spans = document.getElementsByTagName('span');
    for(var i = 0;i < spans.length;i ++){ 
       (spans[i]).id = "active";} 
}

// listprogramload动画
// 倒序排列--i：排序后的序号
for (let j = document.getElementsByClassName("listprogram").length; j > 0; j--) {
    document.getElementsByClassName("listprogram")[j - 1].setAttribute("style", "--i: " + j);
}

// listprogram => listprogramload
function onload() {
    for (let i = 0; i < document.getElementsByClassName("listprogram").length; i++) {
        document.getElementsByClassName("listprogram")[i].classList.add("listprogramonload");
    }
}

// tcomment
twikoo.init({
    envId: 'https://comment-ravelloh.vercel.app/', 
    el: '#tcomment', // 填入要评论的元素的 id
})