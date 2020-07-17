import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext'
import AlertContext from '../../context/alert/AlertContext'

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact, error, clearError } = contactContext;

    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext

    useEffect(() => {
        if (error) {
            setAlert(error, 'danger')
            clearError()
        }

        if (current) {
            setContact(current)
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current, clearError, error, setAlert]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })

    const { name, email, phone, type } = contact;
    const onChange = e => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        if (current) {
            updateContact(contact)
        } else {
            addContact(contact);
        }


        clearCurrent();
    }

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form className="card" onSubmit={onSubmit}>
            <h2 className='text-primary'>{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
                required
            />
            <input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type='text'
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type='radio'
                name='type'
                value='personal'
                checked={type === 'personal'}
                onChange={onChange}
            />{' '}
      Personal{' '}
            <input
                type='radio'
                name='type'
                value='professional'
                checked={type === 'professional'}
                onChange={onChange}
            />{' '}
      Professional
            <div>
                <input
                    type='submit'
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className='btn btn-primary btn-block'
                />
            </div>
            <div>
                {current && <button className='btn btn-light btn-block' onClick={clearAll}>
                    Clear
          </button>}
            </div>
        </form>
    )
}

export default ContactForm;
