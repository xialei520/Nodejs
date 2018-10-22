const fs = require('fs-extra');
const cheerio = require('cheerio');
const request = require('superagent');
const path = require('path');
const xlsx = require('node-xlsx');

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
    console.log(eachPage)
    // const data = await request(eachPage);
    // const $ = cheerio.load(data.text);


    // console.log($('#list-content .zu-itemmod').length, 'sss')
    // var obj = {
    //     name: '第' + i + '页'

    // };
    // var data = [
    //     [
    //         '姓名', '价格', '户型', '面积', '朝向', '楼层', '装修', '类型', '小区'
    //     ]
    // ]
    // for (var j = 0; j < $('#list-content .zu-itemmod').length; j++) {
        
    //     var href = $('#list-content .zu-itemmod').eq(j).attr('link');
    //     // await load(href)
    // }
}
async function load(href, i) {
   
    const message = await request(href);
    const $_ = cheerio.load(message.text);

    for (var k = 0; k < $_('#room_pic_wrap .img_wrap img').length; k++) {
        imgArr.push($_('#room_pic_wrap .img_wrap img').eq(k).attr('src'))
    }
    var each = [];
    console.log($_('.house-info-zufang li').length, "000");

    var price = await $_('.house-info-zufang li').eq(0).find('.price').text();
    // console.log($_('.house-info-zufang li').eq(p).find('.price').text())
    var huxing = await $_('.house-info-zufang li').eq(1).find('.info').text();
    var mianji = await $_('.house-info-zufang li').eq(2).find('.info').text();
    var chaoxiang = await $_('.house-info-zufang li').eq(3).find('.info').text();
    var louceng = await $_('.house-info-zufang li').eq(4).find('.info').text();
    var zhuangxiu = await $_('.house-info-zufang li').eq(5).find('.info').text();
    var leixing = await $_('.house-info-zufang li').eq(6).find('.info').text();
    var xiaoqu = await $_('.house-info-zufang li').eq(7).find('a').eq(0).text() + '(' + $_('.house-info-zufang li').eq(7).find('a').eq(1).text() + ' ' + $_('.house-info-zufang li').eq(7).find('a').eq(1).text() + ')';
    var name = await $_('.rbox').find('.broker-name').text();
    each.push(name).push(price).push(huxing).push(mianji).push(chaoxiang).push(louceng).push(zhuangxiu).push(leixing).push(xiaoqu);
    data.push(each);
    obj.push(data);
    arrData.push(obj)
    console.log(JSON.stringify(arrData))

}
var buffer = xlsx.build(arrData)
fs.writeFile('租房信息.xlsx',  buffer, function (err) {
    console.log(err)
})