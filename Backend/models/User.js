//importing mongoose package
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a schema for storing user's data
const userSchema = new Schema(
    {
        first_name: {type: String, require: true},
        last_name: {type: String, require: true},
        email: {type: String, require: true, unique: true},
        password: {type: String, require: true},
        date: {type: Date, default: Date.now}
    }
);

//exporting the schema
const User = mongoose.model('User', userSchema);
User.createIndexes();
module.exports = User;