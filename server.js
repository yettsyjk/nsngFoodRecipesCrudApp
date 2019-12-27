
//Dependencies setting up variables for node modules
const express = require('express');
//creating variable for express function
const app = express();

const methodOverride = require('method-override');

//create connection to the db server
require('./db/db.js');
require('dotenv').config();

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
//setting up method override module to run on http method key 
app.use(methodOverride('_method'));

//CONTROLLERS
//recipesControllers is given export router class
const recipesControllers = require('./controllers/recipes');
app.use('/recipes', recipesControllers);
console.log('connected recipesController');
//directing app to use fpr recipe URL routes
//userControllers export router 
const usersControllers = require('./controllers/users');
app.use('/controllers', usersControllers);
//home index method is GET matching url path '/'
app.get('/', (req, res) => {
    //'home index mathcing route found
    res.render('/index.ejs')
});


//setting up port for express to listen for activity
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});