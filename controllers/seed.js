//----DEPENDENCIES-------------//
const express = require('express');

//-------------CLASSES----------------//
const router = express.Router();

//------MODELS---------------------//
const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');
const Article = require('../models/artrecipes.js')

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
//---------ROUTES-----------//
//-----Seed to INDEX ROUTE-----------//
router.post('/', async (req, res) => {
    //try this and if fails send back error
    try {
        //seed create route
        //matching route is found the Recipe and Article models are used to
        //seed the datain our arrays into the database (controllers/recipes.js)
        await Recipe.collection.drop();
        await Article.collection.drop();
        const newRecipes = await Recipe.create(recipesToSeed);
        const articlesToSeed = [{
              title: 'Shrimp Scampi', 
              author: 'Hyde Sauce', 
             description: 'Simply sauté the shrimp with garlic in butter and olive oil, splash it with some white wine, let the wine reduce while the shrimp cooks, and then toss it with fresh parsley, lemon juice and black pepper.',
              category_type: 8, 
             ingredients: '{"1 (16 ounce) package linguine","1/4 cup olive oil","1/4 cup butter","6 cloves garlic",minced,"1 pound peeled and deveined medium shrimp","3/4 cup white wine","1/2 cup lemon juice","1/4 teaspoon crushed red pepper","1 tablespoon chopped fresh basil","1/2 teaspoon salt","1/2 pint grape tomatoes",halved,"2 tablespoons grated Pecorino Romano cheese","1 tablespoon chopped fresh parsley"}',
            photo: url('https://c1.staticflickr.com/1/66/161224077_17bc6c759f_z.jpg?zz=1')
            },
            {
                title: 'Cheesy Zucchini sliders', 
                author: 'Pedro Bigz', 
                description: 'Combine ricotta cheese, egg, onion, milk and almond flour. Season with salt and pepper. Clean and slice zucchini into thin slices and place into baking dish. Pour mustard, and tomato mixture over loaf. Bake at 350 degrees for 1 hour.', 
                category_type: 2,
                ingredients: '{"1 1/2 pounds ground beef","1 egg","1 onion",chopped,"1 cup milk","1 cup almond flour","salt and pepper to taste","2 tablespoons brown sugar","2 tablespoons prepared mustard","1/3 cup tomotoes"}',
                photo: url('https://media.giphy.com/media/zG1Ahac9UHcIw/giphy.gif')
            },
        ]
        await Article.create(articlesToSeed);
        //now that we creates recipes and associated them with new articles
        const articlesAndRecipes = await Article.find().populate('recipe').exec();
        res.json(articlesAndRecipes);
        //SEED INDEX ROUTE don't render 
        //sending json back to the browser to confirm the article and recipes created 
    } catch (err){
        res.send(err);
    }
})
//----export controller---------//
module.exports = router;