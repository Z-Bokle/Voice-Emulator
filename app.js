var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db=require('./public/database/connect');

var bodyParser = require('body-parser')
var ejs = require("ejs");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var toolsRouter = require('./routes/tools')
var apiRouter = require('./routes/api')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('here is ve!'));//参数用于加密cookie，无参数会报错
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine','ejs')//默认渲染引擎为ejs，如有需要也可以使用jsp等

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 这三行为解析接口传参


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tools', toolsRouter);
app.use('/api',apiRouter);

module.exports = app;

