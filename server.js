// $(() => {
//     $('#myModal').modal(options)
// })
//------Dependencies -------------//
//setting up variables for node modules
const express = require('express');
//commenting out SQL pg-promise module because it doesnt run with MongoDB
//path, morgan, body-parser
// const path = require('path');
// const logger = require('morgan');
// const bodyParser = require('body-parser');
//commenting out SQL pg-promise module because it doesnt run with MongoDB
// const cors = require('cors');
//creating variable for express function
const app = express();
const methodOverride = require('method-override');
// const cookieParser = require('cookie-parser');
//commenting out SQL pg promise express-session package allows server to store data to access across requests
const session = require('express-session');
//Commenting out SQL pg promise passport
// const passport = require('passport');
// const routes = express.Router();
//create connection to the db server
require('./db/db');
// require('isomorphic-fetch');
require('dotenv').config();

//here you set that you are using `ejs` template engine and the
//default extension is `ejs`
// app.set('view engine', 'ejs');

//-----MIDDLEWARE------------------//
//commenting out SQL pg-promise module because it doesnt run with MongoDB
//setting up cors
// app.use(cors());
//setting up logger morgan function to run dev script
// app.use(logger('dev'));
// //commenting out SQL pg-promise setting up cookie parser module
// app.use(cookieParser());
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
    //setting up the passport module
    // app.use(passport.initialize());
    // app.use(passport.session());
    //directing express views
    //here you set that all the templates are located in `/views` directory
    // app.set(express.static(path.join(__dirname, 'views')));
    
    
    
    //----SQL CONTROLLERS-----//
    
    //Commenting out SQL pg promise - importing recipeHelper function for the search view
    // const recipeHelpers = require('./recipeHelpers');
    // console.log('connected recipeHelpers');
    // app.post('/', recipeHelpers, (req, res) => {
        //     res.json({
            //         documentTitle: 'No Sugars No Grains Food Recipes',
            //         message: 'ok recipeHelpers',
            //     })
            //     });
            
            
            // const recipeRoutes = require('../routes/recipesRoutes');
            // //Commenting out SQL pg promise Directing app to use recipeRoutes for all recipes urls
            // app.use('/routes', recipeRoutes);
            // const userRoutes = require('./routes/users');
            // //Commenting out SQL pg promise directing app to use userRoutes for users
            // app.use('/routes/users.js', userRoutes);
            // const authRoutes = require('./routes/auth');
            // //Commenting out SQL pg promise directing app to use authRoutes for user authentication
            // app.use('/auth', authRoutes);
            // app.use('/', authRoutes);
//----MONGODB CONTROLLERS-----//
//controller are loaded for use when requests arrive
const recipesController = require('./controllers/recipes');
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

            //commenting out SQL pg promise because it wasnt working properly
            // app.get('/api/users', usersRoutes);
            // app.get('/auth', authRoutes);
            
            //  app.get('/*', (req, res) => {
                // res.sendFile(path.join(__dirname, 'views', 'ejs'));
                // });             
app.get('/', (req, res) => {
    //'home index matching route found commented out res.send once the page worked
    // res.send('hello world');
    console.log(req.session, 'inside get /')
    res.render('index.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes',
        message: 'Welcome Back',
        subTitle: 'Enjoy eating again',
        logged: req.session.logged,
        alert: req.session.message
    });
});

// Commenting out SQL didnt work Login Page ROUTE//
// app.get('/auth/login', (req, res) => {
//     //'home index matching route found
//     res.render('views/recipes/index', {
//         documentTitle: 'No Sugars No Grains Food Recipes',
//         subTitle: 'Enjoy eating again',
//         message: req.session.message,
//         logged: req.session.logged
//     })
// });


// app.use('/auth', (req, res) => {
// //'home index matching route found
// res.render('auth/login.ejs', {
//     documentTitle: 'No Sugars No Grains Food Recipes',
//     subTitle: 'Enjoy eating again',
//     message: req.session.message,
//     logged: req.session.logged
//    })
// });
//                     //setting up the search page route
//  app.get('/:search', (req, res) => {
//      res.render('search.ejs', {
//          documentTitle: 'No Sugars No Grains Food Recipes',
//          subTitle: 'Enjoy eating again',
//          message: req.session.message,
//          recipeHits: res.locals.recipeHits,
//     });
// });
                    // app.get('/*', (req, res) => {
                        //     res.sendFile(path.join(__dirname, 'views', 'index.ejs'));
                        // });


                        
app.get('*', (req, res) => {
res.status(404).send({message: 'Oops Something Went Wrong'});
});
                                          
                        
                        
                        
 //Turn on that server!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Listening on port: ${PORT}`);
});