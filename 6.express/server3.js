const express = require('express');
const expressStatic = require('express-static');

var server = express();


server.listen(8080);
var users = {
    'xialei': '123456',
    'zhangfei': '654321'
}
server.get('/login', function(req, res){
    var user = req.query['user'];
    var pass = req.query['pass'];
    if(users[user] == null){
        res.send({ok: false, msg: '此用户不存在'})
    }else{
        if(users[user] != pass){
            res.send({ok: false, msg: '密码错误'})
        }else{
            res.send({ok: true, msg:'登录成功'})
        }
    }
})
server.use(expressStatic('./www'))

