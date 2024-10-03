const mongoose = require('mongoose');

//connecting to mongoDB
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/inotbook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.1', {useNewUrlParser: true});
        console.log("connected to mongoDB successfully");
    }
    catch(errors) {
        console.log("There is some error while connecting to mongoDB");
    }
}

module.exports = connectToMongo;