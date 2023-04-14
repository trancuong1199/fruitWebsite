var session = require('express-session');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");


// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');
var signInRouter = require('./routes/signIn');
var orderDetailRouter = require('./routes/orderDetail');
var app = express();
app.use(cors());

app.use('/uploads', express.static('uploads'))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/orderDetail', orderDetailRouter);
app.use('/signIn', signInRouter);

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
  res.status(err.status || 200);
  res.render('error');
});

module.exports = app;
