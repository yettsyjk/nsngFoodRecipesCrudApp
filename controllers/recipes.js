
//importing recipe model
const Recipe = require('../models/recipe.js');
//controller object
const controller = {};

//define the view to render once the findAll promise is complete
controller.index = (req, res) => {
    Recipe.findAll()
    .then(recipes => {
        res.render('recipes/index.ejs', {
           documentTitle: "No Sugars No Grains Food Recipes",
           recipesData: recipes,
        });
    })
    .catch(err => {
        res.status(400).json(err);
    });
};
//view render findById promise is completed
controller.show = (req, res) => {
    //console.log(req.params);
    Recipe.findById(req.params.id)
    .then(recipe => {
        res.render('recipes/show.ejs', {
            documentTitle: "No Sugars No Grains Food Recipes",
           recipe: recipe,
        });
    })
    .catch(err => {
        res.status(400).json(err);
    });
};

//New Route
controller.create = (req, res) => {
    //Recipe New Route
    Recipe.create({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_type: req.body.category_type,
        ingredients: req.body.ingredients,
        photo: req.body.photo,
    })
    .then(recipe => {
        res.redirect('/recipes');
    })
    .catch(err => {
        res.status(400).json(err);
    });
};
//render view once edit recipe promise is completed
controller.edit = (req, res) => {
    if(req.user !== undefined) {
        Recipe.findById(req.params.id)
        .then(recipe => {
            console.log(recipe.photo);
            res.render('recipes/edit.ejs', {
                documentTitle: "No Sugars No Grains Food Recipes",
                recipe: recipe,
                id: req.params.id,
                username: req.user.username,
            });
        })
        .catch(err => {
            res.status(400).json(err);
        });
    } else {
        res.redirect('/auth/register.ejs');
    }
};


//render view once update recipe promise is completed
controller.update = (req, res) => {
    Recipe.update({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        category_type: req.body.category_type,
        ingredients: req.body.ingredients,
        photo: req.body.photo,
    },
    req.params.id)
        .then(recipe => {
            res.redirect('/recipes');
        })
        .catch(err => {
            res.status(400).json(err);
        });
    };

//render view delete promise
controller.destroy = (req, res) => {
if((req.user !== undefined) && (req.user.username === 'admin')) {
    Recipe.destroy(req.params.id)
    .then(() => {
        res.redirect('/recipes');
    })
    .catch(err => {
        res.status(400).json(err);
    });
} else {
    res.redirect('/auth/register');
}
};
//export controller
module.exports = controller;