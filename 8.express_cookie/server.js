const express = require('express');
var server = express();

server.use('/aaa', function(req, res){
  res.cookie('user', 'xialei', {path: '/aaa', maxAge: 7*24*3600*1000});
  res.send('ok');
})
server.listen(8080);
