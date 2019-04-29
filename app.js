var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://90e778590b4d474489c0402c8b260e74@sentry.io/1444061' });



var categoryRouter = require('./routes/categories');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');
var IndexRouter = require('./routes/index');

var app = express();

mongoose.connect('mongodb://localhost:27017/OSF', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected')) //mongodb+srv://Ihor:Aminif01@cluster0-nlsdk.mongodb.net/test?retryWrites=true
    .catch(err => console.log(err));

require('./config/passport')(passport);
require('./config/passportG')(passport);


//var aSecret = process.env.cookie;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
        cookie: { maxAge: 180 * 60 * 100 }
}
));

//pasport middleware
app.use(passport.initialize());
app.use(passport.session());


app.use(flash());


//Breadcrumbs
get_breadcrumbs = function(url) {
    var rtn = [{name: "HOME", url: "/"}],
        acc = "", // accumulative url
        arr = url.substring(1).split("/");

    for (i=0; i<arr.length; i++) {
        acc = i !== arr.length-1 ? acc+"/"+arr[i] : null;
        rtn[i+1] = {name: arr[i].toUpperCase(), url: acc};
    }
    return rtn;
};

app.use(function(req, res, next) {
    req.breadcrumbs = get_breadcrumbs(req.originalUrl);
    next();
});

//Global variables
app.use(function (req,res,next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');

    res.locals.session = req.session;

    next();
});


app.use(express.static(path.join(__dirname, 'public')));

// app.use(expressLayouts);

app.use('/', IndexRouter);
app.use('/category', categoryRouter);
app.use('/product',productRouter);
app.use('/users', usersRouter);


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
