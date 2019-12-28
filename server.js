
//Dependencies setting up variables for node modules
const express = require('express');
//creating variable for express function
const app = express();

const methodOverride = require('method-override');
//express-session package allows server to store data to access across requests
const session = require('express-session');
//create connection to the db server
require('./db/db');
require('dotenv').config();

//MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
//setting up method override module to run on http method key 
app.use(methodOverride('_method'));
app.use(session({
    //secret key opens session This is stored on the server
    secret: "random secret string",
    //only save the session is a session property is added or mutated
    resave: false,
    //only save the cookie when property is added to the session. to comply with LAW
    saveUninitialized: false
}))

//CONTROLLERS
//recipesControllers is given export router class
const recipesControllers = require('./controllers/recipes');
app.use('/recipes', recipesControllers);
console.log('connected recipesController');
//directing app to use fpr recipe URL routes
//userControllers export router 
const usersControllers = require('./controllers/users');
app.use('/controllers', usersControllers);
//seedController exported router class in teh seed controller
const seedController = require('./controllers/seed.js');
app.use('/seed', seedController);

//home index method is GET matching url path '/'
app.get('/', (req, res) => {
    //'home index mathcing route found
    res.render('./index.ejs', {
        message: req.session.message,
        logged: req.session.logged
    })
});


//setting up port for express to listen for activity
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});