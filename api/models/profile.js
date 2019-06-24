const mongoose = require('mongoose');

const ProfileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    emailId: String,
    phoneNumber: Number,
    designation: String,
    summary: String,
    DOB: String,

});

module.exports = mongoose.model('Profile', ProfileSchema);