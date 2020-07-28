import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthState'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [authState] = useAuth();
    const { isAuthenticated } = authState;

    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated ?
                    <Component {...props} /> :
                    <Redirect to='/login-or-register' />
            )} />
    )
}

export default PrivateRoute;
