var moment = require('moment');

var format = "h:mmA"; //1:30PM
var timeMap = {
    "MorningStartTime": "8:00AM",
    "MorningEndTime": "12:00PM",
    "AfternoonStartTime": "12:01PM",
    "AfternoonEndTime": "5:00PM",
    "EveningStartTime": "5:01PM",
    "EveningEndTime": "11:59PM"
};

function getTimeRange(time) {
    var startTime = moment(time, format);
    var morningTime = moment(timeMap.MorningStartTime, format);
    var afternoonTime = moment(timeMap.AfternoonStartTime, format);
    var eveningTime = moment(timeMap.EveningStartTime,format);

    if((eveningTime <= startTime)) {
        return "Evening";
    }
    if((afternoonTime <= startTime)) {
        return "Afternoon";
    }
    if((morningTime <= startTime)) {
        return "Morning";
    }
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}



// console.log(getTimeRange("11:45PM"));

exports.getTimeRange = getTimeRange;
exports.hasDuplicates = hasDuplicates;