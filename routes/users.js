//importng express
const express = require('express');
const userController = require('../controllers/userControllers.js');
//setting a variable for express router
const userRoutes = express.Router();

//setting route for user profile view
userRoutes.get('/', (req, res) => {
    console.log(req.session);
    console.log('getting user', req.user);
    res.json({
        user: req.user
    });
});
//display user search history
userRoutes.get('/:id', userController.index);

//create new user
userRoutes.post('/', userController.create);

//create new search query
userRoutes.post('/:id', userController.createQuery);

//exporting user routes
module.exports = userRoutes;