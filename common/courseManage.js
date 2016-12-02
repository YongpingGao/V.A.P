var Course = require('../models/course');
var User = require('../models/user');
var helper = require('../helper');
function checkCourseDuplicate(courseIDs, done) {
    var courseNumbers = [];
    Course.find({_id: {
        $in: courseIDs
    }}, function (err, courses) {
        if(courses instanceof Array) {
            courses.forEach(function (course) {
                courseNumbers.push(course.courseNumber);
            });
           if(helper.hasDuplicates(courseNumbers)) done(null);
           else done(courseIDs);
        } else done(courseIDs);
    });
}

function checkCourseOverlap(courseIDs, done) {
    var courseTimes = [];
    Course.find({_id: {
        $in: courseIDs
    }}, function (err, courses) {
        if(courses instanceof Array) {
            courses.forEach(function (course) {
                courseTimes.push(course.time.when[0]);
            });
            if(helper.hasDuplicates(courseTimes)) done(null);
            else done(courseIDs);
        } else done(courseIDs);
    });
}

function checkAlreadyEnrolled(concordiaID, courseIDs, done) {
    var registerCourseNumbers = [];
    var courseNumbers = [];
    var courseTimes = [];
    var registerCourseTimes = [];
    User.findOne({concordiaID: concordiaID}, function (err, user) {
        var registeredCourseIDs = user.courseIDs;
        Course.find({_id: {
            $in: registeredCourseIDs
        }}, function (err, courses) {
            if (courses instanceof Array) {
                courses.forEach(function (course) {
                    registerCourseNumbers.push(course.courseNumber);
                    registerCourseTimes.push(course.time.when[0]);
                });
                Course.find({
                    _id: {
                        $in: courseIDs
                    }
                }, function (err, courses) {
                    if (courses instanceof Array) {
                        courses.forEach(function (course) {
                            courseNumbers.push(course.courseNumber);
                            courseTimes.push(course.time.when[0]);
                        });
                        console.log("courseNumbers" + courseNumbers);
                        var allCoursesNumber = registerCourseNumbers.concat(courseNumbers);
                        var allCoursesTimes = registerCourseTimes.concat(courseTimes);
                        if (helper.hasDuplicates(allCoursesNumber)) done(null);
                        else if (helper.hasDuplicates(allCoursesTimes)) done(null);
                        else done(courseIDs);
                    } else done(courseIDs);
                });
            }
        });
    });
}

function checkValid(concordiaID, courseIDs, done) {
    checkCourseDuplicate(courseIDs, function (cb1) {
        if(cb1 == null) {
            done(null);
        }

        checkCourseOverlap(courseIDs, function (cb2) {
                if(cb2 == null) {
                    done(null);
                }

                checkAlreadyEnrolled(concordiaID, courseIDs, function (cb3) {
                    if(cb3 == null) {
                        done(null);
                    } else done(courseIDs);
                });
            });

    });
}

exports.checkValid = checkValid;