//Dependencies
const express = require('express');
//Classes route 
const router = express.Router();
const controller = {};

//Models importing the recipe model
const Recipe = require('../models/recipe');
//define the view to render once the findall promise is complete
controller.index('/recipes', (req, res) => {
    Recipe.findAll()
    .then(recipes => {
        res.render('recipes/recipes-index', {
           documentTitle: "No Sugars No Grains Food Recipes",
           recipesData: recipes,
        });
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

//New Route
controller.create('/new', async (req, res) => {
    //Recipe New Route
    Recipe.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_type: req.body.category_type,
        ingredients: req.body.ingredients,
        photo: req.bidy.photo,
    })
    .then(recipe => {
        res.redirect('/recipes');
    })
    .catch(err => {
        res.status(400).json(err);
    });
};
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
controller.index('/', async (req, res) => {
Recipe.findAll()
.then(recipes => {
    res.render('recipes/recipes-index', {
        documentTitle: "No Sugars No Grains Food Recipes",
           recipesData: recipes,
    });
})
.catch(err => {
    res.status(400).json(err);
});
})
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
controller.create('/:id/edit', async (req, res) => {
    Recipe.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_type: req.body.category_type,
        ingredients: req.body.ingredients,
        phot: req.body.photo,
    })
    .then(recipe => {
        res.redirect('/recipes');
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

//update route
controller.show('/:id', async (req, res)=> {
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