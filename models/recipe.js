const mongoose = require('mongoose');

//mongoose Schema object
const  recipeSchema = mongoose.Schema({
        title: { type: String, required: true},
        author: 'String',
        description: { type: String, required: true},
        category_type: 'String',
        ingredients: { type: String, required: true},
        photo: 'String',
        user: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
        }
        },
   );
const Recipe = mongoose.model('Recipe', recipeSchema);



module.exports = Recipe;

