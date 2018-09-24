
const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');

const path = require('path');

const url = 'http://www.meituba.com/';

// 获取图片分类
async function classify() {
    console.log(url)
    const address = await request.get(url);

    const $ = cheerio.load(address.text);
    console.log($('#SeaNav ul li').length)
    const json = {};
    for (let i = 1; i < $('#SeaNav ul li').length; i++) {
        var bigclass = $('#SeaNav ul li').eq(i).find('a').eq(0).text();
        json[bigclass] = {};
        $('#SeaNav ul li').eq(i).find('.ShowNav a').each(function (i, elem) {

            let smclass = $(this).text();
            json[bigclass][smclass] = $(this).attr('href');;
        })

    }
    // console.log(json)
    console.log(json['美女大全'])

    console.log(`创建美女大全文件夹`)
    // await fs.mkdir(path.join(__dirname, '/mm', '美女大全'));
    for (var k in json['美女大全']) {
        console.log(json['美女大全'][k])
        console.log(k)

        await beautify(json['美女大全'][k]);
    }
}
classify()



// json
// { '美女大全':
//    { '性感美女': 'http://www.meituba.com/xinggan/',
//      '清纯美女': 'http://www.meituba.com/qingchun/',
//     
//     }
// var sm_url = 'http://www.meituba.com/qingchun/';
// 美女分类
async function beautify(sm_url) {
    const data = await request.get(sm_url);
    // console.log(data)
    const _$ = cheerio.load(data.text);
    const dir = _$('.now a').eq(2).text()
    // console.log(dir1)
    console.log(`创建大${dir}文件夹`)
    await fs.mkdir(path.join(__dirname, '/mm', dir))
    //获取图片页数
    let pagecount = _$('.pages ul li').length;
    let sumpage = _$('.pages ul li').eq(pagecount - 1).find('a').attr('href');
    console.log(sumpage)
    let sum = _$('.pages ul li').eq(1).find('a').attr('href').split('2')[0].split('t')[1];
    console.log(sum)
    let countpage = sumpage.split(sum)[1].split('.')[0];
    console.log(countpage)

    for (var i = 1; i <= countpage; i++) {
        let imgurl = sm_url + 'list' + sum + i + '.html';
        console.log(imgurl)
       
        await getPic(imgurl,dir)

        // break;
        // getimg(imgurl);
        // break;
    }
}
// getimgUrl(sm_url);
// 获取图集
async function getPic(imgurl,dir) {
    const data2 = await request.get(imgurl);
    // console.log('llll')
    const _$2 = cheerio.load(data2.text);
    console.log(_$2('.channel_list ul li').length)
    for (let e = 0; e < _$2('.channel_list ul li').length; e++) {
        const dir1 = _$2('.channel_list ul li').eq(e).find('a').attr('title');
        const src = _$2('.channel_list ul li').eq(e).find('a').attr('href');
        console.log(`创建${dir1}文件夹`)
        await fs.mkdir(path.join(__dirname, '/mm', dir, dir1))
        await getSrc(dir, src, dir1);
        // break;
    }
    // console.log(`创建${dir1}文件夹`);

}
// 获取图片地址
async function getSrc(dir1, src, dir) {
    const data3 = await request.get(src);

    const _$3 = cheerio.load(data3.text);
    let pages = _$3('.pages ul li').eq(0).find('a').text().split('共')[1].split('页')[0];
    console.log(pages);
    console.log(src.split('/').pop().split('.')[0]);
    let src_ = src.split('/').pop().split('.')[0];
    for (let p = 1; p <= pages; p++) {
        let src_1 = src.replace(src_, src_ + "_" + p)
        console.log(src, src_, src_1)

        if (src_1 == src.replace(src_, src_ + "_" + 1)) {
            src_1 = src;
        }
        //    console.log(src_2);
        const data4 = await request.get(src_1);
        const _$4 = cheerio.load(data4.text);
        let imgload = _$4('.photo img').attr('src');
        await down(dir1, imgload, dir);
        await sleep(random(1000, 5000))
    }
}
async function down(dir1, imgload, dir) {


    console.log(`正在下载${imgload}`)
    const filename = imgload.split('/').pop();
    const req = request.get(imgload)
        .set({ 'Referer': 'http://www.meituba.com' })
    req.pipe(fs.createWriteStream(path.join(__dirname, 'mm',dir1, dir, filename)))

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