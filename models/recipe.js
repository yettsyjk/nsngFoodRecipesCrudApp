const mongoose = require('mongoose');
const  recipeSchema = mongoose.Schema({
        title: String,
        author: String,
        description: String,
        category_type: String,
        ingredients: String,
        photo: String,
        WHERE_id: String,
        },
   );
const Recipe = mongoose.model('Recipe', recipeSchema);


// exporting the recipe model
module.exports = Recipe;
