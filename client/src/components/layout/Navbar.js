import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth, logout } from '../../context/auth/AuthState';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title }) => {
    const contactContext = useContext(ContactContext);
    const { clearContact } = contactContext

    const [authState, authDispatch] = useAuth()

    const { isAuthenticated, user } = authState;

    const onLogout = () => {
        logout(authDispatch);
        clearContact()
    }

    const accessLink = (
        <>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
        </>
    )

    const guestLink = (
        <>
            <li>
                <Link to='/login-or-register'>Login / Register</Link>
            </li>
            <li>
                <Link to='/about'>About</Link>
            </li>
        </>
    )
    return (
        <div className='navbar bg-primary'>
            <h1>
                <Link to='/'>
                    <img alt='' src='./cng.png' style={{ width: '30px', height: '40px' }} /> {title}
                </Link>
            </h1>
            <ul>
                {isAuthenticated ? accessLink : guestLink}
            </ul>
        </div>
    )
}

Navbar.prototype = {
    title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    // icon: 'fas fa-id-card-alt'
}

export default Navbar;
