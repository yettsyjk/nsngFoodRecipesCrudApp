//Dependencies
const express = require('express');
//Classes route 
const router = express.Router();

//Models importing the recipe model
const Recipe = require('../models/recipe');
//define the view to render once the findall promise is complete
router.get('/recipes', (req, res) => {
    recipe.findAll()
    .then(recipes => {
        res.render('recipes/recipes-index', {
           documentTitle: "No Sugars No Grains Food Recipes",
           recipesData: recipes,
        });
    })
    .cathc(err => {
        res.status(400).json(err);
    });
});

//New Route
router.get('/new', async (req, res) => {
    //Recipe New Route
    res.render('recipes/new.ejs');
});

//Create Route
router.post('/', async (req, res) => {
    //try this first part if that fails return an error
    try {
        //create Recipes route
        await Recipe.create(req.body);
        res.redirect('/recipes');
    } catch (err) {
        res.send(err);
    }
});


//Index Route
router.get('/', async (req, res) => {
    try {
        //Recipes index route 
        const foundRecipes = await foundRecipes.fin();
        //Reponse renders Recipes index
        res.render('recipes/index.ejs', {
            recipes: foundRecipes
        });
    } catch (err) {
    res.render(err);
    }
});
//show route
router.get('/:id', async (req, res) => {
    //try this part first and if it fails return an error
try {
    const foundRecipe = await Recipe.findById(req.params.id);
res.render('recipes/show.ejs', {
    recipe: foundRecipe
});
} catch (err){
    res.send(err);
}
});

//Edit Route
router.get('/:id/edit', async (req, res) => {
    try {
        const foundRecipe = await Recipe.findById(req.params.id);
        res.render('recipes/edit.ejs', {
            recipe: foundRecipe
        });
    }catch (err) {
        res.send(err);
    }
});

//update route
router.put('/:id', async (req, res)=> {
    try {
        await Recipe.findByIdAndUpdate(req.params.id, req.body);
        res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
});
//Delete Route
router.delete('/:id', async (req, res) => {
    try {
        await Recipe.findByIdAndRemove(req.params.id);
        res.redirect('/recipes');
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;