//Dependencies setting up variables for node modules
const express = require('express');
//const cookieParser = require('cookie-parser');

const methodOverride = require('method-override');

//importing recipeHelper function 
const recipeHelper = require('./services/recipes/recipeHelpers');

//importing routes
const recipesRoutes = require('./routes/recipeRoutes');
const authRoutes =  require('./routes/auth');
const userRoutes = require('./routes/users')
//setting up port for express to listen for activity
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});
//directing express views
app.set('view engine', 'ejs');

//creating a variable for express function
const app = express();
require('./db/db');
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//controllers
const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);

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
app.get('/search', recipeHelper.getRecipe, (req, res) => {
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
