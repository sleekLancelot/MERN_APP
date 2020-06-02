const express = require('express');
const router = express.Router();

//route     GET api/auth
//desc      get log in user
//access    private
router.get('/', (req, res) => res.send('Get logged-in user'));


//route     POST api/auth
//desc      show logged in user
//access    public
router.post('/', (req, res) => res.send('show logged-in user'));

module.exports = router;