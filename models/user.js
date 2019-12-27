
const mongoose =  require('mongoose');
//
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//create a model object
const User = mongoose.model('User', userSchema);

//export user model
module.exports = User;