const express = require('express');
var server = express();

server.use('/a.html', function(req, res){
    res.send({a:1, b:2});
    res.end();
})
server.use('/b.html', function(req, res){
    res.send('bbb');
    res.end();
})

server.listen(8080);