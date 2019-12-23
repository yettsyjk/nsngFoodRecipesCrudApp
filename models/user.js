//load mongoose package
const mongoose = require('mongoose');

//use mongoose to creat a Schema
const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true },
    password: { type: String, required: true }
});
//Export Schema
const User = mongoose.model('User', userSchema);

//Export model in controllers
module.exports = User;
