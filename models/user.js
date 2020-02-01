
const mongoose = require('mongoose');

// const db = require('../db/db');

//Use Mongoose to create a schema (models/user.js)
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    },
});

//create a model object
const User = mongoose.model('User', userSchema);



  

//export user model
module.exports = User;
// module.exports = Users;