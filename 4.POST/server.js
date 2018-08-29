const http = require('http');
const querystring = require('querystring');
http.createServer(function(req, res){
    var i = 0;
    var str = '';
    req.on('data', function(data){
        console.log(`这是第${i++}次接受`)
        str += data;
    })
    req.on('end', function(){
       var Post =  querystring.parse(str);
        console.log(req.url,Post)
    })
}).listen(8080);