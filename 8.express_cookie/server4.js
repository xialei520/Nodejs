const express = require('express');
var server = express();
var cookieParser = require('cookie-parser');

server.use(cookieParser('skdlksdjflks'));

server.use('/', function(req, res) {
  res.clearCookie('user');


  res.send('ok')
})
server.listen(8080);
