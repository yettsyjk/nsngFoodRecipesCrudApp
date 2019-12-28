//DEPENDENCIES
const express = require('express');
//set up brcypt package 
const bcrypt = require('bcrypt');
//Classes
const router = express.Router();

//Models, importing bcrypt model
const User = require('../models/user');

//Routes
router.post('/login', async (req, res) => {
    //try this and if that fails send back an error
    try {
        //user login CREATE ROUTE
        const foundUser = await User.fineOne({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
        });
        if(foundUser) {
            if(bcrypt.compareSync(req.body.paswoord, foundUser.password)) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.logged = true;
                //Recipe INDEX ROUTE user gets redirected to localhost:3000/recipes
           res.redirect('/recipes')
            } else {
                req.session.message = 'Username or password is incorrect';
                //HOME INDEX ROUTE user gets redirected to localhost:3000
            res.redirect('/');
        }
    } else {
        req.session.message = 'Username or password is incorrect';
        res.redirect('/');
    }
    } catch (err) {
        res.send(err);
    }
});
//REGISTER CREATE ROUTE
router.post('/registration', async (req, res) => {
    //USERS REGISTER CREATE ROUTE
    //a generated salt combines registration form and hash them to create a hashed password
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    //USERS REGISTER CREATE ROUTE user object efore we create it in the database
    const userDbEntry = {
        username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hash,
    };
try {
const createdUser = await User.create(userDbEntry);
req.session.username = createdUser.username;
req.session.logged = true;
//RECIPES INDEX ROUTE localhost:3000/recipes
res.redirect('/recipes')
} catch (err) {
    res.send(err);
}
})
//Logout INDEX ROUTE
router.get('/logout', (req, res) => {
    //users logout index route destroy the users sessions
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            //home index route
            res.redirect('/');
        }
    })
})
//export controller. Router class is exported to allow other app files to import it
module.exports = router;