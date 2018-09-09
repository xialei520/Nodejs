const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
 
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
// const jade = require('jade');
// const ejs = require('ejs');
const consolidate = require('consolidate');

var server = express();
server.listen(8080);

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

// 配置模板引擎
server.set('view engine', 'html');
// 模板文件放在哪里
server.set('views', './views');
// 用哪种模板引擎
server.engine('html', consolidate.ejs);

//4.用户请求
server.use('/', function(req, res, next){
    console.log(req.query, req.body, req.cookie, req.session);
    res.render('1.ejs', {name: '夏磊'})
})
server.use(expressStatic('./www'))