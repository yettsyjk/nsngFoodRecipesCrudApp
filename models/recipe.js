const mongoose = require('mongoose');
// importing the pg-promise
const db = require('../db/db');

// creating a model object
const Recipes = {};
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


// creating the findall method
Recipes.findAll = () => {
        return db.query('SELECT recipes.id, recipes.title, categories.category_type, recipes.photo FROM recipes JOIN categories ON recipes.category_type = categories.id ORDER BY recipes.id DESC');
    };
    
    // creating the findbyid method
    Recipes.findById = id => {
        return db.oneOrNone('SELECT recipes.id, recipes.title, recipes.author, recipes.description, categories.category_type, recipes.ingredients, recipes.photo FROM recipes JOIN categories ON recipes.category_type = categories.id WHERE recipes.id = $1', [id]);
    };
    
    // creating the create new recipe method
    Recipes.create = recipe => {
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
    Recipes.update = (recipe, id) => {
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
    Recipes.destroy = id => {
        return db.none(
                `
                DELETE FROM recipes
                WHERE id = $1
                `,
                [id]
            );
        };
// exporting the recipe model
module.exports = Recipe, Recipes;

