const http = require('http');
var server = http.createServer(function(req, res){
    console.log("有人访问了");
    res.write('abac');
    res.end();
})
server.listen(8080)