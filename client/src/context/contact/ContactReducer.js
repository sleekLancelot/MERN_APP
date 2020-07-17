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
    CLEAR_CONTACTS,
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                contacts: action.payload,
                loaded: true
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [action.payload, ...state.contacts],
                loaded: true
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
                filtered: state.filtered && state.filtered.map(fContact => fContact._id === action.payload._id ? action.payload : fContact),
                loaded: true
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact._id !== action.payload[1]),
                current: (() => {
                    if (state.current) {
                        return state.current._id === action.payload[1] ? null : state.current
                    }
                })(),
                filtered: (() => {
                    if (state.filtered) {
                        return state.filtered.filter(fContact => fContact._id !== action.payload[1])
                    }
                })(),
                loaded: true
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
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload,
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
        case CLEAR_CONTACTS:
            return {
                ...state,
                contacts: null,
                error: null,
                current: null,
                filtered: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            throw new Error(`unhandled action:${action.type},${action.payload}`);
        // throw new Error(`Unsupported type of: ${action.type}`)
        // return state
    }
}