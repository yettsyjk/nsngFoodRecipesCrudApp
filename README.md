# nsngFoodRecipesCrudApp
CRUD App for no sugar no grain health food recipes created by fellow Yettsy Knapp 
General Assembly SEI6 Denver, CO


![wireframe image for NSNG recipes]<img src="images/nsngRecipesApp.png">
Follow my project management steps on my public Trello site:  https://trello.com/b/TGA9a6F5

MVP: Most basic version of the site 
The live project can be viewed here(url).
____________________________________________

Providing my user a location within the browser to join to have saved nsng recipes for when they are prepping for their next meal. 
Site will provide a list of predetermined ketogenic friendly recipes that contain no sugars or grains. Users will be able to have their recipes listed on their page as well as a way to edit their favorite recipes and save them for later use. 


________________________________________________
User Stories:
Users are welcome to:
1. register as a user on the site
1. log in to the site once registered
1. add neww recipes to the site(once logged in)
1. edit pre-created recipes(once logged in)
1. delete any recipes pre-created(once logged in)
1. view a list of pre-created recipes from the database
1. search list of recipes by recipe name
1. filter the list of reipes by a recipe name
1. sort the list of recipes in alphabetical order
1. see the ingredients for a se;ected recipe
1. read the method for preparing the recipe

___________________________________________
Model schema sample for user 

    const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: { type: String, required: true },
    password: { type: String, required: true }
});

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
___________________________________________
Requirements:
-Node
-MongoDB
-espress JS framework
-Mongoose
_____________________________________________
Installation Instructions:


Stretch Goal/Phase Two:
Setting up the user to have a favorite recipe section
Styling to site
Improving authentication
intelligent formating for user to add their own comments for recipes they dislike