const express = require('express');
const cookieSession = require('cookie-session');
var server = express();
var cookieParser = require('cookie-parser');

server.use(cookieParser());
server.use(cookieSession({
  name:'xialei',
  keys: ['aaa', 'bbb', 'ccc'],
  maxAge: 2*3600*1000
}));


server.use('/', function(req, res) {
  if(req.session['count'] == null){
    req.session['count'] = 1;
  }else{
    req.session['count']++;
  }
  console.log(req.session['count']);
  res.send('ok');
})
server.listen(8080);
