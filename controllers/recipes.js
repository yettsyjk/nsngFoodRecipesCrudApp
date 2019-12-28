
//DEPENDENCIES
const express = require('express');

//CLASSES
const router = express.Router();

//MODELS
//importing recipe model
const Recipe = require('../models/recipe.js');
//controller object

//ROUTES
//NEW ROUTE
router.get('/new', async (req, res) => {
    //views/recipes/new.ejs matching route
    res.render('/views/recipes/new.ejs');
});
//CREATE ROUTE
router.post('/', async (req, res)=> {
    //try the first part if that fails send back an error
    try {
        //Recipes CREATE ROUTE
        await Recipe.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_type: req.body.category_type,
        ingredients: req.body.ingredients,
        photo: req.body.photo,
    });
        //Recipes Create ROUTE user gets redirected to localhost:3000/recipes
        res.redirect('/recipes')
    } catch (err) {
        res.send(err);
    }
});
//SHOW ROUTE
//define the view to render once the findAll promise is complete
router.get('/:id', async (req, res)=> {
    //try this and if that fails return err
    try {
        //Recipes INDEX ROUTE
        const foundRecipes = await Recipe.findAll();
        //RECIPES INDEX ROUTE response renders
        res.render('recipes/index.ejs', {
            recipe: foundRecipes,
            documentTitle: "No Sugars No Grains Food Recipes",
            recipesData: recipes,
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
const foundRecipes = await Recipe.findById(req.params.id);
//RECIPE EDIT ROUTE response renders
res.render('recipes/edit.ejs', {
    recipe: foundRecipes,
    documentTitle: "No Sugars No Grains Food Recipes",
    recipe: recipe,
    id: req.params.id,
    username: req.user.username,
    });
    //RECIPES EDIT ROUTE
    } catch (err) {
        res.send(err);
        res.status(400).json(err);
    res.redirect('/auth/register.ejs');
}
});
//UPDATE RECIPES ROUTE
router.put('/:id', async (req, res) => {
    //try this and if that fails send back an error
    try {
        //RECIPES UPDATE ROUTE
        await Recipe.findByIdAndUpdate({ 
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            category_type: req.body.category_type,
            ingredients: req.body.ingredients,
            photo: req.body.photo,
        });
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