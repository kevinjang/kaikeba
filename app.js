var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const {initLocals} = require('./middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vipCourseRouter = require('./routes/vip-course');
var openCourseRouter = require('./routes/open-courses');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const helpers = require('./helpers');

app.use(logger('dev'));//日志
app.use(express.json());//获取ajax传递json数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//把public目录定义为静态资源所在
app.use(express.static(path.join(__dirname, 'public')));
//注册自定义中间件
app.use(initLocals);

// app.use(require('./model'));

app.use('/', indexRouter);
// initLocals();
// app.use(initLocals())
app.use('/users', usersRouter);
app.use('/vip-course',vipCourseRouter);
app.use('/open-courses',openCourseRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
