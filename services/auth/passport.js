//importing passport module
const passport = require('passport');

//importing user model
const User = require('../../models/user');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.username);
    });
}
passport.deserializeUser((username, done) => {
    User.findByUserName(username)
    .then(user => {
        done(null, user);
    })
    .catch(err => {
        done(err, null);
    });
});
