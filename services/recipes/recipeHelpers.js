//SQL pg promise - importing isomorphic fetch
// require('isomorphic-fetch');

// //SQL pg promise - importing dot envirnoment
// require('dotenv').config();
//importing  the users controller
// const userControllers = require('../../controllers/users.js');
// //setting variable for api key application id
// const APP_ID = process.env.APPLICATION_ID;
// const API_KEY = process.env.API_SECRET_KEY;

// const getRecipe = (req, res, next)=> {
//     console.log('body', req.query.search);
//     if(!req.query.search){
//         res.locals.recipeHits = 'Unable to find anything';
//         return next();
//     }
//     console.log('Fetching Data from recipeHelpers');
//     //fetch() need to acquire api key
//     fetch(`https://api.edamam.com/search?q=${req.query.search}&app_id=${APP_ID}&app_key=${API_KEY}`)
//  .then((fetchRes) => {
//      return fetchRes.json();
//  })
//  .then((jsonFetchRes) => {
//      //adding properties to res.locals
// res.locals.recipeHits = jsonFetchRes.hits;
// next();
// }).catch((err) => {
//     console.log(err);
//     //displaying error message on the page 
//     res.locals.recipeHits = 'Nothing Found';
//     next();
// });
// }

//exporting function
module.exports = {
    getRecipe: getRecipe,
}