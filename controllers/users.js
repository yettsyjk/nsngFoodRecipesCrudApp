//dependencies
const express = require('express');
//set up brcypt package 
const bcrypt = require('bcryptjs');
//Classes
const router = express.Router();

//Models, importing bcrypt model
const User = require('../models/user');

const controller = {};

//Routes
//Login Route
controller.create = (req, res, next) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);
    
    User.create({
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
    })
    .then(user => {
        req.login(user, err => {
            if(err)return next(err);
            res.redirect('/recipes');
        });
    })
    .catch(err => {
        res.status(500).json(err);
    });
};

//export controller
module.exports = controller;