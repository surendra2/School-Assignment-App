const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: String,
    userType: String,
    password: String,
    userClass: String,
    section: String,
})

module.exports = mongoose.model('User', userSchema)