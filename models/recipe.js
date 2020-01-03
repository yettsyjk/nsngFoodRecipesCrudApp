const mongoose = require('mongoose');

//mongoose Schema object
const  recipeSchema = mongoose.Schema({
        title: { type: String, required: true},
        author: { type: String, required: true},
        description: { type: String, required: true},
        category_type: String,
        ingredients: { type: String, required: true},
        photo: String,
        },
   );
const Recipe = mongoose.model('Recipe', recipeSchema);



module.exports = Recipe;

