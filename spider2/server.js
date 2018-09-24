const cheerio = require('cheerio');
const fs = require('fs-extra');
const request = require('superagent');
const path = require('path');

let url = 'http://www.mmjpg.com/tag/meitui/';
request
    .get(url + '1')
    .then(function (res) {
        // console.log(res.text)
    })
// 获取图集的url
async function getUrl() {
    let linkArr = [];
    for (let i = 1; i < 10; i++) {
        const res = await request(url + i);
        const $ = cheerio.load(res.text);
        $('.pic li').each(function (i, elem) {
            const href = $(this).find('a').attr('href');
            const title = $(this).find('.title').text();
            console.log(title, href)
            let link = $(this).find('a').attr('href');
            linkArr.push(link);
        })
    }
    console.log(linkArr)
    return linkArr;

}
// getUrl()
//获取图集中图片的url
async function picUrl(url) {
    const res = await request(url);
    const $ = cheerio.load(res.text);
    //创建图集名称目录
    const dir = $('.article h2').text();

    console.log(`创建${dir}文件夹`)
    await fs.mkdir(path.join(__dirname, '/mm', dir))
    const pagecount = parseInt($('#page .ch.all').prev().text());

    console.log('==========='+pagecount)
    for (let i = 1; i < pagecount; i++) {
        let path = url + "/" + i;
        console.log(path)
        let data = await request.get(path);
        let _$ = cheerio.load(data.text);
        let imgurl = _$('#content img').attr('src');
        console.log(imgurl)
        down(dir, imgurl);
        await sleep(random(1000, 5000))
    }
}

// 下载图片
function down(dir, imgurl) {
    console.log(`正在下载${imgurl}`);
    
    let filename = imgurl.split('/').pop();
    const req = request.get(imgurl)
        .set({ 'Referer': 'http://www.mmjpg.com' })
    req.pipe(fs.createWriteStream(path.join(__dirname, 'mm', dir, filename)));
}
// sleep函数
function sleep(time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve()
        }, time)
    })
};
function random(min, max) {
    let range = max - min
    let rand = Math.random()
    let num = min + Math.round(rand * range)
    return num
}
async function init() {
    let urls = await getUrl();
    for (let url of urls) {
        await picUrl(url)
    }
}
init();