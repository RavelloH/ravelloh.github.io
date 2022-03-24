const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
})

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
