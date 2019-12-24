//importing express
const express = require('express');

//importing users controllers
const controller = require('../controllers/users.js');

//setting variable for express router
const router = express.Router();
//importing authHelper
const authHelpers = require('../services/auth/authHelpers');
const passport = require('../services/auth/local');

//setting up route for the user registration view
router.get('/register', (req,res) => {
    res.render('auth/register', {
        documentTitle: `NSNG - New Recipe`,
        message: 'User Registration',
    });
});

//setting up route for create user function
router.post('/register', controller.create);
router.post('/login',
passport.authenticate('local', {
    successRedirect: '/recipes',
    failureRedirect: '/auth/login',
    failureFlash: false,
})
);
//setting up route for user logout function
router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
});

//export router
module.exports = router;