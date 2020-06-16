import React, { useContext, Fragment } from 'react'
import ContactContext from '../../context/contact/ContactContext'
import ContactItem from './ContactItem'

const Contact = () => {
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;
    console.log(contacts)

    return (
        <div className="cardFlex">
            {contacts.map(contact => <ContactItem key={contact.id} contact={contact} />)}
        </div>
    )
}

export default Contact
