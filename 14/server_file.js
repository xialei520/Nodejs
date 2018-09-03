const express = require('express');
const bodyParser = require('body-parser');

var server = express();
server.listen(8080);

server.use(bodyParser.urlencoded({extended: false}));
server.post('/', function(req, res, next){
    console.log(req.body)
})