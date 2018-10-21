const fs = require('fs-extra');
const cheerio = require('cheerio');
const request = require('superagent');
const path = require('path');

const url = 'https://qd.zu.anjuke.com/fangyuan/px3/';

getPage(url);
var arrData = [];
async function getPage(url) {

    // console.log(data)
    for (var i = 1; i <= 10; i++) {

        if (i == 1) {
            var eachPage = 'https://qd.zu.anjuke.com/fangyuan/px3/';

        } else {
            var eachPage = 'https://qd.zu.anjuke.com/fangyuan/p' + i + '-px3/';

        }
        await getUrl(eachPage);
        // console.log(eachPage)
    }
}
async function getUrl(eachPage) {
    const data = await request(url);
    const $ = cheerio.load(data.text);


    console.log($('#list-content .zu-itemmod').length, 'sss')

    for (var j = 0; j < $('#list-content .zu-itemmod').length; j++) {
        // console.log($('#list-content .zu-itemmod').eq(j).attr('link'));
        var href = $('#list-content .zu-itemmod').eq(j).attr('link');
        await load(href)
    }
}
async function load(href) {
    const message = await request(href);
    const $_ = cheerio.load(message.text);
    var imgArr = [];
    for (var k = 0; k < $_('#room_pic_wrap .img_wrap img').length; k++) {
        imgArr.push($_('#room_pic_wrap .img_wrap img').eq(k).attr('src'));
    }
    var obj = {
        img: imgArr,
    }

    console.log($_('.house-info-zufang li').length, "000");

    obj.price = await $_('.house-info-zufang li').eq(0).find('.price').text();
    // console.log($_('.house-info-zufang li').eq(p).find('.price').text())
    obj.huxing = await $_('.house-info-zufang li').eq(1).find('.info').text();
    obj.mianji = await $_('.house-info-zufang li').eq(2).find('.info').text();
    obj.chaoxiang = await $_('.house-info-zufang li').eq(3).find('.info').text();
    obj.louceng = await $_('.house-info-zufang li').eq(4).find('.info').text();
    obj.zhuangxiu = await $_('.house-info-zufang li').eq(5).find('.info').text();
    obj.leixing = await $_('.house-info-zufang li').eq(6).find('.info').text();
    obj.xiaoqu = await $_('.house-info-zufang li').eq(7).find('a').eq(0).text()+'('+ $_('.house-info-zufang li').eq(7).find('a').eq(1).text()+' '+$_('.house-info-zufang li').eq(7).find('a').eq(1).text()+')';
    obj.name = await $_('.rbox').find('.broker-name').text();
    arrData.push(obj);
    console.log(JSON.stringify(arrData))
    // await fs.writeFile('租房信息.txt', JSON.stringify(obj), function(err){
    //     console.log(err)
    // })
}