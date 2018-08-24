const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const urlLib = require('url');

var server = http.createServer(function (req, res) {
    // GET
    var obj = urlLib.parse(req.url, true);
    var url = obj.pathname;
    const GET = obj.query;
    //POST
    var str = '';
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        const POST = querystring.parse(str);
        console.log(url, GET, POST)
        //读取文件
        var filename = './www' + url;
        fs.readFile(filename, function(error, data){
            if(error){
                res.write('404');
            }else{
                res.write(data);
            }
            res.end();
        })
    })
})
server.listen(8080)
