import React, { useReducer } from 'react';
import Axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
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
    CONTACT_ERROR,
    CLEAR_ERRORS
} from '../types';

const ContactState = (props) => {

    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loaded: false
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //make the client know the media-type of the returned value is a json
    const config = {
        header: {
            'Content-Type': 'application/json',
        },
    };

    //get contact
    const getContact = async () => {
        try {
            const res = await Axios.get('/api/contacts')

            dispatch({
                type: GET_CONTACTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            })
        }
    }

    //add contact
    const addContact = async contact => {
        try {
            const res = await Axios.post('/api/contacts', contact, config)

            dispatch({
                type: ADD_CONTACT,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    //delete contact
    const deleteContact = async id => {
        try {
            const res = await Axios.delete(`/api/contacts/${id}`)

            dispatch({
                type: DELETE_CONTACT,
                payload: [res.data.msg, id]
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            });
        }
    }

    //update contact
    const updateContact = async contact => {
        try {
            const res = await Axios.put(`/api/contacts/${contact._id}`, contact, config)

            dispatch({
                type: UPDATE_CONTACT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.data.msg
            })
        }
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

    //an action to clear the contacts in the app state once a cake logouts out,so it doesn't go show on another cakes profile
    const clearContact = () => dispatch({ type: CLEAR_CONTACTS })

    //clear errors
    const clearError = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    //clear response
    //     const clearResponse = () =>{
    //         dispatch({type:CLEAR_RESPONSE})
    // }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            loaded: state.loaded,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContact,
            clearFilter,
            getContact,
            clearContact,
            clearError
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;
