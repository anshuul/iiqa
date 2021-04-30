import React, { useState, useEffect } from 'react'

export const AuthContext = React.createContext()

export function contextWrapper(Component){
    return function contextualComponent (props) {
        return (
            <AuthContext.Consumer>
            {({ currentUser, setCurrentUser, errorOpenHandler, successOpenHandler }) => (
              <Component
                {...props}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                errorOpenHandler={errorOpenHandler}
                successOpenHandler={successOpenHandler}
              />
            )}
            </AuthContext.Consumer>
          )
    }
}