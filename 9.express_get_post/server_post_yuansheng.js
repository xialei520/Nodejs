const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
var server = express();
server.listen(8080);
  var str = '';
server.use(function(req, res, next){
  req.on('data', function(data){
    str += data;
  })
  req.on('end', function(){
    req.body = querystring.parse(str);
    next();
  })

})
server.use(function(req, res, next){
  console.log(req.body)
})
