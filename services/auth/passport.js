// //importing passport module
// const passport = require('passport');

// //importing user model
// const User = require('../../models/user.js');

// module.exports = () => {
//     passport.serializeUser((user, done) => {
//         console.log(user);
//         done(null, user.username);
//     });

// passport.deserializeUser((username, done) => {
//     User.findByUserName(username)
//     .then(user => {
//         console.log('user from passport.js', user);
//         done(null, user);
//     })
//     .catch(err => {
//         console.log(err, 'from passport.js');
//         done(err, null);
//     });
// });
// };
