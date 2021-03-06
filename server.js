//------Dependencies -------------//
//setting up variables for node modules
const express = require('express');

//creating variable for express function
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
//commenting out SQL pg promise express-session package allows server to store data to access across requests
const session = require('express-session');

// require('dotenv');
require('dotenv').config();
//create connection to the db server
require('./db/db');


//-----MIDDLEWARE------------------//

// //commenting out SQL pg-promise setting up cookie parser module
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//directing exprss to static files
app.use(express.static('public'));

//setting up method override module to run on http method key 
app.use(methodOverride('_method'));
app.use(session({
        //secret key opens session This is stored on the server
        secret: "random secret key",
        //only save the session is a session property is added or mutated
        resave: false,
        //only save the cookie when property is added to the session. to comply with LAW
        saveUninitialized: false
    }))
    
//----MONGODB CONTROLLERS-----//
//recipesController is given the value of the exported router class in recipes controller (controllers/recipes.js)
const recipesController = require('./controllers/recipes');
//All /recipes routes  the request url is evaluated
//immediately follows the domain (localhost:3000) the request are directed to controller file
//if path begins with '/recipes/, the request directed to recipesController (controllers/recipes.js)
app.use('/recipes', recipesController);
// console.log('connected recipesController');

const articlesController = require('./controllers/articles');
app.use('/articles', articlesController);

const usersController = require('./controllers/users');
// console.log('connected usersController');
//userControllers export router 
app.use('/user', usersController);


const seedController = require('./controllers/seed');
//seedController exported router class in teh seed controller
app.use('/seed', seedController);
// console.log(`connected ${seedController}`);
//--- end of MongoDB Controllers----//

                      
app.get('/', (req, res) => {
    //'home index matching route found commented out res.send once the page worked
    // res.send('hello world');
    console.log(req.session, 'inside get /')
    res.render('index.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        username: req.body.username,
        message: 'Welcome Back',
        subTitle: 'Enjoy eating again',
        logged: req.session.logged,
        alert: req.session.message
    });
});




                        
app.get('*', (req, res) => {
res.status(404).send({message: 'Oops Something went bananas'});
});
                                          
                        
                        
                        
 //Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Listening on port: ${PORT}`);
});