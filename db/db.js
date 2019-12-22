const mongoose = require('mongoose');

//defin sub-database
const connectionString = 'mongodb://localhost/nsng';

//connect to database
mongoose.connect(connectionString, {
    //mongoose string parser
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
//confirm connection to database

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${connectionString}`);
});

//confirm disconnect  to database
mongoose.connection.on('disconnected', () =>  {
    console.log('Mongoose disconnected');
});

//provide error feedback
mongoose.connection.on('error', (err) => {
    console.logh('Mongoose error: ', err);
});