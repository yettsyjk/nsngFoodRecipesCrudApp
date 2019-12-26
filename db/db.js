//setting up variable for logging queries
const initOptions = {
    connect: (client, dc, isFresh) => {
        //do this everytime the database connects
        console.log('Connected to Database:', client.connectionParameters.database)
    },
    query: (e) => {
        //do this everytime a query is made to db
        console.log('making query ---->' + e.query);
    },
    receive: (data, result, e) => {
        //do this everytime app receives data from db
        console.log('completed query ---->'+ e.query);
    },
    disconnect: (client, dc) => {
        //do this everytime db disconnects
        console.log('Disconnecting from DataBase:', client.connectionParameters.database);
    }
};
//importing promise
const pgp = require('pg-promise')(initOptions);
//setting up variable for pg-promise
let db;
//create statement to determine instance
if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
    db = pgp({
        database: 'recipe_development',
        port: 5432,
        host: 'localhost'
    });
} else if (process.env.NODE_ENV === 'production') {
    db = pgp(process.env.DATABASE_URL);
}

//exporting pg-promise
module.exports = db;