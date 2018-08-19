const http = require('http');
http.createServer(function(req, res){
    console.log(req.url)
    var obj = {};
    if(req.url.indexOf('?') != -1){
        var arr = req.url.split('?')[1];
        var arr1 = arr.split('&');
        
        for(var i = 0; i < arr1.length; i++){
            var arr2 = arr1[i].split('=');
            obj[arr2[0]] = arr2[1];
        }
    }else{
        
    }
    console.log(req.url, obj)
}).listen(8080)
