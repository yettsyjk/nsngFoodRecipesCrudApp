//dependencies
const express = require('express');
//set up brcypt package 
const bcrypt = require('bcrypt');
//Classes
const router = express.Router();

//Models, importing bcrypt model
const User = require('../models/user');

//Routes
//Login Route
router.post('/login', async (req, res) => {
   // try this part if fails return error
   try {
       //user login create route
       const foundUser = await User.findOne( { username: req.body.username});
       if(foundUser){
           //if user is found with that username, then compare the password from the form data
           if(bcrypt.compareSync(req.body.password, foundUser.password)) {
               res.redirect('/recipes')
           } else {
               res.redirect('/');
           }
           } else {
               res.redirect('/');
           }
   }  catch (err) {
       res.send(err);
   }
});

//Create Register Route
router.post('/registration', async (req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

const userDbEntry = {
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: passwordHash,
    email: req.body.email
};
try {
    const createdUser = await User.create(userDbEntry);
    res.redirect('/recipes')
} catch (err) {
    res.send(err);
}
})
//export controller
module.exports = router;