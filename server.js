#!/usr/bin/env node
var debug = require('debug')('expressapp');
//stuff is below instead var app = require('../app');


var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

//db + model or models *singular grammar pls
var db = require('./model/db'),
    blob = require('./model/blobs'),
    portfolio = require('./model/portfolio'),
    press = require('./model/press'),
    product = require('./model/product');

//load router  - views inside watch pluralisms
var routes = require('./routes/index'),
    blobs = require('./routes/blobs'),
    press = require('./routes/press'),
    portfolio = require('./routes/test_portfolio'),
    product = require('./routes/product');

//var users = require('./routes/users');

var app = express();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use the router
app.use('/', routes);
app.use('/blobs', blobs);
app.use('/portfolio', portfolio);
app.use('/press', press);
app.use('/product', product);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
require('dotenv').config()

