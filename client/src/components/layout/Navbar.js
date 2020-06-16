import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    <NavLink activeClassName="activeLink" to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink activeClassName="activeLink" to='/about'>
                        About
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

Navbar.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact Keeper',
    icon: 'fas fa-id-card-alt'
}

export default Navbar;
