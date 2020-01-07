//----DEPENDENCIES-------------//
const express = require('express');

//-------------CLASSES----------------//
const router = express.Router();

//------MODELS---------------------//
//import Recipe model by requiring file in models folder
const Recipe = require('../models/recipe');

//---------ROUTES-----------//
//-----Seed to INDEX ROUTE-----------//
router.get('/', async (req, res) => {
    //try this and if fails send back error
    try {
        //set up route that will seed localhost:3000/seed
        const recipesToSeed = [{
            title: 'Asparagus Swiss Stuffed Meatlof', 
            author: 'Anna Vocino', 
           description: 'Simply sauté the shrimp with garlic in butter and olive oil, splash it with some white wine, let the wine reduce while the shrimp cooks, and then toss it with fresh parsley, lemon juice and black pepper.',
            category_type: 8, 
           ingredients: '{"1 (16 ounce) package linguine","1/4 cup olive oil","1/4 cup butter","6 cloves garlic",minced,"1 pound peeled and deveined medium shrimp","3/4 cup white wine","1/2 cup lemon juice","1/4 teaspoon crushed red pepper","1 tablespoon chopped fresh basil","1/2 teaspoon salt","1/2 pint grape tomatoes",halved,"2 tablespoons grated Pecorino Romano cheese","1 tablespoon chopped fresh parsley"}',
            photo: "url('https://c1.staticflickr.com/1/66/161224077_17bc6c759f_z.jpg?zz=1')"
          },
          {
              title: 'Cheesy Zucchini Sliders', 
              author: 'Pedro Bigz', 
              description: 'Combine ricotta cheese, egg, onion, milk and almond flour. Season with salt and pepper. Clean and slice zucchini into thin slices and place into baking dish. Pour mustard, and tomato mixture over loaf. Bake at 350 degrees for 1 hour.', 
              category_type: 2,
              ingredients: '{"1 1/2 pounds zucchini slices","1 egg","1 onion",chopped,"1 cup milk","1 cup almond flour","salt and pepper to taste","2 tablespoons brown sugar","2 tablespoons prepared mustard","1/3 cup tomotoes"}',
              photo: "url('https://media.giphy.com/media/zG1Ahac9UHcIw/giphy.gif')"
          },
          {
              title: 'Shrimp Scampi', 
              author: 'Hyde Sauce', 
              description: 'Simply sauté the shrimp with garlic in butter and olive oil, splash it with some white wine, let the wine reduce while the shrimp cooks, and then toss it with fresh parsley, lemon juice and black pepper.',
              category_type: 1, 
              ingredients: '{"1 (16 ounce) package linguine","1/4 cup olive oil","1/4 cup butter","6 cloves garlic",minced,"1 pound peeled and deveined medium shrimp","3/4 cup white wine","1/2 cup lemon juice","1/4 teaspoon crushed red pepper","1 tablespoon chopped fresh basil","1/2 teaspoon salt","1/2 pint grape tomatoes",halved,"2 tablespoons grated Pecorino Romano cheese","1 tablespoon chopped fresh parsley"}',
              photo: "https://c1.staticflickr.com/1/66/161224077_17bc6c759f_z.jpg?zz=1"
           },
           {
               title: 'Hummus and Almond FLour Pita or Naan', 
              author: 'Gwens Nest', 
               description: 'One batch yields about 2 cups of hummus amazingness. Enjoy it with veggies, toasted low carb tortillas or pitas. I like the texture and flavor even more after it chills a bit, but it’s flat out incredible right out of the blender.', 
              category_type: 2,
              ingredients: 'one egg, almond flour and tapioca flour',
              photo: "https://myheartbeets.com/wp-content/uploads/2013/11/3-ingredient-paleo-naan.jpg"
           },
           {
              title: 'Cheesy Bacon Meatloaf', 
              author: 'Juanita Ortiz', 
              description:  'Combine beef, egg, onion, milk and almond flour. Season with salt and pepper. Form into a loaf and place into baking dish. Pour mustard, and tomato mixture over loaf. Bake at 350 degrees for 1 hour.', 
              category_type: 3,
              ingredients: '{"1 1/2 pounds ground beef","1 egg","1 onion",chopped,"1 cup milk","1 cup almond flour","salt and pepper to taste","2 tablespoons brown sugar","2 tablespoons prepared mustard","1/3 cup tomotoes"}',
              photo: "https://media.giphy.com/media/zG1Ahac9UHcIw/giphy.gif"
           },
           {
              title: 'Chicken Fancesca', 
              author: 'Tommy Bahama', 
              description: 'Evenly coat milk-soaked chicken in mix of almond flour, pecorino romano cheese, and parsley. Cook in large skillet until lightly browned. Bake in oven for 25 minutes.', 
              category_type: 4,
              ingredients: '{"4 large skinless","boneless chicken breast halves","1 cup milk","or as needed","1 cup almond flour","1 cup grated Pecorino Romano cheese","2 tablespoons chopped fresh parsley","1 cup olive oil","salt and ground black pepper to taste","1 lemon","thinly sliced","1 cup white wine","1 cup chicken broth","1/4 cup lemon juice","1 ounce brandy-based orange liqueur (such as Grand Marnier®)","or to taste"}',
              photo: "http://images.media-allrecipes.com/userphotos/560x315/2179438.jpg"
           },
           {
              title: 'Raspberry Grilled Pork Chops', 
              author: 'George Lopez', 
              description: 'Mix together the drained pineapple juice, soy sauce, and garlic powder together in a large plastic zipper bag, and smush the bag a few times with your hands to mix the marinade. Place the pork chops into the marinade, squeeze out any air in the bag, seal it, and refrigerate overnight. Reserve the pineapple rings. Preheat an outdoor grill for medium heat, and lightly oil the grate.  Remove the chops from the marinade, shaking off excess, and grill until browned, the meat is no longer pink inside, and the meat shows good grill marks, 5 to 8 minutes per side. Brush several times with marinade and let the marinade cook onto the surface of the meat. Discard excess marinade. While the meat is grilling, place 4 pineapple rings onto the grill, and allow to cook until hot and the slices show grill marks; serve the chops topped with the grilled pineapple rings.', 
              category_type: 5,
              ingredients: '{"1 (8 ounce) fresh raspberries","juice drained and reserved","1/4 cup soy sauce","1/4 teaspoon garlic powder","4 pork chops","1 pinch ground black pepper"}',
              photo: "http://images.media-allrecipes.com/userphotos/250x250/857812.jpg"
           },
           {
            title: 'Easy Keto Snack Box', 
            author: 'Anna Vocino', 
            description: 'Dont struggle for snacking options', 
            category_type: 5,
            ingredients: '{"1 (8 ounce) fresh raspberries","juice drained and reserved","1/4 cup soy sauce","1/4 teaspoon garlic powder","4 pork chops","1 pinch ground black pepper"}',
            photo: "https://holisticyum.com/wp-content/uploads/2019/09/Keto-Snack-Boxes-2.jpg"
         },
         {
            title: 'Coffee with heavy whipping cream', 
            author: 'Alexander Hamilton', 
            description: 'Combine ricotta cheese, egg, onion, milk and almond flour. Season with salt and pepper. Clean and slice zucchini into thin slices and place into baking dish. Pour mustard, and tomato mixture over loaf. Bake at 350 degrees for 1 hour.', 
            category_type: 5,
            ingredients: 'Make a pot of coffee and add a teaspoon of heavy whipping cream',
            photo: "https://www.wholesomeyum.com/wp-content/uploads/2017/08/www.wholesomeyum.com-keto-butter-coffee-recipe-with-mct-oil-img-6619-hero.jpg"
         },
         {
            title: 'Guacamole and bacon chips', 
            author: 'Tom Salek', 
            description: 'These crispy chips are filled with flavor and a cinch to make. Whip up the guacamole for an extra dose of healthy fats.', 
            category_type: 5,
            ingredients: 'Avocado, Salt, Pepper and Bacon',
            photo: "https://s3-us-west-2.amazonaws.com/paleo-plan-west/wp-content/uploads/2018/12/01074435/16-Easy-3-Ingredient-Keto-Snacks.jpg"
         },
         {
            title: 'Cheese Plate', 
            author: 'Diet Doctor', 
            description: 'A cheese plate appetizer is an essential dish at 99% of my gatherings, holiday or otherwise. (It’s also been an essential dish on, y’know, Tuesdays when I’m too lazy to cook dinner).', 
            category_type: 5,
            ingredients: 'Put your favorite cheese, olives, broccoli, hummus, deli meats',
            photo: "https://i.dietdoctor.com/wp-content/uploads/2018/07/DD_LC_snacking.jpg?auto=compress%2Cformat&w=800&h=450&fit=crop"
         },
        ];
        //seed create route
//matching route is found the Recipe and Article models are used to
//seed the data in our arrays into the database (controllers/recipes.js)
// await Recipe.collection.drop();
// await Article.collection.drop();
// const newRecipes = await Recipe.create(recipesToSeed);
//recipesToSeed array created that needs to be stored in database        

        console.log('seedRoute');
        //mongoose creates a Recipe collection
        //seed will not run all the time (it's not normal)
        const seededRecipes = await Recipe.create(recipesToSeed);
        console.log(seededRecipes);
        //now that we created recipes and associated them with new articles
        // const articlesAndRecipes = await Article.find().populate('recipe').exec();
        res.json(seededRecipes);
        //SEED INDEX ROUTE don't render 
        //sending json back to the browser to confirm the article and recipes created 
    } catch (err){
        res.send(err);
    }
})

//----export controller---------//
module.exports = router;