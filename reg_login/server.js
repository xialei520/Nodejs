const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

//用户名密码的存储
var users = {}; 
var server = http.createServer(function(req, res){
    //解析数据
    var str = '';
   
    res.on('data', function(data){
        str += data;
    })
    res.on('end', function(){
        var obj = urlLib.parse(req.url, true);
        const url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse(str);

        //区分是接口还是文件
        if(url == '/user'){//接口
            switch(GET.act){
                case 'reg':
                    if(users[GET.user]){
                        res.write('{"ok": false, msg: "此用户已存在"}')
                    }else{
                        users[GET.user] = GET.pass;
                        res.write('{"ok": true, msg: "注册成功"}')
                    }
                break;
                case 'login':
                    if(users[GET.user] == null){
                        res.write('{"ok": false, msg: "此用户不存在"}')

                    }else if(users[GET.user] != users[GET.pass]){
                        res.write('{"ok": false, msg: "用户名或密码错误"}')

                    }else{
                        res.write('{"ok": true, msg: "登录成功"}')
                    }
                break;
                default:
                     res.write('{"ok": false, msg: "未知的act"}')
                    
                break;
                res.end()
            }
        }else{//文件
            //读取文件
            var filename = './www' + url;
            fs.readFile(filename, function(err, data){
                if(err){
                    res.write('404');
                }else{
                    res.write(data);
                }
                res.end();
            })
        }
    })
})
server.listen(8080)