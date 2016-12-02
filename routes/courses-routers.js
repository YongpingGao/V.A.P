var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Course = require('../models/course');
var ensureAuth = require('../utils');


router.get('/all', ensureAuth.ensureNormalAuthenticated, function (req, res) {
    Course.find({}, function(err, courses) {
        res.render('allCourses', {
            courses: courses
        });
    });
});



module.exports = router;
