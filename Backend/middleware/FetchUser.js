const jwt = require('jsonwebtoken');
const JWT_SECRETE = '_This.my.sec$000_';

const fetchUser = (req, res, next) => {
    //get the user from JWT token
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send("Please authenticate using valid token");
    }
    try {
        const data = jwt.verify(token, JWT_SECRETE);
        req.user = data.user;
        next();
    }
    catch(errors) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchUser;