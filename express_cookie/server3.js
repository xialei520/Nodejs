const express = require('express');
var server = express();
var cookieParser = require('cookie-parser');

server.use(cookieParser('skdlksdjflks'));

server.use('/', function(req, res) {
  req.secret = 'skdlksdjflks';


  res.cookie('user','xialei',{
    signed: true
  });
  console.log('签名的cookie:',req.signedCookies);
  console.log('未签名的cookie:',req.cookies);
  res.send('ok')
})
server.listen(8080);
