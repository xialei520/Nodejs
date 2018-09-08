const express = require('express');
const bodyParser = require('body-parser');
const  multer= require('multer');
const pathLib = require('path');
const fs = require('fs');


const objMulter = multer({dest: './www/upload/'});

var server = express();
server.listen(8080);

server.use(objMulter.any());
// server.use(bodyParser.urlencoded({extended: false}));
server.post('/', function(req, res, next){
    // console.log(req.body)
    console.log(req.files);

    var newName = req.files[0].path + pathLib.parse(req.files[0].originalname).ext;
    fs.rename(req.files[0].path, newName, function(err){
        if(err)
            res.send('上传失败');
        else
            res.send('上传成功')
    } )
})