import React, { useContext, useEffect } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactContext from '../../context/contact/ContactContext'
import ContactItem from './ContactItem'
import Placeholder from '../skeleton/Placeholder'

const Contact = () => {

    const contactContext = useContext(ContactContext);

    const { contacts, filtered, loaded, getContact } = contactContext;

    //load this effect once the component mounts
    useEffect(() => {
        getContact()
        //eslint-disable-next-line
    }, [])

    if (contacts !== null && contacts.length < 1 && loaded) return <h4 style={{ textAlign: 'center', marginTop: '50px', fontSize: '2em' }}>Please add a Contact</h4>;

    return (
        <div className="cardFlex">
            {loaded && contacts !== null ? (<TransitionGroup>
                {
                    filtered ?
                        filtered.map(contact =>
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        )
                        :
                        contacts.map(contact =>
                            <CSSTransition key={contact._id} timeout={500} classNames='item'>
                                <ContactItem contact={contact} />
                            </CSSTransition>
                        )
                }
            </TransitionGroup>) : <Placeholder />}
        </div>
    )
}

export default Contact
