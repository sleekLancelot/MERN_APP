const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //get token
    const token = req.header('x-auth-token');

    //check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        //verify the token and put the it in the request
        const decode = jwt.verify(token, config.get('jwtSecret'));
        //the decoded token has a payload of users,put it in the request
        req.user = decode.user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ msg: 'Invalid token' });
    }
};