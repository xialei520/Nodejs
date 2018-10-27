const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const path = require('path');
// 下载网易云热歌榜前200首歌
const url = 'https://music.163.com/discover/toplist?id=3778678';

async function getId(url) {
    // const data = await request.get(url);
    // const $ = cheerio.load(data.text);
    // console.log($("#g_iframe tbody tr").length);

    const browser = await puppeteer.launch({ timeout: 300000, headless: true, args: ['--no-sandbox'] });
    // 创建
    const page = (await browser.pages())[0];
    // 跳转到歌单页面
    await page.goto(url);
    // console.log(page)

    // 获取歌单的iframe
    let iframe = await page.frames().find(f => f.name() === 'contentFrame');
    console.log(iframe)
    //获取歌单
    console.log('111')

    const result = await iframe.$('.body')
    console.log(result)
}
getId(url);


