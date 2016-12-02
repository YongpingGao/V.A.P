var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');
var Course = require('../models/course');
var Record = require('../models/record');
var ensureAuth = require('../utils');

// get - add course
router.get('/addCourse', ensureAuth.ensureAdminAuthenticated, function(req, res) {
    res.render('addCourse');
});

// delete course
router.get('/deleteCourse', ensureAuth.ensureAdminAuthenticated, function(req, res) {
    Course.find({}, function(err, courses) {
        res.render('deleteCourse', {
            courses: courses
        });
    });

});

// post - add course
router.post('/addCourse', ensureAuth.ensureAdminAuthenticated, function(req, res) {
    var course = req.body;
    Course.create({
        courseName: course.courseName,
        courseNumber: course.courseNumber,
        professor: course.professor,
        credits: course.credits,
        section: course.section,
        description: course.description
    }, function(err, course) {
        if (err) {
            console.log("Error creating the course: " + err);
            req.session.error = "A problem occured when creating the course. Please try again.";
        } else {
            console.log("New course created with id: " + course._id);
        }
        res.redirect("/home");
    });
});

// post - delete course
router.post('/deleteCourse', ensureAuth.ensureAdminAuthenticated, function(req, res) {
   var courseIDs = req.body.course;
    if(  courseIDs instanceof Array) {
        courseIDs.forEach(function (id) {
            Course.find({_id: id}).remove().exec();
        });

    } else {
        Course.find({_id: courseIDs}).remove().exec();
    }
    res.redirect('/home');
});

router.get('/addRecords', ensureAuth.ensureAdminAuthenticated, function (req, res) {
    res.render('addRecords');
});

router.post('/addRecords', ensureAuth.ensureAdminAuthenticated, function (req, res) {
    var record = req.body;
    Record.create({
        concordiaID: record.concordiaID,
        year: record.year,
        semester: record.semester,
        courseNumber: record.courseNumber,
        grade: record.grade
    }, function(err, record) {
        if (err) {
            console.log("Error creating the record: " + err);
        } else {
            console.log("New record created with id: " + record._id);
        }
        res.redirect("/admin/addRecords");
    });
});

router.get('/deleteRecords', ensureAuth.ensureAdminAuthenticated, function (req, res) {
    Record.find({}, function(err, records) {
        res.render('deleteRecords', {
            records: records
        });
    });
});

router.post('/deleteRecords', ensureAuth.ensureAdminAuthenticated, function (req, res) {
    var recordIDs = req.body.record;
    if(recordIDs instanceof Array) {
        recordIDs.forEach(function (id) {
            Record.find({_id: id}).remove().exec();
        });

    } else {
        Record.find({_id: recordIDs}).remove().exec();
    }
    res.redirect('/home');
});

module.exports = router;
