//DEPENDENCIES
const express = require('express');

//CLASSES
const router = express.Router();

//MODELS
const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');

//Recipes array to SEED recipes collection, routed
const recipesToSeed = [
    {
        title: 'cauliflower pizza crust'
    },
    {
        title: 'spinach and cheese'
    },
    {
        title: 'caprese salad'
    },
    {
        title: 'carne asada'
    },
]
//ROUTES
//Seed to INDEX ROUTE
router.post('/', async (req, res) => {
    //try this and if fails send back error
    try {
        //seed create route
        await Recipe.collection.drop();
        const newRecipes = await Recipe.create(recipesToSeed);
    } catch (err){
        res.send(err);
    }
})
//export controller
module.exports = router;