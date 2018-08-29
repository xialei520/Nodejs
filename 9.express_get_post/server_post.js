const express = require('express');
const bodyParser = require('body-parser');
var server = express();
server.listen(8080);

server.use(bodyParser.urlencoded({
  extended: false,
  limit: 2 * 1024 * 1024
}));
server.use('/', function(req, res){
  console.log(req.body)
})
