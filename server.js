require('./db/db');
//Dependencies setting up variables for node modules
const express = require('express');

const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
//importing dotenv config function
require('dotenv').config();
//creating variable for express function
const app = express();

//importing recipeHelper function 
const recipeHelpers = require('./services/recipes/recipeHelpers.js');

//importing routes
const recipesRoutes = require('./routes/recipeRoutes.js');
const authRoutes =  require('./routes/auth.js');
const userRoutes = require('./routes/users.js');


//setting up port for express to listen for activity
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
//creating a variable for express function

//middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
//setting up the morgan logger
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(methodOverride('_method'));
// app.use(session({
//     secret: process.env.SECRET_KEY,
//     resave: false,
//     saveUninitialized: true
// }));
//setting up passport module
app.use(passport.initialize());
app.use(passport.session());

//home index
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
        message: "Brought To You By",
        recipeHits: res.locals.recipeHits,
    });
});
//directing URL routes
app.use('/recipes', recipesRoutes);
//directing app to use authRoutes for authenticating the user
app.use('/auth', authRoutes);
//user will use userRoute
app.use('/user', userRoutes);
//404 error
app.get('*', (req, res) => {
    res.status(404).send({message: 'Oops Something Went Wrong'});
});
