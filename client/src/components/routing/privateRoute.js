import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthState'

const privateRoute = ({ component: Component, ...rest }) => {
    const [authState] = useAuth();
    const { isAuthenticated } = authState;
    console.log(Component);

    return (
        <Route
            {...rest}
            render={props => (
                isAuthenticated ?
                    <Component {...props} /> :
                    <Redirect to='/login' />
            )} />
    )
}

export default privateRoute;
