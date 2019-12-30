const mongoose = require('mongoose');

const artrecipeSchema = mongoose.Schema({
    title: String,
    body: String,id,
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
});

const Article = mongoose.model('Article', artrecipeSchema);

module.exports = Article;