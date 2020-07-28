import React, { useState, useEffect, useContext } from 'react'
import AlertContext from '../../context/alert/AlertContext'
import { useAuth, login, clearErrors } from '../../context/auth/AuthState';


const Login = ({ showLog, props: { history } }) => {
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    })

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const [authState, authDispatch] = useAuth();

    const { isAuthenticated, error } = authState


    const { email, password } = loginDetails;

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }

        if (error === 'Invalid email or password') {
            setAlert(error, 'danger')
            clearErrors(authDispatch)
        }
    }, [error, setAlert, isAuthenticated, history, authDispatch])


    const onChange = (e) => setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value })

    const onSubmit = (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setAlert('please fill all fields', 'danger')
        } else {
            login(authDispatch, {
                email,
                password
            })
        }
    }

    return (
        <form style={{ left: showLog ? '-300px' : '300px', visibility: showLog ? 'visible' : 'hidden' }} id="loginBox" method="post">
            <input onChange={onChange} name='email' type="text" placeholder="E-mail" value={email} required />
            <input style={{ marginTop: '-50px' }} onChange={onChange} name='password' type="password" placeholder="Password" value={password} required />

            <input type='submit' value='Login' className="lr-submit" style={{ marginTop: '-30px' }} onClick={onSubmit} />
        </form>
    )
}

export default Login;
