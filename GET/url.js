const http = require('http');
const urlLib = require('url');
http.createServer(function(req, res){
    // console.log(req.url)
    var obj = urlLib.parse(req.url, true);
    console.log(obj)
    console.log(obj.pathname, obj.query)
    res.end();
}).listen(8080)
