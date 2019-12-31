//importing express
const express = require('express');

//importing users controllers
const controller = require('../controllers/userController');

//setting variable for express router
const router = express.Router();
//importing authHelper
const authHelpers = require('../services/auth/authHelpers.js');
const passport = require('../services/auth/local.js');

//this function test of the if the login function works and displays the request
test = (req, res, next) => {
    console.log('testing', req.body);
    next();
};


//setting up route for the user registration view
//this function redirects login failed and sends failure message to the client
router.get('/login', (req, res) => {
    res.json({
        messgae: 'login failed'
    })
});

//this function send user info back to client after success in register
// router.get('/register', (req, res) => {
//     res.render('auth/login.ejs', {
//         documentTitle: `NSNG - Welcome back, ${username}`,
//         message: 'User Login',
//     });
// });
router.get('/register', (req, res) => {
res.json(res);
    });
    
    //setting up route for user logout function and redirects to the home page
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    });

//setting up route for create user function
router.post('/register', test, controller.create);

//this function takes username and password from login page and matches
//it to the database. On success it reroutes to the userdashboard, on failure it redirects 
//back to the login page
//
router.post('/login',
passport.authenticate('local', {
    successRedirect: '/api/recipes',
    failureRedirect: '/auth/login',
    failureFlash: false,
    })
);

//export router
module.exports = router;