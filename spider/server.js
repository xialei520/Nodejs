const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const common = require('./common');



var server = express();
server.listen(8080);
server.get('/', function (req, res) {
    request('http://www.suibianlu.com/meitu_6/', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        const $ = cheerio.load(body);   
        // res.json({
        //     'Classnum': $('.list-meizitu').html()
        // })
        var html = '';
        for(let i = 0; i < $('.list-meizitu a').length; i++){
            html += $('.list-meizitu a').eq(i).find('img').attr('src')
           
           
        }
        res.json({
            'Classnum':html
        })
        console.log($('.list-meizitu a').eq(0).find('img').attr('src'))
        var arr = ['http://www.suibianlu.com/zb_users/plugin/IMAGE/pic.php?src=aHR0cDovL29zcy5zdWliaWFubHUuY29tL3piX3VzZXJzL3VwbG9hZC8yMDE3LzEwLzIwMTcxMDI1OTA4N18yNi5qcGc&amp;width=300&amp;height=350&amp;cuttype=4','http://oss.suibianlu.com/zb_users/upload/2017/10/201710252799_545.jpg']
        for(var i =0; i < 1; i++){
            common.s('http://www.suibianlu.com/zb_users/plugin/IMAGE/pic.php?src=aHR0cDovL29zcy5zdWliaWFubHUuY29tL3piX3VzZXJzL3VwbG9hZC8yMDE3LzEwLzIwMTcxMDI1OTA4N18yNi5qcGc&amp;width=300&amp;height=350&amp;cuttype=4', { encoding: "utf8" });
        }
        
    });
    // res.send('123');
    

})