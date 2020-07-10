import React, { useContext, useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import ContactContext from '../../context/contact/ContactContext'
import ContactItem from './ContactItem'
import Placeholder from '../skeleton/Placeholder'

const Contact = () => {
    const [loading, setLoading] = useState();

    const contactContext = useContext(ContactContext);

    const { contacts, filtered } = contactContext;

    //load this effect once the component mounts
    useEffect(() => {
        setLoading(true)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1100);
        // to avoid memory leaks,clearTimeout before Unmounting
        return () => clearTimeout(timer);
    }, [filtered])

    if (contacts.length < 1) return <h4 style={{ textAlign: 'center', marginTop: '50px', fontSize: '2em' }}>Please add a Contact</h4>;

    return (
        <div className="cardFlex">
            <TransitionGroup>
                {
                    filtered ?
                        filtered.map(contact =>
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                {loading ? <Placeholder /> : <ContactItem contact={contact} />}
                            </CSSTransition>
                        )
                        :
                        contacts.map(contact =>
                            <CSSTransition key={contact.id} timeout={500} classNames='item'>
                                {loading ? <Placeholder /> : <ContactItem contact={contact} />}
                            </CSSTransition>
                        )
                }
            </TransitionGroup>
        </div>
    )
}

export default Contact
