const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const mybodyparser = require('./libs/my-body-parser')
var server = express();
server.listen(8080);
 
server.use(mybodyparser)
server.use(function(req, res, next){
  console.log(req.body)
})
