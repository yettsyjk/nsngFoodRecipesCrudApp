// //importing passport module
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// //importing passport file
// const init = require('./passport');

// //importing the user model
// const User = require('../../models/user');

// //importing the auth user model
// const authHelpers = require('./authHelpers');

// //create an option oobject
// const options = {};
// //initializing the passport function to encrypt and decrypt
// init();

// passport.use( new LocalStrategy(options, (username, password, done) =>{
//     User.findByUserName(username)
//     .then(user => {
//         if(!user) {
//             console.log('no user from local.js');
//         return done(null, false);
//     }
//     if(!authHelpers.comparePass(password, user.password)) {
//         console.log('wrong password from local.js');
//         return done(null, false);
//     } else {
//         return done(null, user);
//     }
//     })
//     .catch(err => {
//         console.log(err);
//         return done(err);
//     });
// })
// );
// //export passport
// module.exports = passport;