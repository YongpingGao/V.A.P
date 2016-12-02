var mongoose = require('mongoose');


var recordSchema = mongoose.Schema({
    concordiaID: Number,
    year: Number,
    semester: String,
    courseNumber: String,
    grade: String
});

recordSchema.statics.getAllRecordsFromStu = function(concordiaID, cb) {
    return this.find({concordiaID: concordiaID}, cb);
};


var record = mongoose.model("Record", recordSchema);
module.exports = record;

