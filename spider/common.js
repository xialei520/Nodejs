const request = require('request');
const fs = require('fs');
const path = require('path');
module.exports = {
    s: function (url) {
        console.log(url)
        // request(url).pipe(fs.createWriteStream(path.parse(url).base));
        var name = new Date();
        try{
            request.get(url).on('error', function (err) {
                console.log(err)
            }).pipe(fs.createWriteStream(path.parse(url).base));
        }catch(err){
            console.log(err)
        }
        
    }
}

