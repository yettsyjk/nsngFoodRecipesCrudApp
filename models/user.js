//importing promise
const db = require('../db/db.js');

//create a model object
const User = {};

//create method find username in db
User.findByUserName = userName => {
    return db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
};


//creating method t create a new user 
User.create = user => {
    return db.one(`INSERT INTO users(username, first_name, last_name, email, password)VALUES($1, $2, $3, $4, $5)RETURNING*`,[user.username, user.first_name, user.last_name, user.email, user.password]
    );
};
//export user model
module.exports = User;