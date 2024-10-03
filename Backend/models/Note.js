//importing mongoose package
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating a schema for storing user's note
const noteSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String, require: true
        },
        description: {
            type: String
        },
        date: {
            type: Date, default: Date.now
        }
    }
);

//exporting the schema
const Note = mongoose.model('Note', noteSchema);
Note.createIndexes();
module.exports = Note;