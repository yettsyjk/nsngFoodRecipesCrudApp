
//-----DEPENDENCIES--------//
const express = require('express');

//---------CLASSES-----------//
const router = express.Router();

//---------------MODELS----------//
//importing recipe model and require the file in the models folder
const Recipe = require('../models/recipe');
// //import Article model by requiring file in models folder
// const Article = require('../models/artrecipes')
//import User model by requiring file in models folder
const User = require('../models/user');



//------------------ROUTES-----------//


//--------------NEW ROUTE--------//
//GET method url /recipes/new
router.get('/new', async (req, res) => {
    res.render('recipes/new.ejs', {
            username: req.session.username,
            logged: req.session.logged,  
            alert: req.session.message
    });
});
//--------CREATE ROUTE---------//
//POST method url /recipes
router.post('/', async (req, res)=> {
    //try the first part if that fails send back an error
    try {
        //Recipes CREATE ROUTE
        //find the current user
        const currentUser = await User.findOne({ username: req.session.username } );
        //take id and to req.body as value of req.body.user
        req.body.user = currentUser._id
        console.log('connected recipes create route in recipes.js');
        //the imported Recipe model uses the data from the form(req.body)
        //to create a new document in the recipes collections (controllers/recipes.js)
        await Recipe.create(req.body);
        //Recipes Create ROUTE user gets redirected to localhost:3000/recipes
       //initiating the GET request (server.js))
        res.redirect('/recipes');
    console.log('good passed create route');
    } catch (err) {
        res.send(err);
    }
});
//-------INDEX ROUTE------------//
router.get('/', async (req, res) => {
    try {
        //Matching route is found, the imported Author model 
        //is used to find all recipes in the recipes collection and store it in a variable.
        const currentUser = await User.findOne({ username: req.session.username } );
        //take id and to req.body as value of req.body.user
        req.body.user = currentUser._id
        // console.log(req.body.user);
        const foundRecipes = await Recipe.find();
        // console.log(foundRecipes);
        //Recipes Index Route response renders the view
//First, it looks in the views directory for the first argument (recipes/index.ejs) 
//and, secondly, injects the data from the object in the second argument into it. In this object, the data is made up of key-value pairs. The value is the data retrieved from the database. /
//The key is how the view file will reference that data.
res.render('recipes/index.ejs', {
    currentUser: currentUser,
    username: req.session.username,
    recipe: foundRecipes,
    logged: req.session.logged,  
    alert: req.session.message
});    
} catch (err) {
    console.log(err);
        res.send(err);
    }
});
//----------SHOW ROUTE---------------//
//define the view to render once the findAll promise is complete
//get method url /recipes/:id
router.get('/:id', async (req, res) => {
    //try this and if that fails return err
    try {
        const currentUser = await User.findOne({ username: req.session.username } );
        //take id and to req.body as value of req.body.user
        req.body.user = currentUser._id
        const foundRecipe = await Recipe.findById(req.params.id).populate("user");
        console.log(foundRecipe);
        //RECIPES INDEX ROUTE response renders
        res.render('recipes/show.ejs', {
            currentUser: currentUser,
            recipe: foundRecipe,
            documentTitle: "No Sugars No Grains Food Recipes",
            logged: req.session.logged,
            alert: req.session.message
        });
        // res.render('recipes/index.ejs');
        console.log('connected currentUser in show route in recipes.js');
//RECIPES INDEX ROUTE, send HTML back to Browser
    } catch (err) {
        console.log('error in show route recipes.js');
        // res.send (err);
        res.status(400).json(err);
    }
});

//------------EDIT ROUTE-------------------//
//GET method url/recipes/:id/edit
router.get('/:id/edit', async (req, res) => {
    //try this part first if that fails return an error
    try {
        const currentUser = await User.findOne({ username: req.session.username } );
        //take id and to req.body as value of req.body.user
        req.body.user = currentUser._id
        console.log('connected currentUser in edit route');
//RECIPES EDIT ROUTE
const foundRecipe = await Recipe.findById(req.params.id).populate("user");
//RECIPE EDIT ROUTE response renders
res.render('recipes/edit.ejs', {
    currentUser: currentUser,
    recipe: foundRecipe,
    documentTitle: "No Sugars No Grains Food Recipes",
    username: req.session.username,
    logged: req.session.logged,
    alert: req.session.message
    });
    //RECIPES EDIT ROUTE return error
    } catch (err) {
        // res.send(err);
        res.status(400).json(err);
    }
    console.log('edit route error');
});
//------------UPDATE RECIPES ROUTE-----------------//
//PATCH or PUT method url /recipes/:id
router.put('/:id', async (req, res) => {
    //try this and if that fails send back an error
    try {
    console.log('connected currentUser in update route');
        //RECIPES UPDATE ROUTE we query for only a single recipe
        //and use the findByIdAndUpdate() method
        await Recipe.findByIdAndUpdate(req.params.id, req.body);
        //RECIPES UPDATE ROUTE redirect to localhost
        res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
        console.log('error in update route');
        res.send(err);
    }
});

//--------------DELETE ROUTE---------------------//
//DESTROY method url /recipes/:id or recipes/:anything you pass in right side of the assigner
router.delete('/:id', async (req, res) => {
    //try this and if it fails send back an error
    try {
        const currentUser = await User.findOne({ username: req.session.username } );
        //take id and to req.body as value of req.body.user
        // req.body.user = currentUser._id
        console.log('connected currentUser in delete route');
   //we query for only one recipe and use finByIdAndRemove() method
   await Recipe.findByIdAndRemove(req.params.id);
   //RECIPES redirected to INDEX ROUTE
   //that request is fulfilled by index route, the user will redirected '/recipes'
        res.redirect('/recipes');
    } catch (err) {
        res.send(err);
        console.log('delete route error');
    }
    });
//-----export controller-----------------//
module.exports = router;
