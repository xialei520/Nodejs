const http = require('http');
const querystring = require('querystring');
http.createServer(function(req, res){
    // console.log(req.url)
    
    if(req.url.indexOf('?') != -1){
        var obj = {};
        var arr = req.url.split('?')[1];
        obj = querystring.parse(arr)
    }else{
        var obj = {};
    }
    console.log(req.url, obj)
    res.end();
}).listen(8080)
