const mysql = require('mysql');
const express = require('express');
const consolidate = require('consolidate');

const cheerio = require('cheerio');
const fs = require('fs-extra');
const request = require('superagent');
const path = require('path');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mm'
})
var server = express();



// 配置模板引擎
server.set('view engine', 'html');
// 模板文件放在哪里
server.set('views', './template');
// 用哪种模板引擎
server.engine('html', consolidate.ejs);
database()
async function database(){
    db.query(`SELECT * FROM mm`,async function (err, data) {
        if (err) {
            res.status(500).send('数据有问题').end();
        } else {
            fs.mkdir(path.join(__dirname, '/girl'));
            if (data.length == 0) {
                res.status(404).send('数据没有找到').end();
            } else {
                for(var i = 0; i <data.length; i++){
                    await down(data[i].file_name, data[i].imgUrl)
                    await sleep(random(1000, 5000))
                }
            }
        }
    });
}

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

async function down(name, url){
    console.log(`正在下载${name}`);
    
     
    const req = request.get(url)
        .set({ 'Referer': 'http://pic.meituba.com/' })
    req.pipe(fs.createWriteStream(path.join(__dirname, 'girl',name)));
}
// server.use('/', function (req, res, next) {
//     db.query(`SELECT * FROM mm`, function (err, data) {
//         if (err) {
//             res.status(500).send('数据有问题').end();
//         } else {
            
//             if (data.length == 0) {
//                 res.status(404).send('数据没有找到').end();
//             } else {
//                 var url = []
//                 for(var i = 0; i <data.length; i++){
//                     console.log('===================')
//                     // console.log(data[i])
//                     console.log('===================')
//                     var obj = {
//                         filename: data[i].file_name,
//                         imgUrl: data[i].imgUrl
//                     }
//                     console.log(obj)
//                     url.push(obj);
        
//                 }
                
//                 res.render('index.ejs', {
//                     data: url
//                 })
//                 res.end()
//             }
//         }
//     });
// })
server.listen(8888);