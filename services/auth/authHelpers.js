//importing bcrypt module
const bcrypt = require('bcryptjs');

//creating function comparing password
function comparePass(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}
//creating function requiring loginif user not already logged in
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