const fs = require('fs');
fs.writeFile('bbb.txt', '111111111111', function(err){
    console.log(err);
})