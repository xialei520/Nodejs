const ejs = require('ejs');
ejs.renderFile('./views/4.ejs', {json: {
    arr: [{
        user: 'xialei',
        pass: '12345'
    }, {
        user:'zhangsan',
        pass: '54321'
    }]

}}, function(err, data){
    console.log(data)
     
})