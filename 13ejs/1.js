const ejs = require('ejs');
ejs.renderFile('./views/1.ejs', {name: 'xialei'}, function(err, data){
    console.log(data)
     
})