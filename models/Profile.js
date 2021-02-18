const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
},
contactphone: {
    type: Number
},
level: {
    type: String,
    required: true
},
coursedetails: {
    type: String,
},
date: {
    type: Date,
    default: Date.now
}
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);