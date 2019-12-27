//use mongoose package to connect to Mongo
const mongoose = require('mongoose');

//define the sub-database 
const connectionString = process.env.MONGODB_URI;
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

