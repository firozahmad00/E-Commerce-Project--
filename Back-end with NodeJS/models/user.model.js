const mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    password: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpiry: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    username: {
        type: String
    },
    googleId: {
        type: String
    }
});
userSchema.plugin(passportLocalMongoose);
module.exports = {userSchema, userModel: mongoose.model('user', userSchema)};