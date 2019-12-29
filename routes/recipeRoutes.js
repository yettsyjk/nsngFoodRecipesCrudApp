//importing express and controller
const express = require('express');
const recipesRoutes = require('../services/recipes/recipeHelpers');
const controller = require('../controllers/recipes.js');

//create variable express route method
const recipesRoutes = express.Router();
const recipesRouter = expressRouter();

//setting route index view
recipesRoutes.get('/', controller.index);
//setting route for create recipe view
recipesRoutes.get('/add', (req, res) => {
    res.render('recipes/new.ejs', {
        documentTitle: 'No Sugars No Grains Food Recipes'
    });
});
//setting up route for recipe edit function
recipesRoutes.get('/edit/:id', controller.edit);
console.log("created Recipe edit route!");
//setting up route for single recipe function
recipesRoutes.get('/:id', controller.show);
console.log("created Recipe index route!");
//setting up post route to create recipe function
recipesRoutes.post('/', controller.create)
console.log("created route accessed!");


//setting up put route for updating recipe function
recipesRoutes.put('/:id', controller.update);
console.log("created Recipe update route!");
//setting up delete route 
recipesRoutes.delete('/:id', controller.destroy);
console.log("created Recipe destroy route!");
recipesRouter.get('/:search', recipeHelpers.getRecipes, recipesController.sendApiRecipe);
recipesRouter.Router.post('/create', recipesController.create);
//exporting router
module.exports = recipesRoutes;
module.exports = recipesRouter;