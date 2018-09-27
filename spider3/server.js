const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const mysql = require('mysql');


const url = 'https://000av.org';

async function group(url) {
    const data = await request.get(url);
    const $ = cheerio.load(data.text);

    console.log($('.newnav .tp ul li').length);
    var html = $('.newnav .tp ul li');
    for (let i = 7; i < html.length; i++) {
        let pageUrl = html.eq(i).find('a').attr('href');
        let dir = html.eq(i).find('a').text();
        console.log(`创建${dir}文件夹`)
        await fs.mkdir(path.join(__dirname, '/mm', dir));
        await getImgUrl(url + pageUrl, dir);

    }
}
// 进入分类获取图片链接
async function getImgUrl(urlimg, dir) {
    const pageData = await request.get(urlimg);
    const $_ = cheerio.load(pageData.text);
    //获取套图列表
    let sum = $_(".art ul li");
    // console.log(sum)
    for (let j = 0; j < sum.length; j++) {
        //每一个套图
        const imgList = sum.eq(j).find('a').attr('href');
        const imgTitle = sum.eq(j).find('a').text();
        console.log(`创建${imgTitle}文件夹`)
        await fs.mkdir(path.join(__dirname, '/mm', dir, imgTitle));
        await Img(url + imgList, dir, imgTitle)
    }
}

async function Img(img, dir, imgTitle) {
    const imgPage = await request.get(img);
    const $__ = cheerio.load(imgPage.text);
    let img_sum = $__('.imgbody p').length;
    for (let k = 1; k < img_sum - 1; k++) {
        let imgUrl = $__('.imgbody p').eq(k).find('img').attr('src');
        await down(imgUrl, dir, imgTitle);
        await sleep(random(5000, 10000))
    }
}
async function down(imgUrl, dir, imgTitle) {
    console.log(`正在下载${imgUrl}`)
    const filename = imgUrl.split('/').pop();
    // var img_url = 'http:'+imgUrl;
    const req = request.get('http:' + imgUrl)
        .set({ 'Referer': 'https://000av.org/' })
    req.pipe(fs.createWriteStream(path.join(__dirname, 'mm', dir, imgTitle, filename)));
     
}

function random(min, max) {
    let range = max - min
    let rand = Math.random()
    let num = min + Math.round(rand * range)
    return num
}
function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, time)
    })
};
group(url)