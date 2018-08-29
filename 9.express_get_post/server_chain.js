const express = require('express');
const bodyParser = require('body-parser');
var server = express();
server.listen(8080);

server.use(function(req, res, next){
  req.a = 'kkkkkkkkkk';
  next();
})
server.use(function(req, res, next){
  console.log(req.a)
})
