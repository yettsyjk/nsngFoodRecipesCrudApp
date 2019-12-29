//importing isomorphic fetch
require('isomorphic-fetch');

//importing dot envirnoment
require('dotenv').config();

//setting variable for api key application id
const APP_ID = process.env.APPLICATION_ID;
const API_KEY = process.env.API_SECRET_KEY;

const getRecipe = (req, res, next)=> {
    console.log('body', req.query.search);
    if(!req.query.search){
        res.locals.recipeHits = 'Unable to find anything';
        return next();
    }
    console.log('Fetching Data');
    //fetch() need to acquire api key
    fetch(`https://api.edamam.com/search?q=${req.query.search}&app_id=${APP_ID}&app_key=${API_KEY}`)
 .then((fetchRes) => {
     return fetchRes.json();
 })
 .then((jsonFetchRes) => {
     //adding properties to res.locals
res.locals.recipeHits = jsonFetchRes.hits;
next();
}).catch((err) => {
    console.log(err);
    //displaying error message on the page 
    res.locals.recipeHits = 'Nothing Found';
    next();
});
}

//exporting function
module.exports = {
    getRecipe: getRecipe,
}