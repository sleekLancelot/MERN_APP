import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext'

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent } = contactContext;

    const { _id, name, phone, email, type } = contact;

    const onDelete = () => {
        deleteContact(_id);
    }

    const onEdit = () => {
        setCurrent(contact)
    }
    return (
        <div className='card bg-light'>
            <h3 className='text-dark text-left'>
                {name}{' '}
                <span
                    style={{ float: 'right' }}
                    className={
                        'badge ' +
                        (type === 'professional' ? 'bab-primary' : 'badge-success')
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className='list'>
                {email && (
                    <li>
                        <i className='fas fa-envelope-open' /> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className='fas fa-phone' /> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className='btn btn-dark btn-sm' onClick={onEdit}> Edit </button>
                <button className='btn btn-danger btn-sm' onClick={onDelete}> Delete </button>
            </p>
        </div>
    )
}

ContactItem.propType = {
    contact: PropTypes.array.isRequired,
}

export default ContactItem
