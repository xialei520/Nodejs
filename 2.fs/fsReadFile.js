const fs = require('fs');
fs.readFile('aaa.txt', function(error, data){
    if(error){
        console.log('读取失败')
    }else{
        console.log(data);
    }
})