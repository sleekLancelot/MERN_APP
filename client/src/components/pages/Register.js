import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import { useAuth, register, clearErrors } from '../../context/auth/AuthState';

const Register = ({ showReg, props: { history } }) => {
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [authState, authDispatch] = useAuth();

    const { error, isAuthenticated } = authState;

    const [RegisterUser, setRegisterUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = RegisterUser

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
        // console.log(authState);
        // console.log(errors)
        if (error === 'Oiii, user already exits') {
            setAlert(error, 'danger')
            clearErrors(authDispatch)
        }
    }, [error, setAlert, isAuthenticated, history, authDispatch])

    const onChange = (e) => setRegisterUser({ ...RegisterUser, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        if (name === '' || email === '' || password === '' || password2 === '') {
            setAlert('please fill all fields', 'danger')
        } else if (password !== password2) {
            setAlert('passwords do not match', 'danger')
        } else {
            register(authDispatch, {
                name,
                email,
                password
            })
        }
    }
    return (
        <form onSubmit={onSubmit} style={{ left: showReg ? '90px' : '-650px', visibility: showReg ? 'visible' : 'hidden' }} id="registerBox" method="post">
            <input onChange={onChange} name='name' type="text" placeholder="Full-name" value={name} required />
            <input onChange={onChange} name='email' type="email" placeholder="E-mail" value={email} required />
            <input onChange={onChange} name='password' type="password" placeholder="Password" value={password} required minLength='6' />
            <input onChange={onChange} name='password2' type="password" placeholder="Confirm-Password" value={password2} required minLength='6' />

            <input type='submit' value='Register' className="lr-submit" onClick={onSubmit} />
        </form>
    )
}

export default Register
