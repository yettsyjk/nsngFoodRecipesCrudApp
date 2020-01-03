
//-----DEPENDENCIES--------//
const express = require('express');

//---------CLASSES-----------//
const router = express.Router();

//---------------MODELS----------//
//importing recipe model and  require the file in the models folder
const Recipe = require('../models/recipe');
//import Article model by requiring file in models folder
const Article = require('../models/artrecipes')
//import User model by requiring file in models folder
const User = require('../models/user');


//------ROUTES-----/////


//-----NEW ROUTE--------//
//GET method
router.get('/new', async (req, res) => {
    //views/recipes/new.ejs matching route
    res.render('recipes/new.ejs');
});
//--------CREATE ROUTE---------
//POST method
router.post('/', async (req, res)=> {
    //try the first part if that fails send back an error
    try {
        //Recipes CREATE ROUTE
        //the imported Recipe model uses the data from the form(req.body)
        //to create a new document in the recipes collections (controllers/recipes.js)
        await Recipe.create(req.body);
        //Recipes Create ROUTE user gets redirected to localhost:3000/recipes
       //initiating the GET request (server.js))
        res.redirect('/recipes')
    } catch (err) {
        res.send(err);
    }
});
//-------INDEX ROUTE------------//
router.get('/', async (req, res) => {
    try {
        //Matching route is found, the imported Author model 
        //is used to find all recipes in the recipes collection and store it in a variable.
        const foundRecipes = await Recipe.find();
        //Recipes Index Route response renders the view
//First, it looks in the views directory for the first argument (recipes/index.ejs) 
//and, secondly, injects the data from the object in the second argument into it. In this object, the data is made up of key-value pairs. The value is the data retrieved from the database. /
//The key is how the view file will reference that data.
res.render('recipes/index.ejs', {
    username: req.session.username,
    recipes: foundRecipes
});    
} catch (err) {
        res.send(err);
    }
});
//----------SHOW ROUTE---------------//
//define the view to render once the findAll promise is complete
router.get('/:id', async (req, res) => {
    //try this and if that fails return err
    try {
        //Recipes INDEX ROUTE
        const foundRecipe = await Recipe.findById(req.params.id);
        console.log(foundRecipe);
        const recipesArticles = await Article.find({
            recipe: foundRecipe._id
        });
        const recipesUsers = await User.find({ user: foundUser._id });
        //RECIPES INDEX ROUTE response renders
        res.render('recipes/show.ejs', {
            user: foundUsers,
            recipe: foundRecipe,
            articles: recipesUsers,
            documentTitle: "No Sugars No Grains Food Recipes",
        });
//RECIPES INDEX ROUTE, send HTML back to Browser
    } catch (err) {
        res.send (err);
        res.status(400).json(err);
    }
});

//EDIT ROUTE
router.get('/:id/edit', async (req, res) => {
    //try this part first if that fails return an error
    try {
//RECIPES EDIT ROUTE
const foundRecipe = await Recipe.findById(req.params.id);
//RECIPE EDIT ROUTE response renders
res.render('/views/recipes/edit.ejs', {
    user: foundUsers,
    recipe: foundRecipe,
    documentTitle: "No Sugars No Grains Food Recipes",
    id: req.params.id,
    username: req.user.username,
    });
    //RECIPES EDIT ROUTE
    } catch (err) {
        res.send(err);
        res.status(400).json(err);
    // res.redirect('/auth/register.ejs');
}
});
//UPDATE RECIPES ROUTE
router.put('/:id', async (req, res) => {
    //try this and if that fails send back an error
    try {
        //RECIPES UPDATE ROUTE
        await Recipe.findByIdAndUpdate(req.params.id,req.body);
        //RECIPES UPDATE ROUTE redirect to localhost
        res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
        res.send(err);
        res.status(400).json(err);
    }
});

//DELETE ROUTE 
router.delete('/:id', async (req, res) => {
    //try this and if it fails send back an error
    try {
        await Recipe.findByIdAndRemove(req.params.id);
        await User.deleteMany({ user: req.params.id });
        //RECIPES redirected to INDEX ROUTE
        res.redirect('/recipes');
    } catch (err) {
        res.send(err);
        res.status(400).json(err);
        //render view delete promise
        res.redirect('/auth/register');
    }
    });
//export controller
module.exports = router;
