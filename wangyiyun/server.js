const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const path = require('path');
const url = 'https://music.163.com/#/playlist?id=115218242';

async function getId(url){
    const data = await request.get(url);
   
    const $ = cheerio.load(data.text);
    
    // const $1 = cheerio.load(ss.html());
    // console.log($1('tr').length)
    
}
getId(url);

 
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto( url, {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'hn.pdf', format: 'A4'});
//   console.log(page)
//   await browser.close();
// })();