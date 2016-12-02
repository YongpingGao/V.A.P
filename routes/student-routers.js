var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Course = require('../models/course');
var Record = require('../models/record');
var requirments = require("../config/programRequirement");
var ensureAuth = require('../utils');
var planner = require('../common/planner');
var manager = require('../common/courseManage');


router.get('/records', ensureAuth.ensureNormalAuthenticated, function (req, res) {
    var concordiaID = req.user.concordiaID;
    Record.find({concordiaID: concordiaID}, function (err, records) {
        res.render('studentRecords', {
            records: records
        });
    });
});

router.get('/requirement', ensureAuth.ensureNormalAuthenticated, function (req, res) {
    var major = req.user.major;
    var credits = requirments[major];
    Record.find({concordiaID: req.user.concordiaID}, function (err, records) {
        var creditsNow = 0;
        records.forEach(function() {
            creditsNow += 3;
        });
            res.render('requirements', {
                major: major,
                creditsAll: credits,
                creditsLeft: credits - creditsNow,
                creditsNow: creditsNow
        });
    });

});

router.get('/planner', ensureAuth.ensureNormalAuthenticated, function (req, res) {
    Course.find({}, function(err, courses) {
        var profs = [];
        courses.forEach(function (course) {
            if (profs.indexOf(course.professor) == -1) {
                profs.push(course.professor);
            }
        });
        res.render('planner', {
            profs: profs
        });
    });

});

router.post('/planner', ensureAuth.ensureNormalAuthenticated, function (req, res) {
    var id = req.user.concordiaID;
    var order = req.body.order || "1,2,3";
    var priority = order.split(",");
    var preferTime = req.body.time;
    var preferProfessor = req.body.professor;
    var minCourses = req.body.quantity;
    var preferDays = req.body.day;

    console.log("priority: " + priority);console.log("preferTime:" + preferTime);console.log("preferProfessor:" + preferProfessor);
    console.log("minCourses:" + minCourses);console.log("preferDays:" + preferDays);
     planner.filter(id, priority, preferTime, preferDays, preferProfessor, minCourses, function (courses) {
        res.render('plannerResults', {
            courses: courses
        });
    });
});


router.post('/register', ensureAuth.ensureNormalAuthenticated, function (req, res) {
    var courseIDs = req.body.course;

        manager.checkValid(req.user.concordiaID, courseIDs, function (results) {
            if(results == null) {
                res.end('There is a conflict');
            }
            else {
                if(courseIDs instanceof Array) {
                    courseIDs.forEach(function (courseID) {
                        User.update({concordiaID: req.user.concordiaID}, {
                            $push: {courseIDs: courseID},
                        }, function(err) {
                            if(err) {
                                console.log("Error !!!!: " + err);
                            }
                        });
                        console.log("courseIDdsa" + courseID);
                        Course.update({_id: courseID},{
                            $push: {registeredStudent: req.user._id}
                        },function (err) {
                            if(err) {
                                console.log("Error !!!!: " + err);
                            }
                        });

                    });
                } else {
                    User.update({concordiaID: req.user.concordiaID}, {
                        $push: {courseIDs: courseIDs},
                    }, function(err) {
                        if(err) {
                            console.log("Error !!!!: " + err);
                        }
                    });

                    Course.update({_id: courseIDs},{
                        $push: {registeredStudent: req.user._id}
                    },function (err) {
                        if(err) {
                            console.log("Error !!!!: " + err);
                        }
                    });
                }
                res.redirect('/student/schedule');
            }
        });
});

router.get('/schedule', ensureAuth.ensureNormalAuthenticated, function(req, res) {
    Course.find({_id: {
        $in: req.user.courseIDs
    }}, function (err, courses) {
        res.render('schedule', {
            courses: courses
        });
    });
});


router.post('/drop', function(req, res) {
    var courseDropID = req.body.drop;

    User.update({concordiaID: req.user.concordiaID}, {$pull: {
        courseIDs: courseDropID
    }}, function(err) {
        if(err) {
            console.log("Error !!!!: " + err);
        }
    });

    Course.update({_id: courseDropID},{
        $pull: {registeredStudent: req.user._id}
    },function (err) {
        if(err) {
            console.log("Error !!!!: " + err);
        }
    });

    res.redirect('/student/schedule');


});


module.exports = router;