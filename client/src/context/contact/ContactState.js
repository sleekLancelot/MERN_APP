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
        ],
        current: null,
        filtered: null
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

    //delete contact
    const deleteContact = (id) => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }

    //set current contact
    const setCurrent = (contact) => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        })
    }

    //clear current
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    //update contact
    const updateContact = (contact) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        })
    }

    //filter through contact
    const filterContact = (text) => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        })
    }
    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
