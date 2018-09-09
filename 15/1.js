const mysql = require('mysql');
var db = mysql.createConnection({host: 'localhost', port: 3306, user: 'root', password: 'root', database: '20180909'});
// console.log(db);
db.query('SELECT * FROM `user_table`; ', function(err, data){
    if(err)
        console.log('出错了' + err);
    else
        console.log('成功了'+ JSON.stringify(data))
})
db.query("INSERT INTO `user_table` (`ID`, `username`, `password`) VALUES (0, '程潇丹', '520');", function(err, data){
    if(err)
        console.log('出错了' + err);
    else
        console.log('成功了'+ JSON.stringify(data))
})