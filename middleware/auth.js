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
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;
        next();
    } catch (err) {
        console.log(err.message);
        res.status(401).json({ msg: 'Invalid token' });
    }
};