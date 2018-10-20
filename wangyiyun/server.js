const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
 

const path = require('path');
// 下载网易云热歌榜前200首歌
const url = 'https://music.163.com/discover/toplist?id=3778678';

async function getId(url){
    const data = await request.get(url);
    const $ = cheerio.load(data.text);
    console.log($("#g_iframe tbody tr").length);
    
}
getId(url);

 
 