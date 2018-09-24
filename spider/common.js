const request = require('request');
const fs = require('fs');
const path = require('path');
module.exports = {
    s: function (url) {
        console.log(url)
        // request(url).pipe(fs.createWriteStream(path.parse(url).base));
        // fs.mkdir('images',function(error){
        //     if(error){
        //         console.log(error);
        //         return false;
        //     }
        //     console.log('创建目录成功');

        // })


        var writerStream = fs.createWriteStream('./images/' + path.parse(url).base);

        // request(url).pipe(writerStream);
        request.get({
            url: url,
            headers: {
                'referer': 'http://www.meituba.com/'
            }
        }).pipe(writerStream);

         



    }
}

