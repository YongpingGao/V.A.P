var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    concordiaID: {type: Number, unique: true},
    username: String,
    email: String,
    password: String,
    major: String,
    role: String,
    courseIDs:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    createdAt: {type: Date, default: Date.now}
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


var User = mongoose.model("User", userSchema);
module.exports = User;

