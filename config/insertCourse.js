var document = {
    courseName: "OBJ-ORIENTED PROGRAMMING I",
    courseNumber: "COMP248",
    professor: "Todd Eavis",
    credits: 3,
    time: {
        year: 2016,
        semester: "Summer",
        when: ["Monday 1:30PM - 4:00PM", "Wednesday 1:30PM - 4:00PM"],
    },
    section: "AA",
    preq: null,
    description: "Introduction to programming. Basic data types, variables, expressions, assignments, control flow. " +
    "Classes, objects, methods. Information hiding, public vs. private visibility, data abstraction and encapsulation. References. " +
    "Arrays. Lectures: three hours per week. Tutorial: two hours per week. Laboratory: one hour per week.",
    registeredStudent: []
};

var document = {
    courseName: "OBJ-ORIENTED PROGRAMMING I",
    courseNumber: "COMP248",
    professor: "Nancy Acemian",
    credits: 3,
    time: {
        year: 2016,
        semester: "FALL",
        when: ["Thursday 5:45PM - 8:15PM"],
    },
    section: "EE",
    preq: null,
    description: "Introduction to programming. Basic data types, variables, expressions, assignments, control flow. " +
    "Classes, objects, methods. Information hiding, public vs. private visibility, data abstraction and encapsulation. References. " +
    "Arrays. Lectures: three hours per week. Tutorial: two hours per week. Laboratory: one hour per week.",
    registeredStudent: []
};

var document = {
    courseName: "Object-Oriented Programming II ",
    courseNumber: "COMP249",
    professor: "Nora Houari",
    credits: 3,
    time: {
        year: 2016,
        semester: "SUMMER",
        when: ["Monday 3:30PM - 6:00PM", "Wednesday 3:30PM - 6:00PM"],
    },
    section: "CC",
    preq: "COMP248",
    description: " Design of classes. Inheritance. Polymorphism. Static and dynamic binding. Abstract classes. Exception handling. " +
    "File I/O. Recursion. Interfaces and inner classes. Graphical user interfaces. Generics. " +
    "Collections and iterators. Lectures: three hours per week. Tutorial: two hours per week. Laboratory: one hour per week.",
    registeredStudent: []
};

var document = {
    courseName: "Object-Oriented Programming II ",
    courseNumber: "COMP249",
    professor: "Nagi Basha",
    credits: 3,
    time: {
        year: 2016,
        semester: "Winter",
        when: ["Monday 8:45AM - 10:00AM", "Wednesday 8:45AM - 10:00AM"],
    },
    section: "S",
    preq: "COMP248",
    description: " Design of classes. Inheritance. Polymorphism. Static and dynamic binding. Abstract classes. Exception handling. " +
    "File I/O. Recursion. Interfaces and inner classes. Graphical user interfaces. Generics. " +
    "Collections and iterators. Lectures: three hours per week. Tutorial: two hours per week. Laboratory: one hour per week.",
    registeredStudent: []
};

db.courses.insert(document);

var document = {
    courseName: "Object-Oriented Programming II ",
    courseNumber: "COMP249",
    professor: "Aiman Latif Hanna",
    credits: 3,
    time: {
        year: 2016,
        semester: "FALL",
        when: ["Monday 2:45AM - 4:00AM", "Wednesday 2:45AM - 4:00AM"],
    },
    section: "D",
    preq: "COMP248",
    description: " Design of classes. Inheritance. Polymorphism. Static and dynamic binding. Abstract classes. Exception handling. " +
    "File I/O. Recursion. Interfaces and inner classes. Graphical user interfaces. Generics. " +
    "Collections and iterators. Lectures: three hours per week. Tutorial: two hours per week. Laboratory: one hour per week.",
    registeredStudent: []
};

db.courses.insert(document);

var document = {
    courseName: "INTRO/THEORETICAL COMP SCI",
    courseNumber: "COMP335",
    professor: "Nematollaah Shiri Varnaamkhaasti",
    credits: 3,
    time: {
        year: 2016,
        semester: "Fall",
        when: ["Tuesday 1:15PM - 2:30PM", "Thursday 1:15PM - 2:30PM"],
    },
    section: "G",
    preq: "COMP232",
    description: " Finite state automata and regular languages. Push-down automata and context-free languages. Pumping lemmas. " +
    "Applications to parsing. Turing machines. Unde­cidability and decidability. Lectures: three hours per week. Tutorial: one hour per week.",
    registeredStudent: []
};

db.courses.insert(document);

