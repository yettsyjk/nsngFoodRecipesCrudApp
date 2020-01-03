//-------DEPENDENCIES--------//
const express = require('express');
//set up brcypt package 
const bcrypt = require('bcrypt');
//----Classes----------//
const router = express.Router();
// const userController = {};


const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');
//--------------------------Routes-----------//
//-----User will only require a Registration Route, a Login Route and a LogOut Roue--------///
//-----------LOGIN CREATE ROUTE----------//
//router to post refers to application endpoint URI's respond to client request
router.post('/login', async (req, res) => {
    //try this and if that fails send back an error
    try {
        //user login CREATE ROUTE
        // console.log(req.body)
        const foundUser = await User.findOne({
            username: req.body.username
        });
        // console.log(req.session)
        if(foundUser) {
            // console.log("attempting verification", Date.now(), foundUser)
            const userTest = bcrypt.compareSync(req.body.password, foundUser.password);
            // console.log(userTest);
            if(userTest) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.id = foundUser._id;
                req.session.logged = true;
                //Recipe INDEX ROUTE user gets redirected to localhost:3000/recipes
                res.redirect('/recipes')
            } else if (userTest === false){
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
//----------REGISTER CREATE ROUTE----------------//
router.post('/registration', async (req, res) => {
    console.log('this is hitting the user registration')
    //USERS REGISTER CREATE ROUTE
    //a generated salt combines register form and hash them to create a hashed password
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    //USERS REGISTER CREATE ROUTE user object efore we create it in the database
    const userDbEntry = {
        //using req.sessions matches the 
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
    };
    try {
        const createdUser = await User.create(userDbEntry);
        //USERS REGISTER CREATE ROUTE
        //imported model is used to find creat a new user in the users collection using the new user object (userDBEntry)
        //store it in a variable
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

module.exports = router;
