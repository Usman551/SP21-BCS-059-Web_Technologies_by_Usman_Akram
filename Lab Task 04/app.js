var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require("express-session");
const methodOverride = require('method-override');

const flash = require('connect-flash');
var path = require('path');

var logger = require('morgan');
const mongoose = require('mongoose');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
var config = require("config");
// Session middleware
app.use(
  session({
    secret: config.get("sessionSecret"),
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/menue'));
app.use('/', require('./routes/reservation'));
app.use('/', require('./routes/ajaxapi'));
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/api/product'));
app.use('/', require('./routes/search'));
app.use('/', require('./routes/admin/adminpanel'));
// app.use("/", require("./routes/authentication"));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/users').then(() => { console.log('MongoDB connected...') });




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
