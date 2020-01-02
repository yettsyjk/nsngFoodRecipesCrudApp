//-------DEPENDENCIES--------//
const express = require('express');
//set up brcypt package 
const bcrypt = require('bcrypt');
//----Classes----------//
const router = express.Router();
// const userController = {};

//---Models, SQL importing bcrypt model---//
const Recipe = require('../models/recipe.js');
const User = require('../models/user.js');
//----Routes-----------//
//New Route
router.post('/', async (req, res) =>{
    //try this part first and if that failes send back error
    try {
        await Recipe.create(req.body);
        res.redirect('/recipes');

    } catch (err) {
        res.send(err);
    }
});
//--Create Route--//
router.get('/', async (req, res) => {
    //try this part first and if that failes send back error
 try {
    await Recipe.create(req.body);
    res.redirect('/recipes');
 } catch(err) {
     res.send(err);
 }
});
//------Index Route--//
router.get('/', async (req, res) => {
    //try this part first and if that failes send back error
 try{
    const foundRecipes = await Recipe.find();
    res.render('recipes/index.ejs', {
        recipes: foundRecipes
    });
 }catch (err) {
     res.send(err);
 }
});
//-----Show Route----//
router.get('/:id', async (req, res) => {
    //try this part first and if that failes send back error
try {
    const foundRecipe = await Recipe.findById(req.params.id);
    const recipesArticles = await recipesArticles.find({
        recipe: foundRecipe._id
    });
    res.render('recipes/show/ejs', {
        recipe: foundRecipe,
        articles: recipesArticles
    });
//Recipes SHOW ROUTE to render method HTML out of an ejs file and the datat object
} catch (err) {
    res.send(err);
}
});

//-------------Edit Route--------//
router.get('/:id/edit', async (req, res) => {
    //try this part first and if that failes send back error
    try {
        //RECIPES EDIT ROUTE
        const foundRecipe = await Recipe.findById(req.params.id);
        //Response renders looking in views directory for the first argument (recipes/edit.ejs)
        //secondly inject data from the second argument, this object data is made up of key-value pairs
        //the value is retrieved from the database, the key is how they view file will reference that data
    res.render('recipes/edit.ejs', {
        recipe: foundRecipe
    });

    } catch (err) {
        res.send(err);
    }
});
//--------------Update Route------------//
router.get('/:id', async (req, res) => {
    //try this and if that fails send back an error
    try {
    //Recipes UPDATE ROUTE
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    //dont render view
    //Recipes SHOW ROUTE redirect the user to localhost:3000/recipes/<id>, 
    //initiate the GET request
    res.redirect(`/recipes/${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
});
//-------------------DELETE ROUTE--------------//
router.delete('/:id', async (req, res)=> {
    //try this and if that fails send back an error
    try {
//Recipes DELETE ROUTE
await Recipe.findByIdAndRemove(req.params.id);
await Article.deleteMany({
    recipe: req.params.id
});
//the user gets redirected to localhost:3000/recipes, initiating the GET request (server.js)
res.redirect('/recipes');
    } catch (err) {
        res.send(err);
    }
});

//-----------LOGIN CREATE ROUTE----------//
router.post('/login', async (req, res) => {
    //try this and if that fails send back an error
    try {
        //user login CREATE ROUTE
        const foundUser = await User.fineOne({
            username: req.session.username
        });
        if(foundUser) {
            if(bcrypt.compareSync(req.body.paswoord, foundUser.password)) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.logged = true;
                //Recipe INDEX ROUTE user gets redirected to localhost:3000/recipes
                res.redirect('/recipes')
            } else {
                req.session.message = 'Username or password is incorrect';
                //HOME INDEX ROUTE user gets redirected to localhost:3000
                res.redirect('/');
            }
        } else {
            req.session.message = 'Username or password is incorrect';
            res.redirect('/');
        }
    } catch (err) {
        res.send(err);
    }
});
//----------REGISTER CREATE ROUTE----------------//
router.post('/registration', async (req, res) => {
    //USERS REGISTER CREATE ROUTE
    //a generated salt combines register form and hash them to create a hashed password
    const passwordHash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    //USERS REGISTER CREATE ROUTE user object efore we create it in the database
    const userDbEntry = {
        //using req.sessions matches the 
        username: req.body.username,
        email: req.session.email,
        password: passwordHash,
    };
    try {
        const createdUser = await User.create(userDbEntry);
        //USERS REGISTER CREATE ROUTE
        //imported model is used to find creat a new user in the users collection using the new user object (userDBEntry)
        //store it in a variable
        req.session.username = createdUser.username;
        req.session.logged = true;
        //RECIPES INDEX ROUTE localhost:3000/recipes
        res.redirect('/recipes')
    } catch (err) {
        res.send(err);
    }
})
//Logout INDEX ROUTE
router.get('/logout', (req, res) => {
    //users logout index route destroy the users sessions
    req.session.destroy((err) => {
        if(err){
            res.send(err);
        } else {
            //home index route
            res.redirect('/');
        }
    })
})
//----------------COMMENTING OUT SQL didnt work------------------//

// ////userControllers
// userController.index = (req, res) => {
    //     User.findAll(req.param.id)
    //     .then(usersSearch => {
        //         res.json({
            //             message: 'ok',
            //             data: { usersSearch },
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(400).json({ message: '400', err });
//     });
// };

// userController.create = (req, res) => {
//     console.log(req.body);
//     const salt = bcrypt.genSaltSync();
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     User.create({
//         username: req.body.username,
//             first_name: req.body.first_name,
//             last_name: req.body.last_name,
//             email: req.body.email,
//             password: passwordHash,
//     })
//     .then(user => {
//         req.login(user, err => {
//             if (err) return next(err);
//             res.json({
//                 message: 'ok better',
//                 data: { user } })
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(400).json({ message: '400, err'});
//         });
//     };

//     userController.createQuery = (req, res) => {
//         console.log(req.body)
//         User.createQuery(req.body)
//         .then(query => {
//             res.json({ message: 'seems right', 
//         data: { query }});
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(400).json({ message: '400', err});
//     });
//     };
    
//export controller. Router class is exported to allow other app files to import it
module.exports = router;
// module.exports = userController;