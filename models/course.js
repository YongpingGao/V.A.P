var mongoose = require('mongoose');


var courseSchema = mongoose.Schema({
    courseName: String,
    courseNumber: String,
    professor: String,
    credits: Number,
    time: {
        year: String,
        semester: String,
        when: [String],
    },
    section: String,
    preq: String,
    description: String,
    registeredStudent: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});



var course = mongoose.model("Course", courseSchema);
module.exports = course;

