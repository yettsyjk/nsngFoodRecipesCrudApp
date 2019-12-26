
const db = require('../db/db.js');
const Recipe = {};
//creating findAll method
Recipe.findAll = () => {
    return db.query('SELECT recipes.id, recipes.title, categories.category_type, recipes.photo FROM recipes JOIN categories ON recipes.category_type = categories.id ORDER BY recipes.id DESC');
};
// creating the findbyid method
Recipe.findById = id => {
    return db.oneOrNone('SELECT recipes.id, recipes.title, recipes.author, recipes.description, categories.category_type, recipes.ingredients, recipes.photo FROM recipes JOIN categories ON recipes.category_type = categories.id WHERE recipes.id = $1', [id]);
};

// creating the create new recipe method
Recipe.create = recipe => {
    return db.one(
        `
        INSERT INTO recipes
        (title, author, description, category_type, ingredients, photo)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
        `,
        [recipe.title, recipe.author, recipe.description, recipe.category_type, recipe.ingredients, recipe.photo]
    );
};

// creating the update recipe method
Recipe.update = (recipe, id) => {
    return db.none(
        `
        UPDATE recipes SET
        title = $1,
        author = $2,
        description = $3,
        category_type = $4,
        ingredients = $5,
        photo = $6
        WHERE id = $7
        `,
        [recipe.title, recipe.author, recipe.description, recipe.category_type, recipe.ingredients, recipe.photo, id]
    );
};

// creating the delete method
Recipe.destroy = id => {
    return db.none(
        `
        DELETE FROM recipes
        WHERE id = $1
        `,
        [id]
    );
};

// exporting the recipe model
module.exports = Recipe;
