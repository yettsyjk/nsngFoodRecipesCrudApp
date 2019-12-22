const express = require('express');
const app = express();

//controllers
const recipesController = require('./controllers/recipes.js');
app.use('/recipes', recipesController);

const port = 3000;


app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});