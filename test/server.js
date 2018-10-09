const mysql = require('mysql');
const express = require('express');
const consolidate = require('consolidate');
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


server.use('/', function (req, res, next) {
    db.query(`SELECT * FROM mm`, function (err, data) {
        if (err) {
            res.status(500).send('数据有问题').end();
        } else {
            // console.log(data);
            // console.log(data.RowDataPacket)
            // console.log(data.length)
           
            if (data.length == 0) {
                res.status(404).send('数据没有找到').end();
            } else {
                var url = []
                for(var i = 0; i <data.length; i++){
                    console.log('===================')
                    // console.log(data[i])
                    console.log('===================')
                    var obj = {
                        filename: data[i].file_name,
                        imgUrl: data[i].imgUrl
                    }
                    console.log(obj)
                    url.push(obj);
        
                }
                console.log('data')
                res.header("Access-Control-Allow-Origin", "*");
                // res.header('Content-type', 'image/jpeg');
                res.render('index.ejs', {
                    data: url
                })
                res.end()
            }
        }
    });
})
server.listen(8888);