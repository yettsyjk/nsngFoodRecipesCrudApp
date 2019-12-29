
//Dependencies setting up variables for node modules
const express = require('express');
const path = require('path');
//creating variable for express function
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
//express-session package allows server to store data to access across requests
const session = require('express-session');
const passport = require('passport');

//create connection to the db server
require('./db/db');
require('isomorphic-fetch');
require('dotenv').config();
//directing express views
//here you set that all the templates are located in `/views` directory
app.set('views', path.join(__dirname, '/views'));
//here you set that you are using `ejs` template engine and the
//default extension is `ejs`
app.set('view engine', 'ejs');

//MIDDLEWARE
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//directing exprss to static files
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
//setting up the passport module
app.use(passport.initialize());
app.use(passport.session());
//importing recipeHelper function for the search view
// const recipeHelpers = require('../services/recipes/recipeHelpers.js');
// console.log('connected recipeHelpers');
// const recipeRoutes = require('./controllers/recipes');
// //Directing app to use recipeRoutes for all recipes urls
// app.use('/routes', recipeRoutes);
// const authRoutes = require('/routes/auth');
// const userRoutes = require('/routes/users');

//CONTROLLERS
//recipesControllers is given export router class
const recipesControllers = require('./controllers/recipes');
app.use('/recipes', recipesControllers);
console.log('connected recipesController');
//directing app to use fpr recipe URL routes
//userControllers export router 
const usersControllers = require('./controllers/users');
app.use('/auth', usersControllers);
//seedController exported router class in teh seed controller
const seedController = require('./controllers/seed.js');
app.use('/seed', seedController);






//ROUTES
//home index method is GET matching url path '/'
app.get('/', (req, res) => {
    //'home index matching route found
    res.render('auth/register.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        subTitle: 'Enjoy eating again',
        message: req.session.message,
        logged: req.session.logged
    })
});
//Login Page ROUTE
app.get('auth/register', (req, res) => {
    //'home index matching route found
    res.render('auth/login.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        subTitle: 'Enjoy eating again',
        message: req.session.message,
        logged: req.session.logged
    })
});
app.use('/auth', (req, res) => {
    //'home index matching route found
    res.render('auth/login.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        subTitle: 'Enjoy eating again',
        message: req.session.message,
        logged: req.session.logged
    })
});
//setting up the search page route
app.get('/:search', (req, res) => {
    res.render('search.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        subTitle: 'Enjoy eating again',
        message: req.session.message,
        recipeHits: res.locals.recipeHits,
    });
});
// //directing app to use authRoutes for user authentication
// app.use('/auth', authRoutes);
// //directing app to use userRoutes for users
// app.use('/user', userRoutes);

app.get('*', (req, res) => {
    res.status(404).send({message: 'Oops Something Went Wrong'});
});


//setting up port for express to listen for activity
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});

module.exports = app;