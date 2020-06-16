const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

//route     GET api/contacts
//desc      retrieve users contacts
//access    private
router.get('/', auth, async (req, res) => {
    try {
        //get the contacts of this particular user and sort by date in descending order.
        const contacts = await Contact.find({ user: req.user.id }).sort('-date');
        res.json(contacts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})


//route     POST api/contacts
//desc      add new contact
//access    private
router.post('/', [auth, [
    check('name', 'please provide a name').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, phone, type } = req.body;

    try {
        let newContact = await Contact.findOne({ name });

        if (newContact) return res.status(400).json({ msg: 'A contact with that name already exist' });

        newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});


//route     PUT api/contacts:id
//desc      update contact
//access    private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;

    //Build a contact object to pass to the update method;
    const ContactField = {};
    if (name) ContactField.name = name;
    if (email) ContactField.email = email;
    if (phone) ContactField.phone = phone;
    if (type) ContactField.type = type;
    try {
        //check if the contact exist
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(400).json({ msg: 'This contact does not exist' });

        //And if it does,check if ths user is authorized

        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized Request' });

        /*
        // This would have been better as it would be redundant to query the model for the params id once again,but can't yet figure how to return the updated to view in postman if i go with this style.

         await contact.updateOne(
            { $set: ContactField },
            { new: true }
        ); 
        */

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: ContactField },
            { returnOriginal: false }
        );

        res.json(contact);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


//route     DELETE api/contacts:id
//desc      contact deleted
//access    private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        //check if such contact with that id exists
        if (!contact) return res.status(400).json({ msg: 'This contact does not exist' });

        //If it exist,check if this user is authorized
        if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized Request' });

        //then delete
        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact Deleted' });
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server Error');
    }
});


module.exports = router;