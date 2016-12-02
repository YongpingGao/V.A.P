// db.users.update({concordiaID: 3828064}, {$push: {takenCourses: "COMP232"}});

var document = {
    concordiaID: 7289673,
    year: 2016,
    semester: "SUMMER",
    courseNumber: "COMP232",
    grade: "A+"
};
db.records.insert(document);

var document = {
    concordiaID: 7289673,
    year: 2016,
    semester: "SUMMER",
    courseNumber: "COMP248",
    grade: "B-"
};
db.records.insert(document);


