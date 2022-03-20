var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db=require('./public/database/connect');

var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // 这三行为解析接口传参


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;