
//Load Mongoose package (models/artrecipes.js)
const mongoose = require('mongoose');

//Use mongoose Schema (models/artrecipes.js)
const artrecipeSchema = mongoose.Schema({
    title: String,
    body: String,
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});
//Export the schema in the form of a model (models/artrecipes.js)
const Article = mongoose.model('Article', artrecipeSchema);

//export the modelfor use in controllers (controllers/articles.js)
module.exports = Article;