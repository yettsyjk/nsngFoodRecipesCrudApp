//use mongoose package to connect to Mongo
const mongoose = require('mongoose');
//define sth sub-database 
const connectionString = 'mongodb://localhost/nsng';
//connect the database
mongoose.connect(connectionString, {
    //mongoose updated their connection string parser
    useNewUrlParser: true,
    //monitoring all servers
    useUnifiedTopology: true,
    //tell mongoose to call createIndex method
    useCreateIndex: true,
    //both mongo and mongoose have findOneAndUpdate() function
    useFindAndModify: false
});
//confirm connection to db
mongoose.connection.on('connected', () => {
    console.log(`Mongoose conected to ${connectionString}`);
});
//confirm disconnection to db
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
//provide error feedback
mongoose.connection.on('error', (err) => {
    console.log('Mongoose error: ', err);
});

// //setting up variable for logging queries
// const initOptions = {
//     connect: (client, dc, isFresh) => {
//         //do this everytime the database connects
//         console.log('Connected to Database:', client.connectionParameters.database)
//     },
//     query: (e) => {
//         //do this everytime a query is made to db
//         console.log('Making query ---->' + e.query);
//     },
//     receive: (data, result, e) => {
//         //do this everytime app receives data from db
//         console.log('Completed query ---->'+ e.query);
//     },
//     disconnect: (client, dc) => {
//         //do this everytime db disconnects
//         console.log('Disconnecting from DataBase:', client.connectionParameters.database);
//     }
// };
// //importing promise
// const pgp = require('pg-promise')(initOptions);
// //setting up variable for pg-promise, note const didn\'t work
// let db;
// //create statement to determine instance, port tied to psql
// if(process.env.NODE_ENV === 'development' || !process.env.NODE_ENV){
//     db = pgp({
//         database: 'recipe_development',
//         port: 5433,
//         host: 'localhost'
//     });
// } else if (process.env.NODE_ENV === 'production') {
//     db = pgp(process.env.DATABASE_URL);
// }

// //exporting pg-promise
// module.exports = db;