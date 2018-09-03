const express = require('express');
const expressStatic = require('express-static');
const cookieParser = require('cookie-parser');
 
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const jade = require('jade');
const ejs = require('ejs');

var server = express();
server.listen(8080);
