const Feed = require('feed').Feed;
const fs = require('fs');

const dataFilePath = '../assets/data/search.json';
const storagePath = '../feed/';
const authorINFO = {
    name: 'RavelloH',
    email: 'ravelloh@outlook.com',
    link: 'https://ravelloh.top/',
};

const feed = new Feed({
    title: "RavelloH's Blog / RavelloH的博客",
    description: 'RSS - 博客文章订阅更新',
    id: 'http://ravelloh.top/',
    link: 'http://ravelloh.top/',
    language: 'zh',
    image: 'https://ravelloh.top/assets/images/screenshot-pc.png',
    favicon: 'https://ravelloh.top/favicon.ico',
    copyright: `Copyright © 2019 - ${new Date().getFullYear()} RavelloH. All rights reserved.`,
    generator: 'https://github.com/RavelloH/local-rss-generation',
    feedLinks: {
        json: 'https://ravelloh.top/feed/feed.json',
        atom: 'https://ravelloh.top/feed/atom.xml',
        rss: 'https://ravelloh.top/feed/rss.xml',
    },
    author: authorINFO,
});

const posts = fs.readFileSync(dataFilePath, 'utf-8');
JSON.parse(posts).forEach((post) => {
    feed.addItem({
        title: post.name,
        id: post.url,
        link: post.url,
        content: post.context,
        author: authorINFO,
        date: new Date(post.time),
        titleList: post.title,
        tag: post.tag,
        category: post.class,
        classification: post.class,
    });
});

fs.writeFileSync(storagePath + 'rss.xml', feed.rss2());
fs.writeFileSync(storagePath + 'atom.xml', feed.atom1());
fs.writeFileSync(storagePath + 'feed.json', feed.json1());
