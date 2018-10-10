const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const puppeteer = require('puppeteer');

const path = require('path');
const url = 'https://music.163.com/#/playlist?id=115218242';

async function getId(url){
    const data = await request.get(url);
   
    const $ = cheerio.load(data.text);
    
     
    
}
getId(url);

 
 