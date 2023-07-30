console.log('[RPageSearch] V2');
console.log('载入模块中...');

const fs = require('fs');
const cheerio = require('cheerio');
const pretty = require('pretty');

let fileStructure = [];
let fileList = [];
let objectStructure = {};
let objectStructureList = [];
let json;
console.log('[RPageSearch] LOADED');
console.log('获取文件树中...');

function fileRead(name) {
    data = fs.readFileSync(`../articles/${name}/index.html`);
    fileParse(data);
}

function HTMLEncode(str) {
    var s = '';
    if (str.length == 0) return '';
    s = str.replace(/&/g, '&amp;');
    s = s.replace(/</g, '&lt;');
    s = s.replace(/>/g, '&gt;');
    s = s.replace(/ /g, '&nbsp;');
    s = s.replace(/\'/g, '&#39;');
    s = s.replace(/\"/g, '&quot;');
    s = s.replace(/\n/g, '<br/>');
    return s;
}

function fileParse(file) {
    let cla = [];
    let tag = [];
    let title = [];
    let img = [];
    let links = [];
    let name, url, time, context;

    const $ = cheerio.load(file, {
        ignoreWhitespace: true,
    });
    name = $('#articles-header h2 a').text();
    url = $('#articles-header h2 a').attr('href');
    time = $('#articles-header .articles-info time').text();
    $('#articles-header .articles-info .class a').each(function (i, e) {
        cla.push($(e).text().toLowerCase());
    });

    $('#articles-header .articles-tags a').each(function (i, e) {
        tag.push($(e).text().toLowerCase());
    });

    context = HTMLEncode(
        $('#articles-body').text().replace(/\s+/g, '&nbsp;').replace(/\n|\r/g, ' '),
    );
    $(
        '#articles-body h2 , #articles-body h3 , articles-body h4 , articles-body h5 , articles-body h6',
    ).each(function (i, e) {
        title.push($(e).text().toLowerCase().replace(/\s+/g, '').replace(/\n|\r/g, ''));
    });
    $('#articles-body img').each(function (i, e) {
        if ($(e).attr('src').indexOf('http') == -1 && $(e).attr('src').indexOf('articles') == -1) {
            img.push($('#articles-header h2 a').attr('href') + $(e).attr('src'));
        } else {
            img.push($(e).attr('src'));
        }
    });
    $('#articles-body a').each(function (i, e) {
        if (typeof $(e).attr('href') !== 'undefined' && $(e).attr('href')[0] !== '#') {
            links.push($(e).attr('href'));
        }
    });
    fileStructure.push([name, url, time, cla, tag, title, context, img, links]);
    packer(name);
}

fs.readdir('../articles/', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('读取目录成功，共发现' + data.length + '个文件');
        fileList = [];
        data.forEach((e) => {
            if (/^\d+$/.test(e)) {
                fileList.push(e);
            }
        });
        fileList.sort((a, b) => b - a);
        fileList.forEach((e) => {
            fileRead(e);
        });
    }
});

function objectCreater(arr) {
    this.name = arr[0];
    this.url = arr[1];
    this.time = arr[2];
    this.class = arr[3];
    this.tag = arr[4];
    this.title = arr[5];
    this.context = arr[6];
    this.img = arr[7];
    this.links = arr[8];
}

function packer(e) {
    console.log(`文章'${e}'已完成索引`);
    if (fileList.length == fileStructure.length) {
        fileStructure.forEach((e, index) => {
            objectStructure = new objectCreater(e);
            objectStructureList.push(objectStructure);
        });
        fs.writeFile('../assets/data/search.json', JSON.stringify(objectStructureList), (err) => {
            if (err) throw err;
            console.log('生成&写入成功');
        });
    }
}
