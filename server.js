
//Dependencies setting up variables for node modules
const express = require('express');

const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
//create connection to the db server
require('./db/db.js');
//importing dotenv config function
require('dotenv').config();
//creating variable for express function
const app = express();

//CONTROLLERS
//importing recipeHelper function 
const recipeHelpers = require('./services/recipes/recipeHelpers.js');

//importing routes
const recipesRoutes = require('./routes/recipeRoutes');
const authRoutes =  require('./routes/auth.js');
const userRoutes = require('./routes/users.js');


//creating a variable for express function
//MIDDLEWARE
//directing express views
app.set('views', path.join(__dirname, 'views'));
//express view file type
app.set('view engine', 'ejs');
//setting up direction for express to static files
app.use('/static', express.static(path.join(__dirname, 'public')));
//setting up morgan logger function to run dev script
app.use(logger('dev'));
//setting up the cookie parser module
app.use(cookieParser());
//setting up the body parser function to run json info
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//setting up method override module to run on http method key 
app.use(methodOverride('_method'));
//setting up the express session module
app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true
}));
//setting up passport module
app.use(passport.initialize());
app.use(passport.session());

//setting up the route to the index page
app.get('/', (req, res) => {
    //home index route
    res.render('index.ejs', {
        documentTitle: "No Sugars No Grains Food Recipes",
        subTitle: "Putting Life back in Lifestyle",
        message: "nsng Food Recipes,"
    });
});
//search page route setup
app.get('/search', recipeHelpers.getRecipe, (req, res) => {
    res.render('search', {
        documentTitle: "No Sugars No Grains Food Recipes",
        message: "Brought To You By: ",
        recipeHits: res.locals.recipeHits,
    });
});
//directing app to use fpr recipe URL routes
app.use('/recipes', recipesRoutes);
//directing app to use authRoutes for authenticating the user
app.use('/auth', authRoutes);
//user will use userRoute
app.use('/user', userRoutes);
//404 error
app.get('*', (req, res) => {
    res.status(404).send({message: 'Oops Something Went Wrong'});
});

//setting up port for express to listen for activity
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});