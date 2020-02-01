# nsngFoodRecipesCrudApp
CRUD App for No Sugars No Grains health food recipes created by fellow Yettsy Knapp 
General Assembly SEI6 Denver, CO

# Open NSNG Crud app: https://nsngcrudapp.herokuapp.com/
![wireframe image for NSNG recipes]<img src="images/nsngRecipesApp.png">
Follow my project management steps on my public Trello site:  https://trello.com/b/TGA9a6F5

# MVP: Most basic version of the site: 
1. One usable model must reach Create route resources: a new recipe must be added to the catalog of recipes
1. One usable model must reach Read resources: a recipe must be retrieved and display results
1. One usable model must reach Update resources: information about a recipe must be changed
1. One usable model must reach Delete resources: remove a recipe from the catalog

# The live project can be viewed here: https://nsngcrudapp.herokuapp.com/.
____________________________________________

# Providing my user a location within the browser to join to have saved nsng recipes for when they are prepping for their next meal. 
# Site will provide a list of predetermined ketogenic friendly recipes that contain no sugars or grains. 
# Users will be able to have their recipes listed on their page as well as a way to edit their favorite recipes and save them for later use. 


________________________________________________
# User Stories:
# Users are welcome to:
1. register as a user on the site
1. log in to the site once registered
1. add new recipes to the site(once logged in)
1. edit pre-created recipes(once logged in)
1. create a new recipe(once logged in)
1. delete any recipes pre-created(once logged in)
1. view a list of pre-created recipes from the database
1. each recipe will have recipe: title, author, description, ingredients, and serving size 
1. see the ingredients for a selected recipe
1. read the method for preparing the recipe

___________________________________________
# Model schema sample for user 

    const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
        },
    });

    const  recipeSchema = mongoose.Schema({
        title: { type: String, required: true},
        author: 'String',
        description: { type: String, required: true},
        category_type: 'String',
        ingredients: { type: String, required: true},
        photo: 'String',
        serving: 'String',
        user: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                }
            },
        );
___________________________________________
# Requirements:
1. Node: npm install dependencies listed in package.json
1. MongoDB: database for modern applications
1. express JS framework
1. Mongoose: straight-forward, schema-based solution to model your application data
_____________________________________________
# Technology Used:
1. EJS - embedded JavaScript Templating
1. Express: Fast , unopinionated, minimalist web framework for node.
1. MVC
1. SQL tables and PG Promise
1. JavaScript:
1. Edamam API: using thrd party API key
1. Isomorphic Fetch works with API 
1. Bcrypt: app uses encryption passwords
1. Heroku: web hosting for my app
_____________________________________________
# Installation Instructions:
1. verify to create a .env and .gitignore folder 
_____________________________________________

# Stretch Goal/Phase Two:
1. Setting up the user to have a favorite recipe section
1. Styling to site
1. Improving authentication
1. intelligent formating for user to add their own comments for recipes they dislike
_______________________________________________
# Passion for NSNG lifestyle
1. This app has been a lot of fun to create as I highly respect the man that introduced me to NSNG (my husband CS Knapp). 
1. Our family finds the teachings of Vinnie Tortorich to be wonderful and brought us back to enjoying healthy food lifestyles again. 
1. To learn more about NSNG go to https://vinnietortorich.com/what-is-nsng/