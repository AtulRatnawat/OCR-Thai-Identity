const mongoose = require('mongoose');

const mongoURI = process.env.DB_URI;

// console.log(mongoURI);

const connectToMongo = () => {
    mongoose.connect(mongoURI).then(
        console.log('Connected!')
    )

    console.log('Connected to mongoDB !....');
}

module.exports = connectToMongo;