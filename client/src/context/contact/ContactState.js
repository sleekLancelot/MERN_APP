import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { v4 as uuid } from 'uuid';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = (props) => {

    const initialState = {
        contacts: [
            {
                id: 1,
                name: 'Jill Johnson',
                email: 'jill@gmail.com',
                phone: '111-111-1111',
                type: 'professional',
            },
            {
                id: 2,
                name: 'Sam Clinton',
                email: 'sam@gmail.com',
                phone: '222-111-1111',
                type: 'personal',
            },
            {
                id: 3,
                name: 'Bill Joe',
                email: 'bill@gmail.com',
                phone: '333-111-1111',
                type: 'personal',
            }
        ]
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //add contact
    const addContact = (contact) => {
        contact.id = uuid();
        dispatch({
            type: ADD_CONTACT,
            payload: contact
        });
    }
    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            addContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
