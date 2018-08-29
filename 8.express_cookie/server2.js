const express = require('express');
var server = express();
var cookieParser = require('cookie-parser');

server.use(cookieParser());

server.use('/aaa', function(req, res){
  console.log(req.cookies);
  res.cookie('user', 'xialei', {path: '/aaa', maxAge: 7*24*3600*1000});
  res.send('ok');
})
server.listen(8080);
