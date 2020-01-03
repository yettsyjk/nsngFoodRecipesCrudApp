
const mongoose = require('mongoose');
// // importing pg-promise
// const db = require('../db/db');

// // creating a model object
// const Users = {};
//Use Mongoose to create a schema (models/user.js)
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//create a model object
const User = mongoose.model('User', userSchema);

// //Commenting out SQL pg promise due to not working creating a method to find the username in the database
// Users.findByUserName = userName => {
//     return db.oneOrNone('SELECT * FROM users WHERE username = $1', [userName]);
//   };
  
//   // creating a method to create a new user 
//   Users.create = user => {
//     return db.one(
//       `
//         INSERT INTO users
//         (username, first_name, last_name, email, password)
//         VALUES ($1, $2, $3, $4, $5) RETURNING *
//       `,
//       [user.username, user.first_name, user.last_name, user.email, user.password]
//     );
//   };
  

//export user model
module.exports = User;
// module.exports = Users;