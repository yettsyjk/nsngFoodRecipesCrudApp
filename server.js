
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
//importing recipeHelper function for the search view
// const recipeHelpers = require('services');
const recipeRoutes = require('../routes/');
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
    //'home index mathcing route found
    res.render('./index.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        subTitle: 'Enjoy eating again',
        message: req.session.message,
        logged: req.session.logged
    })
});
//setting up the search page route
app.get('/search', (req, res) => {
    res.render('search', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        subTitle: 'Enjoy eating again',
        message: req.session.message,
        recipeHits: res.locals.recipeHits,
    });
});
//Directing app to use recipeRoutes for all recipes urls
app.get('/recipes', recipeRoutes);
//directing app to use authRoutes for user authentication
app.get('/auth', authRoutes);
//directing app to use userRoutes for users
app.get('/user', userRoutes);

app.get('*', (req, res) => {
    res.status(404).send({message: 'Oops Something Went Wrong'});
});


//setting up port for express to listen for activity
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
