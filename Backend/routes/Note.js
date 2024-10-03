const express = require('express');
const router = express.Router();
const Note = require('../models/Note.js');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/FetchUser.js');
const { findByIdAndUpdate } = require('../models/User.js');

const check = [body('title', 'Title cannot be empty').isLength({min: 1})];
//this end-point create a note in user's account (login required)
router.post('/addnote', fetchUser, check, async (req, res) => {
    //if Note info is not correct then throw errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).send("There is some errors while validating your info");
    }
    else {
        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        }).catch(err => res.json({error: 'Title cannot be empty', message: err.message}));
        res.send(note);
    }
});

//this end-point get all the notes of loged-in user
router.get('/getnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    }
    catch(errors) {
        console.error(errors);
        res.status(500).send("Internal server error");
    }
});

//this end-point update a note after authenticate the user
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        //creating an empty object
        const newNote = {};
        
        if(req.body.title) {newNote.title = req.body.title}
        if(req.body.description) {newNote.description = req.body.description}

        //find the note to be updated
        let note = await Note.findById(req.params.id);
        if(note === null) {return res.status(404).send("Not found");}
        else {
            if(note.user.toString() !== req.user.id) {
                return res.status(401).send("Unauthorized access");
            }
            else {
                note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
                res.json(note);
            }
        }
    } catch(errors) {
        console.error(errors);
        res.status(500).send("Internal server error");
    }
});

//this end-point delete a note after authenticate the user
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //find the note to be updated
        let note = await Note.findById(req.params.id);
        if(note === null) {return res.status(404).send("Not found");}
        else {
            if(note.user.toString() !== req.user.id) {
                return res.status(401).send("Unauthorized access");
            }
            else {
                note = await Note.findByIdAndDelete(req.params.id);
                res.json({"Success": "Note has been deleted successfully"});
            }
        }
    } catch(errors) {
        console.error(errors);
        res.status(500).send("Internal server error");
    }
});

module.exports = router;