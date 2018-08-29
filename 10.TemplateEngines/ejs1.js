const ejs = require('ejs');
ejs.renderFile('./views/2.ejs', {name: 'xialei'}, function(err, data){
  if(err){
    console.log("编译失败")
  }else{
    console.log(data)
  }
});
