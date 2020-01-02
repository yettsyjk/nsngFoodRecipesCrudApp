//use mongoose package to connect to Mongo
const mongoose = require('mongoose');

//define the sub-database 
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
    console.log(`Mongoose connected to ${connectionString}`);
});
//confirm disconnection to db
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
//provide error feedback
mongoose.connection.on('error', (err) => {
    console.log('Mongoose error: ', err);
});


//SQL pg-promise module comment out until we can fix this
//setting up a variable that logs every query
// const initOptions = {
//     connect: (client, dc, isFresh) => {
//         //do this ever time the database connects
//         console.log('connected to database:', client.connectionParameters.database)
//     },
//     query: (e)=> {
//         console.log('making query ======>' + e.query);
//     },
//     receive: (data, result, e) => {
//         console.log('completed query ===>' + e.query);
//     },
//     disconnect: (client, dc) => {
//         console.log('disconnecting from database:', client.connectionParameters.database);
//     }
// };
// //importing pg-promise
// const pgp = require('pg-promise')(initOptions);
// //const didnt work
// let db;
// // creating if statements to determine the instance of pgp to use
// if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
//     db = pgp({
//         database: 'recipe_development',
//         port: 5432,
//         host: 'localhost'
//     });
// } else if (process.env.NODE_ENV === 'production') {
//     db = pgp(process.env.DATABASE_URL);
// }

// //exporting pg-promise
// module.exports = db;

