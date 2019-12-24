//importing express and controller
const express = require('express');
const controller = require('../controllers/recipes.js');

//create variable express route method
const recipesRoutes = express.Router();

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
//setting up route for single recipe function
recipesRoutes.get('/:id', controller.show);
//setting up post route to create recipe function
recipesRoutes.post('/', controller.create);
//setting up put route for updating recipe function
recipesRoutes.put('/:id', controller.update);
//setting up delete route 
recipesRoutes.delete('/:id', controller.destroy);

//exporting router
module.exports = recipesRoutes;