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

export default (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !== action.payload),
                current: (() => {
                    if (state.current) {
                        return state.current.id === action.payload ? null : state.current
                    }
                })(),
                filtered: (() => {
                    if (state.filtered) {
                        return state.filtered.filter(fContact => fContact.id !== action.payload)
                    }
                })()
                //  state.current !== null ? state.current.id === action.payload ? null : state.current
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact),
                filtered: state.filtered && state.filtered.map(fContact => fContact.id === action.payload.id ? action.payload : fContact)
            }
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(({ name, email, phone }) => {
                    const dummyRegex = `${name}${email}${phone}`.toLowerCase();
                    return dummyRegex.includes(action.payload);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            throw new Error(`unhandled action:${action.type},${action.payload}`);
        // throw new Error(`Unsupported type of: ${action.type}`)
        // return state
    }
}