const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

//@route     POST /api/users
//@desc      register a user
//@access    public
router.post('/', [
    check('name', 'Enter a name please')
        .not()
        .isEmpty(),
    check('email', 'Please enter an email')
        .isEmail(),
    check('password', 'Please enter a password (min of 6 characters)')
        .isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        // console.log(errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                // console.log(user);
                return res.status(400).json({ msg: 'Oiii, user already exits' });
            };
            user = new User({
                name,
                email,
                password
            });

            // const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, await bcrypt.genSalt());

            await user.save();

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
            // console.log(err.message);
            res.status(500).send('server error');
        }
    });

module.exports = router;