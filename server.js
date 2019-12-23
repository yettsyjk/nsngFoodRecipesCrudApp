//Dependencies
const express = require('express');
const app = express();

const methodOverride = require('method-override');
require('./db/db');
//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//controllers
const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);

//home index
app.get('/', (req, res) => {
//home index route
res.render('index.ejs')
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});