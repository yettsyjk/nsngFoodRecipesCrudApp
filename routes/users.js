//importng express
const express = require('express');
//setting a variable for express router
const userRoutes = express.Router();

//setting route for user profile view
userRoutes.get('/', (req, res) => {
    res.json({
        user: 'user profile page placeholder', userInfo: req.user
    });
});

//exporting user routes
module.exports = userRoutes;