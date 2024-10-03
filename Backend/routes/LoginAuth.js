const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/FetchUser.js');
const JWT_SECRETE = '_This.my.sec$000_';

//These validations will be check when a user will create
const validate_to_create = [
    // body('name', 'Name can only contain alphbets').isAlpha(),
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({min: 8})
];

//this end point will create a user in the database: POST "/auth/signUp/"
router.post('/signUp', validate_to_create, async (req, res) => {
    //if entered data is not valid then throw errors
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({success: success, error: "There is some errors while validating your info"});
    }

    //if entered data is valid then create user in database
    else {
        //generaing a secure password using bcrypt hashing
        const salt = await bcrypt.genSalt(10);
        const secure_password = await bcrypt.hash(req.body.password, salt);
        const user = new User(req.body);
        //creating user with valid data
        User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: secure_password
            }).catch(err => res.json({success: success, error: 'Please enter uniqe value for email', message: err.message}));

                //generating the authentication token for created user
                const data = {
                    user: {
                        id: user.id
                    }
                };
                const authToken = jwt.sign(data, JWT_SECRETE);
                // success;
                res.json({success: success = true, Authentication_token: authToken});
    }
});

//These validations will be check when a user will login
const validate_to_login = [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be empty').exists()
]

//this end point will verify a user from database: POST "/auth/login/"
router.post('/login', validate_to_login, async (req, res) => {
    //if login info is not correct then throw errors
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        success = false;
        res.status(400).send(success, "There is some errors while validating your info");
    }

    else {
        //checing whether the user exist against entered email and password or not
        const user = await User.findOne({email: req.body.email});
        //if user not found send the error message
        if(user === null) {
            success = false;
            res.status(404).send(success, "User not found");
        }
        else {
            //if user found in the database compare the password
            const cmpPassword = await bcrypt.compare(req.body.password, user.password);
            //in case of incorrect password send error message
            if(!cmpPassword) {
                success = false;
                res.status(403).send(success, "Incorrect password");
            }
            else {
                //if password matches generate the authentication token
                const data = {
                    user: {
                        id: user.id,
                    }};
                    success = true;
                    const authToken = jwt.sign(data, JWT_SECRETE);
                    res.json({ success, Authentication_token: authToken });
            }
        }
    }
});

//this end-point get logged-in user details
router.get('/getuser', fetchUser, async (req, res) => {
    try {
        const userDet = await User.findOne({_id: req.user.id});
        res.json({
            first_name: userDet.first_name,
            last_name: userDet.last_name,
            email: userDet.email,
            registered_date: userDet.date
        });
    }
    catch(errors) {
        console.error(errors);
        res.status(500).send("Internal server error");
    }
});

//This end-point get the user details after authenticate the loged-in user
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        console.log(userID);
        const _user = await User.findById(userID).select("-password");
        console.log(_user);
        res.send(_user);
    }
    catch(errors) {
        // console.error(error.message);
        res.status(401).send("Authenticate using correct token");
    }
});

module.exports = router;