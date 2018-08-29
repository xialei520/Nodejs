const express = require('express');
var server = express();

// server.get('/', function(){
//     console.log('有get')
// })
// server.post('/', function(){
//     console.log('有post')

// })

server.use('/', function () {
    console.log('有use')
})
server.listen(8080);