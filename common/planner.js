var helper = require('../helper');
var Course = require('../models/course');
var Record = require('../models/record');



function filter(id, priority, preferTimes, preferDays, preferProfs, minCourses, done) {
    Course.find({}, function(err, courses) {
        takenCoursesFilter(id, courses, function (untakenCourses) {
            courses = untakenCourses;
            while(priority.length != 0) {
                switch(priority.shift()) {
                    case "1": // time slot
                        if(courses.length <= minCourses) break;
                        timeFilter(untakenCourses, preferTimes, function (coursesFilteredByTime) {
                            courses = coursesFilteredByTime;
                        });
                        break;
                    case "2": // day
                        if(courses.length <= minCourses) break;
                        dayFilter(courses, preferDays, function (coursesFilteredByDay) {
                            courses = coursesFilteredByDay;
                        });
                        break;
                    case "3": // professor
                        if(courses.length <= minCourses) break;
                        professorFilter(courses, preferProfs, function (coursesFilteredByProf) {
                            courses =  coursesFilteredByProf;
                        });
                        break;
                    default:
                        console.log("nothing...");
                        break;
                }
            }
            done(courses);
        });

    });
}

function takenCoursesFilter(id, courses, done) {
    var temp = [];
    var found = false;
    Record.find({concordiaID: id}, function(err, records) {
        if(courses instanceof Array) {
            courses.forEach(function (course) {
               records.forEach(function (record) {
                   if(course.courseNumber == record.courseNumber) {
                       found = true;
                   }
               });
                if(!found) {
                    temp.push(course);

                }
                found = false;
            });
        }
        done(temp);
    });
}

//
var timeFilter = function(courses, preferTimes, done) {
    var temp = [];
    if(courses instanceof Array) {
        courses.forEach(function(course) {
            var times = course.time.when;
            var time = times[0];

            var vals = time.split(' ');
            var startTime = vals[1];
            var range = helper.getTimeRange(startTime); // "Morning", "Afternoon"...

            if(preferTimes instanceof Array) {
                var i = preferTimes.indexOf(range);
                if(i != -1) {
                    temp.push(course);
                }
            } else {
                    if(preferTimes == range) {
                        temp.push(course);
                    }
                }

        });
        if(preferTimes)   done(temp);
        else done(courses);

    } else {
        var times = courses.time.when;
        var time = times[0];
        var vals = time.split(' ');
        var startTime = vals[1];
        var range = helper.getTimeRange(startTime); // "Morning", "Afternoon"...

        if(preferTimes instanceof Array) {
            var i = preferTimes.indexOf(range);
            if(i != -1) {
                temp.push(courses);
            }
        } else {
            if(preferTimes == range) {
                temp.push(courses);
            }
        }
        if(preferTimes)   done(temp);
        else done(courses);
    }
};

var dayFilter = function(courses, preferDays, done) {
    var temp = [];
    var found = false;
    if(courses instanceof Array) {
        courses.forEach(function(course) {
            var times = course.time.when;
            var days= [];
            times.forEach(function (time) {
                var vals = time.split(' ');
                days.push(vals[0]);
            });
            if(preferDays instanceof Array) {
                days.forEach(function (day) {
                    if(preferDays.indexOf(day) != -1) {
                        found = true;
                    }
                });
            } else {
                days.forEach(function (day) {
                    if(preferDays == day) {
                        found = true;
                    }
                });
            }
            if(found) temp.push(course);
        });
        if(preferDays)   done(temp);
        else done(courses);
    } else {
        var times = courses.time.when;
        var days= [];
        times.forEach(function (time) {
            var vals = time.split(' ');
            days.push(vals[0]);
        });
        if(preferDays instanceof Array) {
            days.forEach(function (day) {
                if(preferDays.indexOf(day) != -1) {
                    temp.push(courses);
                }
            });
        } else {
            days.forEach(function (day) {
                if(preferDays == day) {
                    temp.push(courses);
                }
            });
        }
        if(preferDays)   done(temp);
        else done(courses);
    }
};

var professorFilter = function(courses, preferProfs, done) {

    var temp = [];
    if(courses instanceof Array) {
        courses.forEach(function (course) {
            var prof = course.professor.split(' ')[0];
            if(preferProfs instanceof Array) {
                preferProfs.forEach(function (preferProf) {
                    if(preferProf == prof) {
                        temp.push(course);
                    }
                });
            } else {
                if(preferProfs == prof) {
                    temp.push(course);
                }
            }
        });
        if(preferProfs)   done(temp);
        else done(courses);
    }
};

exports.filter = filter;




