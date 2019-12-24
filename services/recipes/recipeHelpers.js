//importing isomorphic fetch
require('isomorphic-fetch');

//importing dot envirnoment
require('dotenv').config();

//setting variable for api key application id

const getRecipe = (req, res, next)=> {
    //console.log('body', req.query.search);
    if(!req.query.search){
        res.locals.recipeHits = 'Unable to find anything';
        return next();
    }
    console.log('Fetching Data');
    //fetch() need to acquire api key
    fetch()
 .then((fetchRes)=> {
     return fetchRes.json();
 })
 .then((jsonFetchRes) => {
res.locals.recipeHits = jsonFetchres.hits;
next();
}) .catch((err) => {
    console.log(err);
    res.locals.recipeHits = 'Nothing Found';
    next();
});
}

//exporting function
module.exports = {
    getRecipe: getRecipe,
}