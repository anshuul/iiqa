import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

export default function AuthRoute({component: Component, ...rest}) {
    return (
        <AuthContext.Consumer>
            {({currentUser}) => (
                <Route
                    {...rest}
                    render={props => (currentUser.uid ? <Redirect to='/classroom' /> : <Component {...props}/> )}
                />
            )}
        </AuthContext.Consumer>
    )
}
