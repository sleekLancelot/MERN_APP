import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR,
    CLEAR_CONTACTS
} from '../types';

const ContactReducer = (action, state) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts]
            };

        default:
            // throw new Error(`unhandled action:${action.type, action.payload}`);
            // throw new Error(`Unsupported type of: ${action.type}`)
            return state
    }
}

export default ContactReducer;