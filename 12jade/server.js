var jade = require('jade');
console.log(jade.renderFile('./views/2.jade', {pretty: true, name: '夏磊'},
    json = {
        width: '200px',
        height:'200px'
    },
    arr = ['container', 'list'],
    arr1 = ['jlskdjf', 'ksldjflks', 'osdijf', 'sodfjlskdf'],

    content = '<h1>我是标题</h1>'
));