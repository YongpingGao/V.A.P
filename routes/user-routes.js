var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    req.flash('loginMessage', 'You must log in to see this page.');
    res.redirect('/login');
}



// login in general - get
router.get('/login', function(req, res) {
    res.render('login', {
        message: req.flash("loginMessage")
    });
});
// local signup - get
router.get('/signup', function(req, res) {
    res.render('signup', {
        message: req.flash('signupMessage')
    });
});
// local signup - post
router.post('/signup', passport.authenticate('local-signup',
    {
        successRedirect : '/home',
        failureRedirect : '/signup',
        failureFlash : true
    }
));
// login: local - post
router.post('/login', passport.authenticate('local-login',
    {
        successRedirect : '/home',
        failureRedirect : '/login',
        failureFlash : true
    }
));

router.get('/home', ensureAuthenticated, function (req, res) {

    res.render('home', {
        user: req.user
    });
});

router.get('/profile', ensureAuthenticated, function(req, res) {
    res.render('profile', {
        user: req.user
    });
});



// logout
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect('/');
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // var json = JSON.stringify({
    //     'success': true
    // });
    // res.end(json);
});



// // for administrator
// // router.get("/", function(req, res, next) {
// //     User.find()
// //         .sort({createdAt: "descending"})
// //         .exec(function(err, users) {
// //             if(err) return next(err);
// //             res.render("index", {users: users});
// //         });
// // });

//
//
// router.get("/users/:username", function(req, res, next){
//     User.findOne({username: req.params.username}, function(err, user) {
//         if(err) return next(err);
//         if(!user) return next(404);
//         res.render("profile", {user: user});
//     });
// });
//



//
// router.get("/edit", ensureAuthenticated, function(req, res) {
//     res.render("edit");
// });
//
//
// router.post("/edit", ensureAuthenticated, function(req, res, next){
//     req.user.displayName = req.body.displayName;
//     req.user.bio = req.body.bio;
//     req.user.save(function(err) {
//         if(err) {
//             next(err);
//             return;
//         }
//         req.flash("info", "Profile updated!");
//         res.redirect("/edit");
//     });
// });
//
//

//







module.exports = router;
