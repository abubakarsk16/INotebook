//importing modules
const connectToMongo = require('./db.js');
const mongoose = require('mongoose');
const express = require('express');
const LoginAuth = require('./routes/LoginAuth.js');
const Note = require('./routes/Note.js');
const cors = require('cors');

const app = express();

connectToMongo();
app.use(express.json());
app.use(cors());

const port = 4000;

//default endpoint
app.get('/', (req, res) => {
    res.send("This is home page");
});

//User authentication routes
app.use('/auth', LoginAuth);

//Routes to manipulate notes
app.use('/notes', Note);

//listening to the endpoint
app.listen(port, () => {
    console.log(`The app is listening at http://localhost:${port}`);
});
