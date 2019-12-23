//load mongoose package
const mongoose = require('mongoose');

//use mongoose to creat a schema
const recipeSchema = mongoose.Schema({
    title: { type: String, required: true },
    body: String, 
    ingredients: [{
        name: String,
        measurement: String,
    }],
    recipeToEdit: Boolean,
    //username property is creating a relationship between, one username to many recipes
    //the object id pulls full object just by using id
username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Username'
    }
});
//export model Schema 
const Recipe = mongoose.model('Recipe', recipeSchema);

//export model for use in controllers
module.exports = Recipe;