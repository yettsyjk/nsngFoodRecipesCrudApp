
//Dependencies setting up variables for node modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
//express-session package allows server to store data to access across requests
const session = require('express-session');
const passport = require('passport');
//creating variable for express function
const app = express();
const routes = express.Router();
//create connection to the db server
require('./db/db');
require('isomorphic-fetch');
require('dotenv').config();

//Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
//here you set that you are using `ejs` template engine and the
//default extension is `ejs`
app.set('view engine', 'ejs');

//MIDDLEWARE
//setting up cors
app.use(cors());
//settong up logger morgan function to run dev script
app.use(logger('dev'));
//setting up cookie parser module
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//directing exprss to static files
app.use(express.static('public'));

//setting up method override module to run on http method key 
app.use(methodOverride('_method'));
app.use(session({
    //secret key opens session This is stored on the server
    secret: process.env.SECRET_KEY,
    //only save the session is a session property is added or mutated
    resave: false,
    //only save the cookie when property is added to the session. to comply with LAW
    saveUninitialized: false
}))
//setting up the passport module
app.use(passport.initialize());
app.use(passport.session());
//directing express views
//here you set that all the templates are located in `/views` directory
app.set(express.static(path.join(__dirname, 'client/views')));




//importing recipeHelper function for the search view
const recipeHelpers = require('./services/recipes/recipeHelpers');
console.log('connected recipeHelpers');
// const recipeRoutes = require('../routes/recipesRoutes');
const userRoutes = require('./services/routes/users');
const authRoutes = require('./services/routes/auth');
const controllers = require('./controllers/recipes');
const seedController = require('./controllers/seed');

app.use('/', routes);
//Directing app to use recipeRoutes for all recipes urls
app.use('/routes', recipeRoutes);

//directing app to use authRoutes for user authentication
app.use('/auth', authRoutes);
//directing app to use userRoutes for users
app.use('/routes/users.js', userRoutes);
//CONTROLLERS
app.use('/recipes', controllers);
console.log('connected recipesController');
//directing app to use fpr recipe URL routes
//userControllers export router 
app.use('./auth', usersControllers);
console.log('connected usersController');
//seedController exported router class in teh seed controller
app.use('/seed', seedController);
console.log(`connected ${seedController}`);

app.get('/api/users', usersRoutes);
app.get('/auth', authRoutes);

 app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, 'client/build', 'index'));
});


app.post('/api/search', recipeHelpers, (req, res) => {
    res.json({
        documentTitle: 'No Sugars No Grains Food Recipes',
        message: 'ok recipeHelpers',
    })
    });

    //'home index matching route found
    //res.send('hello world');
//     res.render('index.ejs', {
//         documentTitle: 'No Sugars No Grains Food Recipes',
//         message: 'Welcome Back',
//         subTitle: 'Enjoy eating again',
//         logged: req.session.logged
//     })
// });
// //Login Page ROUTE
// app.get('auth/login', (req, res) => {
//     //'home index matching route found
//     res.render('views/recipes/index', {
//         documentTitle: 'No Sugars No Grains Food Recipes',
//         subTitle: 'Enjoy eating again',
//         message: req.session.message,
//         logged: req.session.logged
//     })
// });
// app.use('/auth', (req, res) => {
//     //'home index matching route found
//     res.render('auth/login.ejs', {
//         documentTitle: 'No Sugars No Grains Food Recipes',
//         subTitle: 'Enjoy eating again',
//         message: req.session.message,
//         logged: req.session.logged
//     })
// });
// //setting up the search page route
// app.get('/:search', (req, res) => {
//     res.render('search.ejs', {
//         documentTitle: 'No Sugars No Grains Food Recipes',
//         subTitle: 'Enjoy eating again',
//         message: req.session.message,
//         recipeHits: res.locals.recipeHits,
//     });
// });
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('*', (req, res) => {
    res.status(404).send({message: 'Oops Something Went Wrong'});
});



module.exports = app;