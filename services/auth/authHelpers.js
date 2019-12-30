//importing bcrypt module
const bcrypt = require('bcrypt');

//creating function comparing password to password in database
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}
//creating function requiring login if user not already logged in
function loginRequired(req, res, next) {
    if(!req.user){
        return res.redirect('/auth/login');
    }
    return next();
}
//exporting helper function
module.exports = {
    comparePass, loginRequired,
};