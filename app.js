var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var passport = require("passport");
var mongoose = require('mongoose');
var db = require('./config/database');

var userRouters = require('./routes/user-routes');
var adminRouters = require('./routes/admin-routers');
var coursesRouters = require('./routes/courses-routers');
var studentRouters = require('./routes/student-routers');
var app = express();

// setup db
mongoose.connect(db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("MongoDB is Connected!");
});

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('port', process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(flash());

// passport
require('./common/passport')(passport); // pass passport for configuration

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.errors = req.flash("error");
    res.locals.infos = req.flash("info");
    next();
});

app.use(userRouters);
app.use('/admin', adminRouters);
app.use('/course', coursesRouters);
app.use('/student', studentRouters);

app.get('/', function (req, res) {
    res.redirect('/home');
});
// others, return 404
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});





// set listening port
app.listen(app.get('port'), function () {
    console.log("listening at " + app.get('port'));
});
