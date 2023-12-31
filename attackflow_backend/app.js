require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const port = 9999; // 指定端口
const chatgptRouter = require('./routes/chatgpt');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var annotatorRouter = require('./routes/annotator');
var uploadRouter = require('./routes/upload');

var app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.options('*', cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: '*',
  credentials: true
}));

app.use('/chatgpt', chatgptRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/annotator', annotatorRouter);
app.use('/upload', uploadRouter);

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

console.log("ChatGPT API Key:", process.env.CHATGPT_API_KEY);
