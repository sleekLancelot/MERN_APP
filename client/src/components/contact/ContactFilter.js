import React, { useContext, useRef } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
    const text = useRef('');
    const contactContext = useContext(ContactContext);
    const { filterContact, clearFilter } = contactContext;

    const onChange = (e) => {
        let searchValue = e.target.value;
        if (searchValue !== '') {
            searchValue.trim()
            filterContact(e.target.value)
        } else {
            clearFilter();
        }
    }

    return (
        <div>
            <form onChange={e => e.preventDefault()} style={{ display: 'flex', width: '500px', borderRadius: '10px', justifyContent: 'flex-end' }}>
                <input ref={text} style={style} type="text" placeholder="Filter Contacts...." onChange={onChange} />
            </form>
        </div>
    )
}

const style = {
    width: '300px',
    height: '32px',
    fontsize: '20px',
    padding: '7px',
    color: 'rgba(0, 0, 0)',
    marginBottom: '17px',
    marginLeft: '15px',
    border: 'none',
    background: 'inherit',
    borderBottom: '1px solid black',
    borderRadius: '7px',
    boxSizing: 'border-box',
    outline: 'none'
    // haven't yet figured out how to make double values of box-shadow work
    // boxShadow: 'inset -2px -2px 6px rgba(0, 0, 0, 0.8)',
    // boxShadow: 'inset 2px 2px 6px rgba(255, 255, 255, 0.1)'
}

export default ContactFilter;
