const express = require('express');
var server = express();

// user/
var routeUser = express.Router();
routeUser.get('/1.html', function(req, res){
    res.send('1.html')
})
routeUser.get('/2.html', function(req, res){
    res.send('2.html')
})
server.use('/user', routeUser);

// login/
var routeLogin = express.Router();
routeLogin.use('/a.html', function(req, res){
    res.send('login/a.html')
})
routeLogin.use('/b.html', function(req, res){
    res.send('login/b.html');
})
server.use('/login', routeLogin);

server.listen(8080);