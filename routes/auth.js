const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

//route     GET api/auth
//desc      get this user
//access    private
router.get('/', auth, async (req, res) => {
    try {
        //get the user details excluding the password
        const user = await User.findById(req.user.id, '-password');
        res.json({ user });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


//route     POST api/auth
//desc      Authenticate a user trying to login-in,and get token
//access    public
router.post('/', [
    check('email', 'Please provide a mail').isEmail(),
    check('password', 'Please provide a password').exists()
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Check the db collection for a user with prop 'email' with value 'req.email'
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: 'Invalid email or password' })
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid email or password' });
            }
		
		//pass the user id as the token payload
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

        } catch (err) {
            console.log(err.message);
            return res.status(500).send('Server error');
        }
    });

module.exports = router;