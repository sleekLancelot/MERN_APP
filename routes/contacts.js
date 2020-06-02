const express = require('express');
const router = express.Router();

//route     GET api/contacts
//desc      retrieve users contacts
//access    private
router.get('/', (req, res) => res.send('Here are your contact doohh!'))


//route     POST api/contacts
//desc      add new contact
//access    private
router.post('/', (req, res) => res.send('contact added doohh!'))


//route     PUT api/contacts:id
//desc      update contact
//access    private
router.put('/:id', (req, res) => res.send('contact updated doohh!'))


//route     DELETE api/contacts:id
//desc      contact deleted
//access    private
router.delete('/:id', (req, res) => res.send('contact deleted doohh!'))


module.exports = router;