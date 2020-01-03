//-------DEPENDENCIES ------//
//express library is set to express variable in order to use router (controllers/articles.js)
const express = require('express');

//--------CLASSESS-----------//
//router class to the router variable for router handling
const router = express.Router();

//-----------MODELS-------------//
//the Article variable  is assigned the export data from the artrecipes model
const Article = require('../models/artrecipes.js');
const Recipe = require('../models/recipe.js');


//------------ROUTEs-----------------//
//--New ROUTE---//
//GET method
router.get('/new', async (req,res) => {
    // Try the first part. If that fails, send back the error.
    try {
        //recipes model is used to get all the recipes from the recipes collection
        //in order to use the drop down in the form (controllers/recipes)
        const allRecipes = await Recipe.find();
        //response renders: looks in views dircetory for the first argument (recipes/new.ejs)
        //second inject data from the object in the argument. Value is the data retrieved from the database
        //the key is how the file will reference the data (views/articles/new.ejs)
        res.render('recipes/new.ejs', {
            recipes: allRecipes
        });
//return error
    } catch (err) {
        res.send(err);
    }
});
//-----------CREATE ROUTE--------------//
//POST method mathcing path '/'
router.post('/', async (req,res) => {
    // Try the first part. If that fails, send back the error.
    try {
    //the imported Article model uses the data from (req.body_)
        await Article.create(req.body);
        //after the new data is created in the database
        //the user should be redirected back o index route
        //the user get redirected to localhost:3000/articles
        res.redirect('/articles');
    //send back error if the try doens\'t work
    } catch (err) {
        res.send(err);
    }
});
//--INDEX ROUTE---//
router.get('/', async (req,res) => {
    // Try the first part. If that fails, send back the error.
    try {
//
const foundArticles = await Article.find();
//
res.render('articles/index.ejs', {
    articles: foundArticles
});
//
//return error
    } catch (err) {
        res.send(err);
    }
});

//--SHOW ROUTE---//
router.get('/:id', async (req,res) => {
    try {
        // Try the first part. If that fails, send back the error.
        const foundArticle = await Article.findById(req.params.id).populate('recipe').exec();
        //
        res.render('articles/show.ejs', {
            article: foundArticle
        });
        //send back error
    } catch (err) {
        res.send(err);
    }
});
//--EDIT ROUTE---//
router.get('/:id/edit', async (req,res) => {
    try {
         // Try the first part. If that fails, send back the error.
    const foundArticle = await Article.findById(req.params.id);
    //

    const allRecipes = await Recipe.find();
    //
    res.render('articles/edit.ejs', {
        article: foundArticle,
        recipes: allRecipes,
    });
//
    } catch (err) {
        res.send(err);
    }
});
//--UPDATE ROUTE---//
router.put('/:id', async (req,res) => {
    try {
        // Try the first part. If that fails, send back the error.
    await Article.findByIdAndUpdate(req.params.id, req.body);
    //
    //
    //
    //
    res.redirect(`/articles${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
});
//--DELETE ROUTE---//
router.delete('/id', async (req,res) => {
    try {
        await Article.findByIdAndRemove(req.params.id);
        //
        res.redirect('/articles');
        //
    } catch (err) {
        res.send(err);
    }
});
//----EXPORT CONTROLLER----------------//
module.exports = router;