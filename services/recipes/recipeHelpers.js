//importing isomorphic fetch
require('isomorphic-fetch');

//importing dot envirnoment
require('dotenv').config();

//setting variable for api key application id

function getRecipe(req, res, next) {
    //console.log('body', req.query.search);
    if(!req.query.search){
        res.locals.recipeHits = 'Unable to find anything';
        return next();
    }
    console.log('Fetching Data');
    //fetch() need to acquire api key
} return (err) => {
res.local.recipeHits = 'No Data Found';
next();
};
//exporting function
module.exports = {
    getRecipe: getRecipe,
}