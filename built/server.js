/// <reference path='../typings/tsd.d.ts' />
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var connectMongo = require('connect-mongo');
var app = express();
var hbs = require('hbs');
var MongoStore = connectMongo(expressSession);
var passportConfig = require('./auth/passport-config');
var restrict = require('./auth/restrict');
passportConfig();
var indexRoute = require('./routes/home');
var aboutRoute = require('./routes/about');
var contactRoute = require('./routes/contact');
var signupRoute = require('./routes/signup');
var usersRoute = require('./routes/users');
var signinRoute = require('./routes/signin');
var sidebarLeftRoute = require('./routes/sidebar-left');
var sidebarRightRoute = require('./routes/sidebar-right');
app.set('views', path.join(__dirname, './../views'));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'your_secret_key',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));
app.use(express.static(path.join(__dirname, './../public')));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', indexRoute);
app.use('/about', aboutRoute);
app.use('/users', usersRoute);
app.use('/contact', contactRoute);
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/sidebar-left', sidebarLeftRoute);
app.use('/sidebar-right', sidebarRightRoute);
app.use('/dashboard', function (req, res, next) {
    res.render('dashboard', { title: 'Dashbaord | Admin' });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var er = new Error('Page Not Found');
    next(er);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var port = process.env.PORT | 3000;
var server = app.listen(port, function () {
    // // truncate Collection
    // mongoose.connection.collections['users'].drop(function(err) {
    // 	console.log('collection dropped');
    // });
    var listeningPort = server.address().port;
    console.log('The server is listening on port: ' + listeningPort);
});
