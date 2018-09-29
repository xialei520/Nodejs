const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');

const path = require('path');
 

const url = 'http://www.umei.cc/tags/shaonv_1.htm';

async function pageSum(url) {
    await fs.mkdir(path.join(__dirname, '/mm'));
    let data = await request.get(url);
    const $ = cheerio.load(data.text);
    const length = $('.NewPages ul li').length;

    console.log($('.NewPages ul li').eq(length-1).find('a').attr('href'))
    const text = $('.NewPages ul li').eq(length-1).find('a').attr('href');
    const sumpage = text.split('_')[1].split('.')[0];
    console.log(sumpage)
    for(let i = 1; i <= sumpage; i++){
        const eachPage = 'http://www.umei.cc/tags/shaonv_'+ i +'.htm';
        await atlasUrl(eachPage);
    }

}
async function atlasUrl(eachPage){
    const eachpagedata = await request.get(eachPage);
    const $1 = cheerio.load(eachpagedata.text);
    
    for(let j = 0; j<  $1('.TypeList ul li').length; j++){
        const title = $1('.TypeList ul li').eq(j).find('.ListTit').text();
        const imgsUrl = $1('.TypeList ul li').eq(j).find('a').attr('href');
        console.log(`创建${title}文件夹`);
        await fs.mkdir(path.join(__dirname, '/mm', title));
        await girlPage(imgsUrl, title);
    }
}

async function girlPage(imgsUrl,title){
    console.log('1')
    const girlURL = await request.get(imgsUrl);
    const $2 = cheerio.load(girlURL.text);
    // 获取每个图册照片个数
   const page=  $2('.NewPages ul li').eq(0).find('a').text();
//    console.log(page.split('共')[1].split('页')[0])
   const countpage = page.split('共')[1].split('页')[0];
   for(let k = 1; k <= countpage; k++){
    
    // console.log(imgsUrl.split('/').pop().split('.')[0]+ '_' +k+'.htm')
    //图片所在页面的地址
    let imgeach = imgsUrl.replace(imgsUrl.split('/').pop(), imgsUrl.split('/').pop().split('.')[0]+ '_' +k+'.htm');
    if(imgeach.split('/').pop() == imgsUrl.split('/').pop().split('.')[0]+ '_1' +'.htm'){
        imgeach = imgsUrl;
    }
    await imgDownload(imgeach,title);
    await sleep(random(1000, 5000))
   }
}
async function imgDownload(imgeach, title){
   
    const ImgUrl = await request.get(imgeach);
    const $3 = cheerio.load(ImgUrl.text);
    
    const downUrl = $3('.ImageBody').find('img').attr('src');
    console.log(downUrl)
    console.log(`正在下载${downUrl}`)
    const filename = downUrl.split('/').pop();
    const req = request.get(downUrl)
        .set({ 'Referer': 'http://http://www.umei.cc' })
    req.pipe(fs.createWriteStream(path.join(__dirname, 'mm',title, filename)))
}
pageSum(url)
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