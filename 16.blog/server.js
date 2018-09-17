const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
// const jade = require('jade');
// const ejs = require('ejs');
const consolidate = require('consolidate');
const mysql = require('mysql');
const common = require('./libs/common')

var server = express();
server.listen(8080);
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
})
//1.解析cookie
server.use(cookieParser('kjljsdkflsdkfjlks'));
//2.使用session
var arr = [];
for (var i = 0; i < 10000; i++) {
    arr.push('keys' + Math.random());
}
server.use(cookieSession({ name: 'zs_session_id', keys: arr, maxAge: 20 * 3600 * 1000 }));
//3.post数据
server.use(bodyParser.urlencoded({ extended: false }));
server.use(multer({ dest: './www/upload' }).any());
// 配置模板引擎
server.set('view engine', 'html');
// 模板文件放在哪里
server.set('views', './template');
// 用哪种模板引擎
server.engine('html', consolidate.ejs);
//4.用户请求
server.get('/', function (req, res, next) {
    //查询banner数据
    db.query("SELECT * FROM `banner_table`", (err, data) => {
        if (err) {

            res.status(500).send('database err').end();
        } else {
            res.banners = data;
            next();
        }
    })
})
server.get('/', (req, res, next) => {
    // 查询article数据
    db.query("SELECT ID,title, summary FROM article_table", (err, data) => {
        if (err) {
            res.status(500).send('database err').end();
        } else {
            res.articles = data;
            next();
        }
    })
})
server.get('/', (req, res, next) => {
    //获取数据并渲染到页面
    res.render('index.ejs', { banners: res.banners, articles: res.articles })
    res.end();
})

//跳转页面
server.get('/article', (req, res) => {
    console.log(req.query.id)
    if (req.query.id) {
        if (req.query.act == 'like') {
            db.query(`UPDATE article_table SET n_like=n_like+1 WHERE ID=${req.query.id}`, function (err, data) {
                if (err) {
                    res.status(500).send('数据库有点小错').end();
                    console.error(err);
                } else {
                    db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, function (err, data) {
                        if (err) {
                            res.status(500).send('数据有问题').end();
                        } else {
                            // console.log(data)
                            if (data.length == 0) {
                                res.status(404).send('数据没有找到').end();
                            } else {
                                var article_data = data[0];
                                article_data.sDate = common.timedata(article_data.post_time);
                                article_data.content = article_data.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                                console.log(article_data)
                                res.render('conText.ejs', {
                                    article_data: article_data
                                })
                            }
                        }
                    });
                }
            })
        } else {
            db.query(`SELECT * FROM article_table WHERE ID=${req.query.id}`, function (err, data) {
                if (err) {
                    res.status(500).send('数据有问题').end();
                } else {
                    // console.log(data)
                    if (data.length == 0) {
                        res.status(404).send('数据没有找到').end();
                    } else {
                        var article_data = data[0];
                        article_data.sDate = common.timedata(article_data.post_time);
                        article_data.content = article_data.content.replace(/^/gm, '<p>').replace(/$/gm, '</p>');
                        console.log(article_data)
                        res.render('conText.ejs', {
                            article_data: article_data
                        })
                    }
                }
            });
        }

    } else {

    }
    // res.render('conText.ejs', {})

})
server.use(expressStatic('./www'))