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
for(var i = 0; i < 10000; i++){
    arr.push('keys'+ Math.random());
}
server.use(cookieSession({name:'zs_session_id', keys: arr, maxAge: 20*3600*1000}));
//3.post数据
server.use(bodyParser.urlencoded({extended: false}));
server.use(multer({dest: './www/upload'}).any());
// 配置模板引擎
server.set('view engine', 'html');
// 模板文件放在哪里
server.set('views', './template');
// 用哪种模板引擎
server.engine('html', consolidate.ejs);

//4.用户请求
server.get('/', function(req, res, next){
    
    db.query("SELECT * FROM `banner_table`", (err, data) =>{
        if(err){
            
            res.status(500).send('database err').end();
        }else{
            res.banners = data;
            next();
        }
    })
   
})
server.get('/', (req, res, next) => {
    db.query("SELECT ID,title, summary FROM article_table", (err, data) => {
        if(err){
            res.status(500).send('database err').end();
        }else{
            res.articles = data;
            next();
        }
    })
    
})
server.get('/', (req, res, next) => {
    // console.log(res.banners, res.articles)
    res.render('index.ejs', {banners: res.banners, articles: res.articles})
})

server.get('/article', (req, res)=>{
    res.render('conText.ejs', {})
})
server.use(expressStatic('./www'))